import { useSelector } from 'react-redux';
import { useNostrEvents, useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { NavLink } from 'react-router-dom';
import oRating from 'renderer/window1/apps/curatedLists/contentCuration/const/nostrChannelTopicsRelationshipInstanceEndorsement';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';

const createRatingWord = (
  which,
  myNostrProfile,
  oInstanceWord,
  event,
  thumbsUpCurrentState,
  thumbsDownCurrentState,
) => {
  // set the value of the ratings to 100 if thumbs up, or 0 if thumbs down
  // if already endorsed, then the effect of the present rating is to nullify all previous ratings;
  // this is expressed by setting rsR to null
  let rsR = 0;
  if (which == 'up') {
    rsR = 100;
    if (thumbsUpCurrentState == "endorsed") {
      rsR = null;
    }
  }
  if (which == 'down') {
    rsR = 0;
    if (thumbsDownCurrentState == "endorsed") {
      rsR = null;
    }
  }

  /*
  // LIST: nostrTopic
  const list_event_id = "ec9af0fa71b2f6c1e3556816ad7c06e6623069c04a6e486fc9312b0273697779";
  const propertyPath = "nostrTopicData";
  const listNameSingular = "nostr topic";
  const listSlugSingular = "nostrTopic";
  */

  // LIST: relationship
  // This word can be found in in the dcosl repo at: DCoSL/dips/conceptGraph/examples/hybrids/relationship.md
  const relationship_event_id = "6a7794b2b1d1cb33c05473fe2a52f4460eec63311e851e3c3fa8e787ca7d88fb";
  const propertyPath = "relationshipData";
  const listNameSingular = "relationship";
  const listSlugSingular = "relationship";

  // INSTANCE
  const instance_event_id = event.id;
  const relationshipWordSlug = oInstanceWord.wordData.slug;

  let wordSlug = "ratingOf_relationship"+ "-"+instance_event_id.substr(-6);
  wordSlug += "_thumbs"+which;
  wordSlug += "_by_"+myNostrProfile.name+"-"+myNostrProfile.pubkey_hex.substr(-4);

  oRating.wordData.slug = wordSlug;

  oRating.ratingData.raterData.nostrProfileData.pubkey = myNostrProfile.pubkey_hex;
  oRating.ratingData.raterData.nostrProfileData.name = myNostrProfile.name;
  oRating.ratingData.raterData.nostrProfileData.display_name = myNostrProfile.display_name;

  oRating.ratingData.rateeData.nostrChannelTopicRelationshipData.eventID = instance_event_id;
  oRating.ratingData.rateeData.nostrChannelTopicRelationshipData.slug = relationshipWordSlug;

  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData.regularSliderRating = rsR;

  /*
  // redundant, since this is added to the oRating skeleton
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData.contextData.nostrParentCuratedListData.eventID = relationship_event_id;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular = listSlugSingular;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData.contextData.nostrParentCuratedListData.name.singular = listNameSingular;
  */

  const oWord = {
    wordData: {
      slug: wordSlug,
      wordTypes: [ "rating" ]
    },
    ratingData: {
      raterData: {
        raterType: 'nostrProfile',
        nostrProfileData: {
          pubkey: myNostrProfile.pubkey_hex,
          name: myNostrProfile.name,
          display_name: myNostrProfile.display_name,
        },
      },
      rateeData: {
        rateeType: 'relationship',
        relationshipData: {
          eventID: instance_event_id,
          slug: relationshipWordSlug,
        },
      },
      ratingTemplateData: {
        ratingTemplateSlug: 'nostrCuratedListInstanceGenericRating',
        ratingTemplateTitle: 'Nostr Curated List Instance: Generic Rating',
      },
      ratingFieldsetData: {
        ratingFieldsetSlugs: [
          'nostrCuratedListInstanceRatingFieldset',
          'confidenceFieldset',
        ],
        confidenceFieldsetData: {
          confidence: 80,
        },
        nostrCuratedListInstanceRatingFieldsetData: {
          regularSliderRating: rsR,
          contextData: {
            transitivity: false,
            contextDAG: {
              slug: 'genericRating',
            },
            nostrParentCuratedListData: {
              eventID: relationship_event_id,
              slug: {
                singular: listSlugSingular,
              },
              name: {
                singular: listNameSingular,
              },
            },
          },
        },
      },
    },
  };
  const e1 = document.getElementById('newConceptRawFileField_'+instance_event_id);
  if (e1) {
    e1.innerHTML = JSON.stringify(oRating, null, 4);
  }
};

const RelationshipRatingPanel = ({oWord, event, event_id, oNostrNodesByEventID}) => {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  // const devMode = true;
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  // LIST: nostrTopic
  let thumbsUpButtonClass = 'acceptThumbsUpButton';
  let thumbsDownButtonClass = 'acceptThumbsDownButton';
  let thumbsUpCurrentState = 'notEndorsed';
  let thumbsDownCurrentState = 'notEndorsed';
  let myCurrentRating = "I have not rated";

  // lookup whether this item is already rated by me
  // const oRatings = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug?.nostrCuratedListInstanceGenericRating);
  const oRatings = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug?.nostrChannelTopicsRelationshipInstanceEndorsement);
  if (oRatings) {
    if (oRatings.byRaterUniversalID[myPubkey]) {
      if (oRatings.byRaterUniversalID[myPubkey].byRateeUniversalID[event_id]) {
        const ratingEventID = oRatings.byRaterUniversalID[myPubkey].byRateeUniversalID[event_id].ratingEventID;
        const oRatingWord = oNostrNodesByEventID[ratingEventID].word;
        const rating = oRatingWord.ratingData.ratingFieldsetData.nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData.regularSliderRating;
        if (rating==100) {
          // I have rated this item thumbs up
          thumbsUpCurrentState = 'endorsed';
          thumbsUpButtonClass = 'unendorseThumbsUpButton';
          myCurrentRating = "my rating: 👍 ENDORSED";
        }
        if (rating==0) {
          // I have rated this item thumbs down
          thumbsDownCurrentState = 'endorsed';
          thumbsDownButtonClass = 'unendorseThumbsDownButton';
          myCurrentRating = "my rating: 👎 BLOCKED";
        }
      }
    }
  }

  const curatedListFocusID = "ec9af0fa71b2f6c1e3556816ad7c06e6623069c04a6e486fc9312b0273697779";

  const submitEvent = () => {
    const sEvent = document.getElementById('newConceptEventField_'+event_id).value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const e1 = document.getElementById('newConceptRawFileField_'+event_id);
    const e2 = document.getElementById('newConceptEventField_'+event_id);

    const contextDAGSlug = 'genericContext'; // future: slug or eventID of user-created ratingTemplate e.g. "easeOfUse" for btc wallets
    const ratingTemplateUniqueID = `${curatedListFocusID}-${contextDAGSlug}`;
    const uniqueID = `${myPubkey}-${event_id}-${ratingTemplateUniqueID}`;

    const kind0 = 39902;
    const aTag0 = ['g', 'grapevine-testnet-902'];
    const aTag1 = ['d', uniqueID]; // d tag for Parametrized Replaceable Event
    // if regularSliderRating is null or undefined, it effectively means no rating
    // (e.g. if a user accidentally rates) an instance and wants to undo it, you submit a rating that is null
    // break down uniqueID into components to make it more easily searchable
    const aTag2 = ['r', ratingTemplateUniqueID]; // every [g: grapevine] should have an r tag with an indicator of the ratingTemplate
    const aTag3 = ['e', event_id]; // the ratee, by event id
    const aTag4 = ['l', curatedListFocusID]; // the parent concept / list, by id
    const aTag5 = ['m', contextDAGSlug];
    // m: the slug of the contextDAG node of the rating, i.e. the Meaning, purpose, or "axis" of the rating
    // (p for purpose is already taken)
    // examples of contextDAGSlug: quality, deliverySpeed (for product); easeOfUse (for btc wallet)
    // default is generic (treated same as null or undefined)

    const sWord = JSON.stringify(JSON.parse(e1.value));
    const aTags = [];
    aTags.push(aTag0);
    aTags.push(aTag1);
    aTags.push(aTag2);
    aTags.push(aTag3);
    aTags.push(aTag4);
    aTags.push(aTag5);
    const event: NostrEvent = {
      content: sWord,
      kind: kind0,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };
  const createThumbsUpWord = () => {
    createRatingWord('up', myNostrProfile, oWord, event, thumbsUpCurrentState, thumbsDownCurrentState);
    createEvent();
    submitEvent();
    indicateMessageSuccess();
  };

  const creatThumbsDownWord = () => {
    createRatingWord('down', myNostrProfile, oWord, event, thumbsUpCurrentState, thumbsDownCurrentState);
    createEvent();
    submitEvent();
    indicateMessageSuccess();
  };

  const indicateMessageSuccess = () => {
    const e1 = document.getElementById('successMessageContainer_'+event_id);
    e1.style.display = 'block';
  };

  const newConceptRawFileFieldElem = "newConceptRawFileField_"+event_id;
  const newConceptEventFieldElem = "newConceptEventField_"+event_id;
  console.log("newConceptRawFileFieldElem: "+newConceptRawFileFieldElem)
  return (
    <>
      <div style={{padding: '5px'}}>
        <div style={{display: 'inline-block', marginRight: '20px'}}>
          <button
            type="button"
            value={thumbsUpCurrentState}
            onClick={() => createThumbsUpWord()}
            className={thumbsUpButtonClass}
          />

          <button
            type="button"
            value={thumbsDownCurrentState}
            onClick={() => creatThumbsDownWord()}
            className={thumbsDownButtonClass}
          />
        </div>

        <span style={{color: 'grey'}}>{myCurrentRating}</span>

        <div className={devElemClass} style={{border: '1px dashed grey'}}>
          <div
            style={{ display: 'inline-block', width: '45%', fontSize: '12px' }}
          >
            <div>rating formatted as a word</div>
            <textarea style={{fontSize:'12px', width: '100%', height: '400px'}} id={newConceptRawFileFieldElem}></textarea>
          </div>
          <div
            style={{ display: 'inline-block', width: '45%', fontSize: '12px' }}
          >
            <div>word wrapped as a nostr event</div>
            <textarea
              id={newConceptEventFieldElem}
              style={{
                display: 'inline-block',
                height: '400px',
                width: '100%',
                fontSize: '10px',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RelationshipRatingPanel;
