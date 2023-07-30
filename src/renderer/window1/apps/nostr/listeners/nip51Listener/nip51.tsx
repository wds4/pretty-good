import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
// import { addNip51ListToSql } from 'renderer/window1/lib/pg/sql';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const Nip51Listener = () => {
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  // set up filter
  const filter = {
    since: 0,
    kinds: [10000,10001,30000,30001],
  },
  const { events } = useNostrEvents({
    filter: filter,
  });
  // events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // store events in redux (and in sql?)
  let aEventIDs = [];
  events.forEach(async (event, item) => {
    if (!aEventIDs.includes(event.id)) {
      aEventIDs.push(event.id);
      if (doesEventValidate(event)) {
        dispatch(addList(event));
        // await addNip51ListToSql(event);
      }
    }
  });
  if (devMode) {
    return (
      <>
        <div className={devElemClass} >
          <div className="listenerBox">
            <div className="h4">Nip51Listener</div>
            <div>numMessages received: {events.length}</div>
            {events.map((event, index) => {
              if (doesEventValidate(event)) {
                return (
                  <>
                    <div className="listenerInfoContainer">
                      <div className="listenerEventBox">{JSON.stringify(event,null,4)}</div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

export default Nip51Listener;
