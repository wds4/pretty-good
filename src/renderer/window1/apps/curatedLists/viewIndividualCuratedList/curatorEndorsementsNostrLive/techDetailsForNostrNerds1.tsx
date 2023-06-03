
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({events,filter}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer1"; // add event_id or some other unique identifier if multiple details per page
  const toggleViewDetails = () => {
    const e = document.getElementById(elem_id);
    const currentState = e.style.display;
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  };
  return (
    <>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>

          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
          >
            🤓
          </button>
          <span>nostr filter</span>
        </div>
        <div
          id={elem_id}
          style={{
            display: 'none',
            fontSize: '12px',
            border: '1px dashed grey',
            padding: '3px',
          }}
        >
          <div style={{marginBottom: '20px'}}>
            See:{' '}
            <a target="_blank" href="https://github.com/wds4/DCoSL/blob/main/dips/grapevine/200.md">DIP-200: publication of an attestation over nostr</a>
          </div>
          <div style={{fontSize: '14px'}}>
            <div>number of events: {events.length}</div>
            <div>filter:</div>
            {JSON.stringify(filter,null,4)}
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
