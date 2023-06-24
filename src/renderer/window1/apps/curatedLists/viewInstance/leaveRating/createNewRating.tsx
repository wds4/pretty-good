import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents, useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  addCuratedListEventToSql,
  addInstanceEventToSql,
  addRatingOfCuratedListInstanceEventToSql,
  addEndorsementOfListCuratorEventToSql,
} from 'renderer/window1/lib/pg/sql';
import {
  addCuratedList,
  addCuratedListInstance,
  addRatingOfCuratedListInstance,
  addCuratorEndorsement,
  addThreadedTapestryEvent,
} from 'renderer/window1/redux/features/curatedLists/lists/slice';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const EndorseItemListener = () => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  // set up filter
  const kind1 = 39901; // grapevine
  const filter = {
    since: 0,
    kinds: [kind1],
    authors: [myPubkey],
  };
  const { events } = useNostrEvents({
    filter,
  });

  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      const kind = event.kind;
      let c0 = event.tags.filter(([k, v]) => k === 'c' && v && v !== '')[0];
      let d0 = event.tags.filter(([k, v]) => k === 'd' && v && v !== '')[0];
      let e0 = event.tags.filter(([k, v]) => k === 'e' && v && v !== '')[0];
      let g0 = event.tags.filter(([k, v]) => k === 'g' && v && v !== '')[0];
      let l0 = event.tags.filter(([k, v]) => k === 'l' && v && v !== '')[0];
      let m0 = event.tags.filter(([k, v]) => k === 'm' && v && v !== '')[0];
      let p0 = event.tags.filter(([k, v]) => k === 'p' && v && v !== '')[0];
      let r0 = event.tags.filter(([k, v]) => k === 'r' && v && v !== '')[0];
      let s0 = event.tags.filter(([k, v]) => k === 's' && v && v !== '')[0];
      let t0 = event.tags.filter(([k, v]) => k === 't' && v && v !== '')[0];

      if (c0 && (typeof c0 == "object") && (c0.length > 1)) { c0 = c0[1]; }
      if (d0 && (typeof d0 == "object") && (d0.length > 1)) { d0 = d0[1]; }
      if (e0 && (typeof e0 == "object") && (e0.length > 1)) { e0 = e0[1]; }
      if (g0 && (typeof g0 == "object") && (g0.length > 1)) { g0 = g0[1]; }
      if (l0 && (typeof l0 == "object") && (l0.length > 1)) { l0 = l0[1]; }
      if (m0 && (typeof m0 == "object") && (m0.length > 1)) { m0 = m0[1]; }
      if (p0 && (typeof p0 == "object") && (p0.length > 1)) { p0 = p0[1]; }
      if (r0 && (typeof r0 == "object") && (r0.length > 1)) { r0 = r0[1]; }
      if (s0 && (typeof s0 == "object") && (s0.length > 1)) { s0 = s0[1]; }
      if (t0 && (typeof t0 == "object") && (t0.length > 1)) { t0 = t0[1]; }

      if ( (kind == 39901) && (g0 == "grapevine-testnet-901") ) {
        // console.log("qwerty grapevine testnet")
        // endorsements of items
        dispatch(addRatingOfCuratedListInstance(event));
        // endorsements of users
        dispatch(addCuratorEndorsement(event));

        if (l0) {
          // console.log("qwerty endorsement of item")
          const parentConceptNostrEventID = l0;
          const oWord = JSON.parse(event.content);
          if (oWord) {
            if (oWord.hasOwnProperty("ratingData")) {
              if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
                // endorsements of items
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListInstanceRatingFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
                // endorsements of users
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListsCuratorEndorsementFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addEndorsementOfListCuratorEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  return (
    <>
      <div >listen for endorsement updates; number of events: {events.length}</div>
    </>
  )
}

/*
// RATING OF A SPECIFIC INSTANCE
const contextDAGSlug = 'genericContext'; // future: slug or eventID of user-created ratingTemplate e.g. "easeOfUse" for btc wallets
const ratingTemplateUniqueID = `${curatedListFocusID}-${contextDAGSlug}`;
const uniqueID = `${myPubkey}-${curatedListInstanceFocusID}-${ratingTemplateUniqueID}`;

const aTag0 = ['g', 'grapevine-testnet-901'];
const aTag1 = ['d', uniqueID]; // d tag for Parametrized Replaceable Event
const aTag2 = ['r', ratingTemplateUniqueID]; // every [g: grapevine] should have an r tag with an indicator of the ratingTemplate
const aTag3 = ['e', curatedListInstanceFocusID]; // the ratee, by event id
const aTag4 = ['l', curatedListFocusID]; // the parent concept / list, by id
const aTag5 = ['m', contextDAGSlug];

const event: NostrEvent = {
  content: sWord,
  kind: 33901,
  tags: aTags,
  created_at: dateToUnix(),
  pubkey: getPublicKey(myPrivkey),
};

LISTENER:
renderer/window1/apps/curatedLists/viewIndividualCuratedList/allRatings
const { events } = useNostrEvents({
  filter: {
    since: 0,
    kinds: [33901],
    '#g': ['grapevine-testnet-901'],
    '#l': [parentConceptNostrEventID],
  },
});
*/

const createRatingWord = (
  which,
  myNostrProfile,
  oListSqlData,
  oInstanceSqlData
) => {
  let rsR = 0;
  if (which == 'up') {
    rsR = 100;
  }
  if (which == 'down') {
    rsR = 0;
  }
  // LIST
  const list_event_id = oListSqlData?.event_id;
  const oListEvent = JSON.parse(oListSqlData.event);
  const oListWord = JSON.parse(oListEvent.content);
  const { propertyPath } = oListWord.nostrCuratedListData;
  const listNameSingular = oListWord.nostrCuratedListData.name.singular;
  const listSlugSingular = oListWord.nostrCuratedListData.slug.singular;

  // INSTANCE
  const instance_event_id = oInstanceSqlData?.event_id;
  const oInstanceEvent = JSON.parse(oInstanceSqlData.event);
  const oInstanceWord = JSON.parse(oInstanceEvent.content);
  const instanceName = oInstanceWord[propertyPath]?.name;
  const instanceSlug = oInstanceWord[propertyPath]?.slug;

  const oWord = {
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
        rateeType: 'nostrCuratedListInstance',
        nostrCuratedListInstanceData: {
          eventID: instance_event_id,
          name: instanceName,
          slug: instanceSlug,
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
              eventID: list_event_id,
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
  const e1 = document.getElementById('newConceptRawFileField');
  e1.value = JSON.stringify(oWord, null, 4);
};

const CreateNewRating = ({
  curatedListFocusID,
  curatedListInstanceFocusID,
  oListSqlData,
  oInstanceSqlData,
}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitEvent = () => {
    const sEvent = document.getElementById('newConceptEventField').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const e1 = document.getElementById('newConceptRawFileField');
    const e2 = document.getElementById('newConceptEventField');

    const contextDAGSlug = 'genericContext'; // future: slug or eventID of user-created ratingTemplate e.g. "easeOfUse" for btc wallets
    const ratingTemplateUniqueID = `${curatedListFocusID}-${contextDAGSlug}`;
    const uniqueID = `${myPubkey}-${curatedListInstanceFocusID}-${ratingTemplateUniqueID}`;

    const kind0 = 39901;
    const aTag0 = ['g', 'grapevine-testnet-901'];
    const aTag1 = ['d', uniqueID]; // d tag for Parametrized Replaceable Event
    // if regularSliderRating is null or undefined, it effectively means no rating
    // (e.g. if a user accidentally rates) an instance and wants to undo it, you submit a rating that is null
    // break down uniqueID into components to make it more easily searchable
    const aTag2 = ['r', ratingTemplateUniqueID]; // every [g: grapevine] should have an r tag with an indicator of the ratingTemplate
    const aTag3 = ['e', curatedListInstanceFocusID]; // the ratee, by event id
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
    event.sig = signEvent(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };

  const createThumbsUpWord = () => {
    createRatingWord('up', myNostrProfile, oListSqlData, oInstanceSqlData);
    createEvent();
    submitEvent();
    indicateMessageSuccess();

    const e3 = document.getElementById('ratingTypeContainer');
    e3.innerHTML = 'Thumbs Up';
  };

  const creatThumbsDownWord = () => {
    createRatingWord('down', myNostrProfile, oListSqlData, oInstanceSqlData);
    createEvent();
    submitEvent();
    indicateMessageSuccess();

    const e3 = document.getElementById('ratingTypeContainer');
    e3.innerHTML = 'Thumbs Down';
  };

  const indicateMessageSuccess = () => {
    const e1 = document.getElementById('successMessageContainer');
    e1.style.display = 'block';

    const e2 = document.getElementById('createAndSubmitEventButtonsContainer');
    e2.style.display = 'none';
  };

  const elem_id = 'technicalDetailsForNostrDevsContainer';

  let thumbsUpButtonClass = 'endorseThumbsUpButton';
  let thumbsDownButtonClass = 'endorseThumbsDownButton';
  let thumbsUpCurrentState = 'notEndorsed';
  let thumbsDownCurrentState = 'notEndorsed';
  let myCurrentRating = "not rated";
  // lookup whether this item is already rated by me
  const curatedLists = useSelector((state) => state.curatedLists.curatedLists);
  if (curatedLists.hasOwnProperty(curatedListFocusID)) {
    if (curatedLists[curatedListFocusID].items.hasOwnProperty(curatedListInstanceFocusID)) {
      if (curatedLists[curatedListFocusID].items[curatedListInstanceFocusID].ratings.thumbsUp.includes(myPubkey)) {
        // I have rated this user thumbs up
        thumbsUpCurrentState = 'endorsed';
        thumbsUpButtonClass = 'unendorseThumbsUpButton';
        myCurrentRating = "👍 ENDORSED";
      }
      if (curatedLists[curatedListFocusID].items[curatedListInstanceFocusID].ratings.thumbsDown.includes(myPubkey)) {
        // I have rated this user thumbs down
        thumbsDownCurrentState = 'endorsed';
        thumbsDownButtonClass = 'unendorseThumbsDownButton';
        myCurrentRating = "👎 BLOCKED";
      }
    }
  }

  return (
    <>
      <div className="h4" style={{ marginTop: '20px' }}>
        Create New Rating
      </div>
      <br />
      <div>
        This page is functional but is being deprecated, with functionality
        moved to the main page for this item.
      </div>
      <br />

      <EndorseItemListener />

      <div style={{ margin: '20px 0px 20px 0px' }}>
        Thumbs up 👍 is your attestation that this item BELONGS on this list.
        <br />
        Thumbs down 👎 is your attestation that this item DOES NOT BELONG on this
        list.
      </div>

      <div id="createAndSubmitEventButtonsContainer">
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

      <div
        id="successMessageContainer"
        style={{ display: 'none', marginBottom: '20px' }}
      >
        <span id="ratingTypeContainer" /> rating submitted successfully to the
        nostr network.
        <br />
        To listen for this item on the network, navigate to the{' '}
        <i>List Items</i> menu on the left; then click the{' '}
        <i>ratings of items (nostr live)</i> button on the left.
      </div>

      <TechDetailsForNostrNerds />

      <div id={elem_id} style={{ display: 'none' }}>
        <div>
          <button
            type="button"
            onClick={() => createEvent()}
            className="doSomethingButton"
          >
            step 0: create event
          </button>
          <button
            type="button"
            onClick={() => createEvent()}
            className="doSomethingButton"
          >
            step 1: create event
          </button>
          <button
            type="button"
            onClick={() => submitEvent()}
            className="doSomethingButton"
          >
            step 2: submit event
          </button>
        </div>

        <div
          style={{ display: 'inline-block', width: '40%', fontSize: '12px' }}
        >
          <div>list rating as a 'word' (concept graph format)</div>
          <textarea
            id="newConceptRawFileField"
            style={{
              display: 'inline-block',
              height: '400px',
              width: '100%',
              fontSize: '10px',
            }}
          />
        </div>
        <div
          style={{ display: 'inline-block', width: '40%', fontSize: '12px' }}
        >
          <div>word wrapped as a nostr event</div>
          <textarea
            id="newConceptEventField"
            style={{
              display: 'inline-block',
              height: '400px',
              width: '100%',
              fontSize: '10px',
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CreateNewRating;
