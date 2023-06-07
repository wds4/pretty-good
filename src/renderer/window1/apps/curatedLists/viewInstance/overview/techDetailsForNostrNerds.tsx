
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = () => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer"; // add event_id or some other unique identifier if multiple details per page
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
          <span style={{fontSize: '12px'}}>
            Show ratings formatted as a word as per{' '}
            <a href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/100.md">DIP-100</a>,
            a rating as per{' '}
            <a href="https://github.com/wds4/DCoSL/blob/main/dips/grapevine/201.md">DIP-201</a>,
            and packaged as a nostr event as per{' '}
            <a href="https://github.com/wds4/DCoSL/blob/main/dips/grapevine/200.md">DIP-200</a>.
          </span>
        </div>
        <div
          style={{
            display: 'none',
            fontSize: '12px',
            border: '1px dashed grey',
            padding: '3px',
          }}
        >
          <div>TechDetailsForNostrNerds</div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
