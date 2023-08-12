import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
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
  oListSqlData,
  pubkeyFocusID,
  oProfileSqlData
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

  // PROFILE BEING RATED
  const oProfileEvent = JSON.parse(oProfileSqlData.event);
  const oProfileWord = JSON.parse(oProfileEvent.content);
  const profileName = oProfileWord?.name;
  const profilePicture = oProfileWord?.picture;
  const profileDisplayName = oProfileWord?.display_name;

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
          confidence: 80,
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
};

const CreateNewRating = ({
  curatedListFocusID,
  oListSqlData,
  pubkeyFocusID,
  oProfileSqlData,
}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitEvent = () => {
    const sEvent = document.getElementById('newConceptEventField').value;
    const oEvent = JSON.parse(sEvent);
    // console.log(`oEvent: ${JSON.stringify(oEvent)}`);
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
    event.sig = getSignature(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };

  const createThumbsUpEvent = () => {
    createRatingWord(
      'up',
      myNostrProfile,
      curatedListFocusID,
      oListSqlData,
      pubkeyFocusID,
      oProfileSqlData
    );
  };
  const creatThumbsDownEvent = () => {
    createRatingWord(
      'down',
      myNostrProfile,
      curatedListFocusID,
      oListSqlData,
      pubkeyFocusID,
      oProfileSqlData
    );
  };

  return (
    <>
      <div className="h4">Create New Rating</div>
      <button
        type="button"
        onClick={() => createThumbsUpEvent()}
        className="doSomethingButton"
      >
        👍
      </button>

      <button
        type="button"
        onClick={() => creatThumbsDownEvent()}
        className="doSomethingButton"
      >
        👎
      </button>

      <div>
        <div>
          rawFile
          <button
            type="button"
            onClick={() => createEvent()}
            className="doSomethingButton"
          >
            create event
          </button>
          <button
            type="button"
            onClick={() => submitEvent()}
            className="doSomethingButton"
          >
            submit event
          </button>
        </div>
        <textarea
          id="newConceptRawFileField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '58%',
            fontSize: '12px',
          }}
        />
        <textarea
          id="newConceptEventField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '40%',
            fontSize: '10px',
          }}
        />
      </div>
    </>
  );
};
export default CreateNewRating;
