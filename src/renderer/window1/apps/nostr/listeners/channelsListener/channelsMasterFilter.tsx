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
  // const devMode = false;

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
        <div style={{ textAlign: 'center' }}>ChannelsMasterFilter</div>
        <div>number of events: {events.length}</div>
        {events.map((event) => {
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

            let parentConceptNostrEventID = "none";
            if (e0) {
              parentConceptNostrEventID = e0[1];
            }

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
                  <br />
                  <div>kind: {kind}</div>
                  <div>c0: {c0}</div>
                  <div>d0: {d0}</div>
                  <div>e0: {e0}</div>
                  <div>g0: {g0}</div>
                  <div>l0: {l0}</div>
                  <div>m0: {m0}</div>
                  <div>p0: {p0}</div>
                  <div>r0: {r0}</div>
                  <div>s0: {s0}</div>
                  <div>t0: {t0}</div>
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
