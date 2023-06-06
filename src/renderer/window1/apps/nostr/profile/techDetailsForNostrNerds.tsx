import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({ events, event, event_ }) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const event_id = event.id;
  const elem_id = "technicalDetailsForNostrDevsContainer_"+event_id;
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
        </div>
        <div
          id={elem_id}
          style={{ display: 'none', fontSize: '12px', border: '1px dashed grey', padding: '3px' }}
        >
          <pre>
            <div>number events received: {events.length}</div>
            {JSON.stringify(event_, null, 4)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default TechDetailsForNostrNerds;
