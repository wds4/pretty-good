import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({event}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = "";
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }

  const elem_id = "technicalDetailsForNostrDevsContainer_"+event.id; // add event_id or some other unique identifier if multiple details per page
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
          <span>
            {event.tags.length}; listName: {listName}
          </span>
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
          <div>
            {JSON.stringify(event,null,4)}
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
