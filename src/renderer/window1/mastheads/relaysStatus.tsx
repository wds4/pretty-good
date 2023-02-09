import { useState } from 'react';
import { useNostr } from 'nostr-react';
import AnimateHeight from 'react-animate-height';

const RelaysStatus = () => {
  const [height, setHeight] = useState(0);
  const { connectedRelays } = useNostr();

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
          <div style={{ overflow: 'scroll' }}>
            <div
              className="connectedRelaysVerboseContainer"
              id="connectedRelaysVerboseContainer"
              style={{ textAlign: 'left', display: 'block', height: 'auto', marginBottom: '10px' }}
            >
              {connectedRelays.map((oRelay, item) => {
                const { url } = oRelay;
                return (
                  <div>
                    {item + 1}: {url}
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};
export default RelaysStatus
