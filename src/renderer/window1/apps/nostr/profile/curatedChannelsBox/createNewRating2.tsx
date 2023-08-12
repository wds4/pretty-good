import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import oRating from '../../../curatedLists/contentCuration/const/nostrChannelTopicsCuratorEndorsement';

const ratingTemplateSlug = 'nostrChannelTopicsCuratorEndorsement';
const ratingTemplateTitle = 'Nostr Channel Topics Curator Endorsement';

const createRatingWord = (
  which,
  myNostrProfile,
  curatedListFocusID,
  pubkeyFocusID,
  userData,
  thumbsUpCurrentState,
  thumbsDownCurrentState
) => {
  let oWord = oRating;

  let rsR = 0;
  let defaultConfidence = 80;
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
  if (which == 'abstain') {
    rsR = null;
    defaultConfidence = 0;
  }

  // edit oWord to create the rating
  const myPubkey = myNostrProfile.pubkey_hex;
  const myName = myNostrProfile.name;
  const myDisplay_name = myNostrProfile.display_name;
  oWord.ratingData.raterData.nostrProfileData.pubkey = myPubkey;
  oWord.ratingData.raterData.nostrProfileData.name = myName;
  oWord.ratingData.raterData.nostrProfileData.display_name = myDisplay_name;

  // PROFILE BEING RATED
  const profileName = userData?.name;
  const profileDisplayName = userData?.display_name;
  oWord.ratingData.rateeData.nostrProfileData.pubkey = pubkeyFocusID;
  oWord.ratingData.rateeData.nostrProfileData.name = profileName;
  oWord.ratingData.rateeData.nostrProfileData.display_name = profileDisplayName;

  // set the rating
  oWord.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.regularSliderRating = rsR;

  // obtain the selected topic
  let topicSlug = "";
  let topicName = "";
  let topicEventID = "";
  const et = document.getElementById("contentCuratorTopicSelector")
  if (et) {
    topicSlug = et.selectedOptions[0].dataset.topicslug;
    topicName = et.selectedOptions[0].dataset.topicname;
    topicEventID = et.selectedOptions[0].dataset.topiceventid;
  }
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.contextData.nostrTopicData.slug = topicSlug;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.contextData.nostrTopicData.name = topicName;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.contextData.nostrTopicData.eventID = topicEventID;

  // referenceData
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.referenceData.nostrProfileData.pubkey = myPubkey;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.referenceData.nostrProfileData.name = myName;
  oRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.referenceData.nostrProfileData.display_name = myDisplay_name;

  // wordSlug
  // ratingOf_relationship-e26dd9_thumbsup_by_prettyGoodAppsSteward-1-82fa
  let wordSlug = "rating_asTopicContentCurator_";
  wordSlug += "_onTopic_"+topicSlug;
  wordSlug += "_of_"+profileName+"-"+pubkeyFocusID.substr(-4);
  wordSlug += "_thumbs"+which;
  wordSlug += "_by_"+myName+"-"+myPubkey.substr(-4);
  oWord.wordData.slug = wordSlug;

  const e1 = document.getElementById('newConceptRawFileField2');
  e1.value = JSON.stringify(oWord, null, 4);
};

const CreateNewRating = ({ userData, selectedTopicSlug }) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }

  const topicSlug = selectedTopicSlug;

  const pubkeyFocusID = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitEvent = () => {
    const sEvent = document.getElementById('newConceptEventFiel2').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const e1 = document.getElementById('newConceptRawFileField2');
    const e2 = document.getElementById('newConceptEventFiel2');

    const contextDAGSlug = topicSlug;
    const ratingTemplateUniqueID = `${curatedListFocusID}-${ratingTemplateSlug}-${contextDAGSlug}`;
    const uniqueID = `${myPubkey}-${pubkeyFocusID}-${curatedListFocusID}-${ratingTemplateSlug}-${contextDAGSlug}`;

    const kind0 = 39902;
    const aTag0 = ['g', 'grapevine-testnet-901'];
    const aTag1 = ['d', uniqueID]; // d tag for Parametrized Replaceable Event
    // if regularSliderRating is null or undefined, it effectively means no rating
    // (e.g. if a user accidentally rates) an instance and wants to undo it, you submit a rating that is null
    // break down uniqueID into components to make it more easily searchable
    const aTag2 = ['r', ratingTemplateUniqueID]; // every [g: grapevine] should have an r tag with an indicator of the ratingTemplate
    const aTag3 = ['p', pubkeyFocusID]; // the ratee, by pubkey
    const aTag4 = ['l', curatedListFocusID]; // the parent concept / list, by id
    const aTag5 = ['m', contextDAGSlug];
    // m: the slug of the contextDAG node of the rating, i.e. the Meaning, purpose, or "axis" of the rating
    // (p for purpose is already taken)
    // examples of contextDAGSlug: quality, deliverySpeed (for product); easeOfUse (for btc wallet)
    // default is genericContext (null, undefined, etc are treated as genericContext, the superset of all other contexts)

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

  let thumbsUpButtonClass = 'endorseThumbsUpButton';
  let thumbsDownButtonClass = 'endorseThumbsDownButton';
  let thumbsUpCurrentState = 'notEndorsed';
  let thumbsDownCurrentState = 'notEndorsed';
  let myCurrentRating = "You have not rated this user on this topic.";
  const z = document.getElementById("myCurrentRatingContainer2");
  if (z) {
    z.style.color = "grey";
  }

  // lookup whether this user is already rated by me
  const oRatingTemplateData = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug.nostrChannelTopicsCuratorEndorsement);
  const oByEventID = useSelector((state) => state.channels.conceptGraph.nodes.byEventID);
  let ratingEventID = "";
  if (oRatingTemplateData.byRaterUniversalID[myPubkey]
    && oRatingTemplateData.byRaterUniversalID[myPubkey].byRateeUniversalID[pubkeyFocusID]
    ) {
      ratingEventID = oRatingTemplateData.byRaterUniversalID[myPubkey].byRateeUniversalID[pubkeyFocusID].ratingEventID;
      console.log("qwerty__ratingEventID: "+ratingEventID)
    }
  if (ratingEventID) {
    const oPreviousRating = oByEventID[ratingEventID].word;
    console.log("oPreviousRating: "+JSON.stringify(oPreviousRating,null,4))
    if (oPreviousRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData) {
      const regularSliderRating = oPreviousRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.regularSliderRating;
      const previousTopicSlug = oPreviousRating.ratingData.ratingFieldsetData.nostrChannelTopicsCuratorEndorsementFieldsetData.contextData.nostrTopicData.slug;
      console.log("qwerty__regularSliderRating: "+regularSliderRating)
      if (previousTopicSlug == topicSlug) {
        if (regularSliderRating==100) {
          // I have rated this user thumbs up
          thumbsUpCurrentState = 'endorsed';
          thumbsUpButtonClass = 'unendorseThumbsUpButton';
          myCurrentRating = "👍 You have ENDORSED this user.";
          const z = document.getElementById("myCurrentRatingContainer1");
          if (z) {
            z.style.color = "green";
          }
        }
        if (regularSliderRating==0) {
          // I have rated this user thumbs down
          thumbsDownCurrentState = 'endorsed';
          thumbsDownButtonClass = 'unendorseThumbsDownButton';
          myCurrentRating = "👎 You have BLOCKED this user.";
          const z = document.getElementById("myCurrentRatingContainer1");
          if (z) {
            z.style.color = "red";
          }
        }
      }
    }
  }

  const createThumbsUpEvent = (currentState) => {
    let which = 'up';
    if (currentState == "notEndorsed") {
      which = 'up';
    }
    if (currentState == "endorsed") {
      which = "abstain";
    }
    createRatingWord(
      which,
      myNostrProfile,
      curatedListFocusID,
      pubkeyFocusID,
      userData,
      thumbsUpCurrentState,
      thumbsDownCurrentState
    );
    createEvent();
    submitEvent();
  };
  const creatThumbsDownEvent = (currentState) => {
    let which = 'down';
    if (currentState == "notEndorsed") {
      which = 'down';
    }
    if (currentState == "endorsed") {
      which = "abstain";
    }
    createRatingWord(
      which,
      myNostrProfile,
      curatedListFocusID,
      pubkeyFocusID,
      userData,
      thumbsUpCurrentState,
      thumbsDownCurrentState
    );
    createEvent();
    submitEvent();
  };

  const toggleViewDetails = () => {
    const e = document.getElementById('technicalDetailsForNostrDevsContainer2');
    const currentState = e.style.display;
    // console.log(`toggleViewDetails; currentState: ${currentState}`);
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  }

  return (
    <>
      <button
        type="button"
        value={thumbsUpCurrentState}
        onClick={({ target: { value } }) => createThumbsUpEvent(value)}
        className={thumbsUpButtonClass}
      />

      <button
        type="button"
        value={thumbsDownCurrentState}
        // onClick={() => creatThumbsDownEvent()}
        onClick={({ target: { value } }) => creatThumbsDownEvent(value)}
        className={thumbsDownButtonClass}
      />

      {' '}<div style={{display:'inline-block',color:'grey'}} id="myCurrentRatingContainer2">{myCurrentRating}</div>
      <div className={devElemClass}>
        <div>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
          >
            🤓
          </button>
        </div>
        <div
            id="technicalDetailsForNostrDevsContainer2"
            style={{ display: 'none' }}
          >
          <div>
            <button
              type="button"
              onClick={() => createEvent()}
              className="doSomethingButton"
            >
              step 1: package word as a nostr event
            </button>
            <button
              type="button"
              onClick={() => submitEvent()}
              className="doSomethingButton"
            >
              step 2: submit nostr event to network
            </button>
          </div>
          <div style={{ display: 'inline-block', width: '45%' }}>
          <div style={{textAlign: 'center', fontSize:'10px'}}>word (concept graph)</div>
            <textarea
              id="newConceptRawFileField2"
              style={{
                display: 'inline-block',
                height: '400px',
                width: '100%',
                fontSize: '12px',
              }}
            />
          </div>
          <div style={{ display: 'inline-block', width: '45%' }}>
            <div style={{textAlign: 'center', fontSize:'10px'}}>word submitted as an event (a nostr note)</div>
            <textarea
              id="newConceptEventFiel2"
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
  );
};
export default CreateNewRating;
