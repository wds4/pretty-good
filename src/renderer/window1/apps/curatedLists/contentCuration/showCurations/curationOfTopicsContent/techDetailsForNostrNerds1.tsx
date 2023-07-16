
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({
  aNostrTopicSlugs,

  aCuratorRatingEventIDs,
  aRaterOfCuratorPubkeys,
  aRateeOfCuratorPubkeys,
}) => {
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
          <span>relevant data from redux</span>
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
            <div>aNostrTopicSlugs: {JSON.stringify(aNostrTopicSlugs,null,4)}</div>
            <hr />
            <div>aCuratorRatingEventIDs: {JSON.stringify(aCuratorRatingEventIDs,null,4)}</div>
            <div>aRaterOfCuratorPubkeys: {JSON.stringify(aRaterOfCuratorPubkeys,null,4)}</div>
            <div>aRateeOfCuratorPubkeys: {JSON.stringify(aRateeOfCuratorPubkeys,null,4)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
