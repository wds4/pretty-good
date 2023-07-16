
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({oGrapevine}) => {
  // const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  const devMode3 = true;
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainerB"; // add event_id or some other unique identifier if multiple details per page
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

  const foo1 = oGrapevine.nostrCuratedListInstanceGenericRating;
  const foo2 = oGrapevine.nostrCuratedListsCuratorEndorsement;
  const foo3 = oGrapevine.nostrChannelTopicsCuratorEndorsement;
  const foo4 = oGrapevine.nostrChannelTopicContentCreatorEndorsement;
  const foo5 = oGrapevine.nostrChannelTopicsTreeStructureCuratorEndorsement;
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
          <span>channels.grapevine</span>
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
            <div>channels.grapevine =</div>
            <div>{JSON.stringify(oGrapevine,null,4)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
