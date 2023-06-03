import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addCuratorEndorsement } from 'renderer/window1/redux/features/curatedLists/lists/slice';
import { addEndorsementOfListCuratorEventToSql } from 'renderer/window1/lib/pg/sql';

/*
modify code from:
listen for endorsements of a curator from a specified list
renderer/window1/apps/curatedLists/viewIndividualCuratedList/curatorEndorsements/allEndorsements
*/

const CuratorEndorsementsListener = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  // const { aRatingsOfCuratorsEventIDs } = useSelector((state) => state.curatedLists);

  // set up filter
  // make an array for all known parentConceptNostrEventID ????
  const kind0 = 39901;
  const filter = {
    since: 0,
    kinds: [kind0],
    '#g': ['grapevine-testnet-901'],
    // '#l': [parentConceptNostrEventID],
    // '#r': [parentConceptNostrEventID + "-nostrCuratedListsCuratorEndorsement-genericContext"],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // store events in redux (and in sql?)
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      // if (!aRatingsOfCuratorsEventIDs.includes(event.id)) {}
      // dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
      // await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
      dispatch(addCuratorEndorsement(event));
      const parentConceptNostrEventID = event.tags.find(
        ([k, v]) => k === 'l' && v && v !== ''
      )[1];

      const oWord = JSON.parse(event.content);
      if (oWord) {
        if (oWord.hasOwnProperty("ratingData")) {
          if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
            if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListsCuratorEndorsementFieldsetData")) {
              const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
              addEndorsementOfListCuratorEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
            }
          }
        }
      }

    }
  });
  return (
    <>
      <div className={devElemClass}>
        <div className="listenerBox">
          <div className="h4">CuratorEndorsementsListener</div>
          <div>numMessages received: {events.length}</div>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              const oWord = JSON.parse(event.content);
              return (
                <>
                  <div className="listenerInfoContainer">
                    <div className="listenerEventBox">{JSON.stringify(event,null,4)}</div>
                    <div className="listenerWordBox">{JSON.stringify(oWord,null,4)}</div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CuratorEndorsementsListener;
