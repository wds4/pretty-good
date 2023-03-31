import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addEndorseAsRelaysPickerHunterNoteToReduxStore } from 'renderer/window1/redux/features/grapevine/listCuration/slice';
import { updateListCurationNoteInSql } from 'renderer/window1/lib/pg/sql';

/*
modify code from:
listen for curated lists
renderer/window1/apps/curatedLists/viewListOfCuratedLists/allLists/allLists.jsx
*/

const CuratedListsListener = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();

  // set up filter
  const kind0 = 9901;
  const filter = {
    since: 0,
    kinds: [kind0],
    '#c': ['concept-graph-testnet-901'],
    '#t': ['createInstance'],
    '#s': ['nostrCuratedList'],
  },
  const { events } = useNostrEvents({
    filter: filter,
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // store events in redux (and in sql?)
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      // dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
      // await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
    }
  });
  return (
    <>
      <div className="listenerBox">
        <div className="h4">CuratedListsListener</div>
        <div>numMessages received: {events.length}</div>
        {events.map((event, index) => {
          if (doesEventValidate(event)) {
            return (
              <>
                <div className="listenerEventBox">{JSON.stringify(event,null,4)}</div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default CuratedListsListener;
