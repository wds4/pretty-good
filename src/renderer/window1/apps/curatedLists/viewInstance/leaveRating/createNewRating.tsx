import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import {
  convertNameToPropertyPath,
  convertNameToSlug,
  convertNameToTitle,
} from 'renderer/window1/lib/conceptGraph';
import { nostrProfilesSlice } from 'renderer/window2/redux/features/nostr/profiles/slice';


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
        ratingTemplateSlug: "nostrCuratedListInstanceGenericRating",
        ratingTemplateTitle: "Nostr Curated List Instance: Generic Rating",
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

  const createThumbsUpEvent = () => {
    createRatingWord('up', myNostrProfile, oListSqlData, oInstanceSqlData);
  };

  const creatThumbsDownEvent = () => {
    createRatingWord('down', myNostrProfile, oListSqlData, oInstanceSqlData);
  };

  return (
    <>
      <div className="h4">Create New Rating</div>
      <button
        onClick={() => createThumbsUpEvent()}
        className="doSomethingButton"
      >
        👍
      </button>

      <button
        onClick={() => creatThumbsDownEvent()}
        className="doSomethingButton"
      >
        👎
      </button>

      <button
        onClick={() => creatThumbsDownEvent()}
        className="doSomethingButton"
      >
        more complex rating
      </button>

      <div>
        <div>
          rawFile
          <button onClick={() => createEvent()} className="doSomethingButton">
            create event
          </button>
          <button onClick={() => submitEvent()} className="doSomethingButton">
            submit event
          </button>
        </div>
        <textarea
          id="newConceptRawFileField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '40%',
            fontSize: '10px',
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
