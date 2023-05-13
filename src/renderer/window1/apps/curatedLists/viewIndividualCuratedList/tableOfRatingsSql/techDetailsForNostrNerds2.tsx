
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({event_id, oWord}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }

  const curatedLists = useSelector((state) => state.curatedLists);

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
            View technical details for nostr nerds
          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton"
          >
            toggle 🤓
          </button>
          {' '}<span style={{ fontSize: '10px' }}>
            (rating encoded as a concept graph 'word')
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
          <div>{JSON.stringify(oWord,null,4)}</div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
