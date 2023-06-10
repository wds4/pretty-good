
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({event}) => {
  const event_id = event.id;
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer2_"+event_id; // add event_id or some other unique identifier if multiple details per page
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
          </button>{' '}
          <span>word wrapped as an event</span>
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
          <div>See: <a target="_blank" href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/101.md" >DIP-101: publication of a word over nostr</a></div>
          <div>{JSON.stringify(event,null,4)}</div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
