import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNostr } from 'nostr-react';
import AnimateHeight from 'react-animate-height';

const RelaysStatus = () => {
  const [height, setHeight] = useState(0);
  const { connectedRelays } = useNostr();

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const nostrSettings = useSelector((state) => state.nostrSettings);
  const aActiveRelayUrls = [];
  if (nostrSettings.nostrRelays) {
  const oRelays = nostrSettings.nostrRelays;
    const aRelays = Object.keys(oRelays)
    for (let x=0;x<aRelays.length;x++) {
      if (oRelays[aRelays[x]].read) {
        aActiveRelayUrls.push(aRelays[x])
      }
    }
  }
  const aConnectedRelays = [];
  for (let x=0;x<connectedRelays.length;x++) {
    aConnectedRelays.push(connectedRelays[x].url)
  }

  return (
    <div >
      <div>
        <button
          type="button"
          id="connectedRelaysButton"
          aria-expanded={height !== 0}
          aria-controls="example-panel"
          onClick={() => setHeight(height === 0 ? 'auto' : 0)}
          style={{
            margin: '0px',
            padding: '0px 10px 0px 10px',
            border: '0px',
            fontFamily: 'Arial Rounded MT Bold',
            fontSize: '12px',
          }}
        >
          connected relays: {connectedRelays.length}
        </button>

        <AnimateHeight
          id="example-panel"
          duration={500}
          height={height} // see props documentation below
        >
          <div style={{ overflow: 'auto' }}>
            <div
              className="connectedRelaysVerboseContainer"
              id="connectedRelaysVerboseContainer"
              style={{ textAlign: 'left', display: 'block', height: 'auto', marginBottom: '10px' }}
            >
              {aActiveRelayUrls.map((url, item) => {
                let isConnected = "false";
                let singleRelayStatusClassName = "singleRelayStatusDisconnected";
                if (aConnectedRelays.includes(url)) {
                  isConnected = "true";
                  singleRelayStatusClassName = "singleRelayStatusConnected";
                }
                return (
                  <div className={singleRelayStatusClassName} >
                    {item + 1}: {url}
                  </div>
                );
              })}
              <pre style={{ display: 'inline-block', width: '250px', fontSize: '8px', border: '1px solid black', padding: '5px' }}>
                <center>connectedRelays</center>
                {JSON.stringify(connectedRelays,null,4)}
              </pre>
              <pre style={{ display: 'inline-block', width: '250px', fontSize: '8px', border: '1px solid black', padding: '5px' }}>
                <center>nostr relay stats</center>
                {JSON.stringify(nostrSettings.nostrRelayStats,null,4)}
              </pre>
              <pre style={{ display: 'inline-block', width: '250px', fontSize: '8px', border: '1px solid black', padding: '5px' }}>
                <center>redux: nostrSettings.nostrRelays</center>
                <center>(fed into NostrProvider)</center>
                {JSON.stringify(nostrSettings.nostrRelays,null,4)}
              </pre>
              <pre style={{ display: 'inline-block', width: '250px', fontSize: '8px', border: '1px solid black', padding: '5px' }}>
                <center>redux: myNostrProfile.relays</center>
                <center>(current user)</center>
                {JSON.stringify(myNostrProfile.relays,null,4)}
              </pre>
            </div>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};
export default RelaysStatus
