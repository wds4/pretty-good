import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addEndorseAsRelaysPickerHunterNoteToReduxStore } from 'renderer/window1/redux/features/grapevine/listCuration/slice';
import { updateListCurationNoteInSql } from 'renderer/window1/lib/pg/sql';

/*
modify code from:
listen from ratings of instances (items) of individual lists
renderer/window1/apps/curatedLists/viewIndividualCuratedList/tableOfRatings/allRatings.jsx
*/

const CuratedListItemRatingsListener = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  // set up filter
  const kind0 = 39901;
  const filter = {
    since: 0,
    kinds: [kind0],
    '#g': ['grapevine-testnet-901'],
    // '#l': [parentConceptNostrEventID],
    // '#r': [parentConceptNostrEventID + "-genericContext"],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  // events = removeDuplicates(events);

  // store events in redux (and in sql?)
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      // dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
      // await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
    }
  });
  return (
    <>
      <div className={devElemClass}>
        <div className="listenerBox">
          <div className="h4">CuratedListItemRatingsListener</div>
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

export default CuratedListItemRatingsListener;
