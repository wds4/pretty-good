import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const ratingTemplateSlug = 'nostrCuratedListsCuratorEndorsement';
const ratingTemplateTitle = 'Nostr Curated Lists Curator Endorsement';
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
  curatedListFocusID,
  aListData,
  pubkeyFocusID,
  userData
) => {
  let rsR = 0;
  let defaultConfidence = 80;
  if (which == 'up') {
    rsR = 100;
  }
  if (which == 'down') {
    rsR = 0;
  }
  if (which == 'abstain') {
    rsR = 100;
    defaultConfidence = 0;
  }
  // console.log("aListData top: "+JSON.stringify(aListData))
  let oListSqlData = {};
  let oLSD = false;
  for (let x = 0; x < aListData.length; x++) {
    const oListSqlDataNext = aListData[x];
    if (curatedListFocusID == oListSqlDataNext.event_id) {
      oListSqlData = JSON.parse(JSON.stringify(oListSqlDataNext));
      // console.log("oListSqlData C: "+JSON.stringify(oListSqlData))
      oLSD = true;
    }
  }

  if (oLSD) {
    // console.log("oListSqlData B: "+JSON.stringify(oListSqlData))
    // LIST
    const list_event_id = oListSqlData?.event_id;
    const oListEvent = JSON.parse(oListSqlData.event);
    const oListWord = JSON.parse(oListEvent.content);
    const { propertyPath } = oListWord.nostrCuratedListData;
    const listNameSingular = oListWord.nostrCuratedListData.name.singular;
    const listSlugSingular = oListWord.nostrCuratedListData.slug.singular;

    // PROFILE BEING RATED
    const profileName = userData?.name;
    const profileDisplayName = userData?.display_name;

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
          rateeType: 'nostrProfile',
          nostrProfileData: {
            pubkey: pubkeyFocusID,
            name: profileName,
            display_name: profileDisplayName,
          },
        },
        ratingTemplateData: {
          ratingTemplateSlug,
          ratingTemplateTitle,
        },
        ratingFieldsetData: {
          ratingFieldsetSlugs: [
            'nostrCuratedListsCuratorEndorsementFieldset',
            'confidenceFieldset',
          ],
          confidenceFieldsetData: {
            confidence: defaultConfidence,
          },
          nostrCuratedListsCuratorEndorsementFieldsetData: {
            regularSliderRating: rsR,
            referenceRegularSliderRating: 100,
            referenceData: {
              referenceEntityType: 'nostrProfile',
              nostrProfileData: {
                pubkey: myNostrProfile.pubkey_hex,
                name: myNostrProfile.name,
                display_name: myNostrProfile.display_name,
              },
            },
            contextData: {
              transitivity: true,
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
  }
};

const CreateNewRating = ({ aListData, userData }) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
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
    const sEvent = document.getElementById('newConceptEventField').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const e1 = document.getElementById('newConceptRawFileField');
    const e2 = document.getElementById('newConceptEventField');

    const contextDAGSlug = 'genericContext'; // future: slug or eventID of user-created ratingTemplate e.g. "easeOfUse" for btc wallets
    const ratingTemplateUniqueID = `${curatedListFocusID}-${ratingTemplateSlug}-${contextDAGSlug}`;
    const uniqueID = `${myPubkey}-${pubkeyFocusID}-${curatedListFocusID}-${ratingTemplateSlug}-${contextDAGSlug}`;

    const kind0 = 39901;
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
    event.sig = signEvent(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };

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
      aListData,
      pubkeyFocusID,
      userData
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
      aListData,
      pubkeyFocusID,
      userData
    );
    createEvent();
    submitEvent();
  };
  let thumbsUpButtonClass = 'endorseThumbsUpButton';
  let thumbsDownButtonClass = 'endorseThumbsDownButton';
  let thumbsUpCurrentState = 'notEndorsed';
  let thumbsDownCurrentState = 'notEndorsed';
  let myCurrentRating = "not rated";
  const z = document.getElementById("myCurrentRatingContainer");
  if (z) {
    z.style.color = "grey";
  }
  // lookup whether this user is already rated by me
  const curatedLists = useSelector((state) => state.curatedLists.curatedLists);
  if (curatedLists.hasOwnProperty(curatedListFocusID)) {
    if (curatedLists[curatedListFocusID].curators.hasOwnProperty(pubkeyFocusID)) {
      if (curatedLists[curatedListFocusID].curators[pubkeyFocusID].thumbsUp.includes(myPubkey)) {
        // I have rated this user thumbs up
        thumbsUpCurrentState = 'endorsed';
        thumbsUpButtonClass = 'unendorseThumbsUpButton';
        myCurrentRating = "👍 ENDORSED";
        const z = document.getElementById("myCurrentRatingContainer");
        if (z) {
          z.style.color = "green";
        }
      }
      if (curatedLists[curatedListFocusID].curators[pubkeyFocusID].thumbsDown.includes(myPubkey)) {
        // I have rated this user thumbs down
        thumbsDownCurrentState = 'endorsed';
        thumbsDownButtonClass = 'unendorseThumbsDownButton';
        myCurrentRating = "👎 BLOCKED";
        const z = document.getElementById("myCurrentRatingContainer");
        if (z) {
          z.style.color = "red";
        }
      }
    }
  }
  const toggleViewDetails = () => {
    const e = document.getElementById('technicalDetailsForNostrDevsContainer');
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
    <div style={{display: 'none', fontSize:'10px'}}>{curatedListFocusID}<br/>{JSON.stringify(curatedLists[curatedListFocusID],null,4)}</div>
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

      {' '}<div style={{display:'inline-block',color:'grey'}} id="myCurrentRatingContainer">{myCurrentRating}</div>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>
            View technical details for nostr nerds
          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton"
          >
            toggle 🤓
          </button>
        </div>
        <div
            id="technicalDetailsForNostrDevsContainer"
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
              id="newConceptRawFileField"
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
      </div>
    </>
  );
};
export default CreateNewRating;
