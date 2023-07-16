
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({ratingEventID, oChannels}) => {
  // const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  const devMode3 = true;
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainerE1a_"+ratingEventID; // add event_id or some other unique identifier if multiple details per page
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

  const oWord = oChannels.conceptGraph.nodes.byEventID[ratingEventID]?.word;
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
          <span>ratingEventID: {ratingEventID}</span>
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
          <div className="reduxStoreOverviewContainer">
            <div style={{ fontSize: '12px' }}>
              <div>ratingEventID: {ratingEventID}</div>
              <div>{JSON.stringify(oWord,null,4)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
