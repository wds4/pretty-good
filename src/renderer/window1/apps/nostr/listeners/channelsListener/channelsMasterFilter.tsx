import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  addThreadedTapestryEvent,
} from 'renderer/window1/redux/features/curatedChannels/channels/slice';

// Currently this looks for all events in testnet-902 (9902 and 39902) but not testnet-901
// May need to limit this in the future
const ChannelsMasterFilter = () => {
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  // const devMode = true;

  // set up filter
  const kind_cg_1 = 9901; // concept graph, testnet-901
  const kind_cg_2 = 9902; // concept graph, testnet-902
  const kind_g_1 = 39901; // grapevine, testnet-901
  const kind_g_2 = 39902; // grapevine, testnet-902
  const filter = {
    since: 0,
    kinds: [kind_cg_2, kind_g_2],
  };
  const { events } = useNostrEvents({
    filter,
  });

  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      dispatch(addThreadedTapestryEvent(event));
    }
  });

  if (devMode) {
    // console.log("qwerty devMode YES; number of events: "+events.length)
    return (
      <>
        <div style={{ textAlign: 'center' }}>Channels Main Listener Filter</div>
        <div>number of events: {events.length}</div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            return (
              <>
                <div
                  style={{
                    fontSize: '10px',
                    border: '2px solid purple',
                    padding: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {JSON.stringify(event, null, 4)}
                </div>
              </>
            );
          }
          return <></>;
        })}
      </>
    );
  }
  // if not devMode
  return <></>

  // alternate if not devMode
  return (
    <>
      <div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            return (
              <>
                <div>{event.id}</div>
              </>
            )
          }
        })}
      </div>
    </>
  );
};

export default ChannelsMasterFilter;
