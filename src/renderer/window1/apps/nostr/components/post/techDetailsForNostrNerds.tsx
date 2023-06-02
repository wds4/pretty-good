import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({ event, extractedVideoUrl, extractedImageUrl }) => {
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

  const aaETags = event.tags.filter(
    ([k, v]) => k === 'e' && v && v !== ''
  );
  const aETags = [];
  for (let x=0;x<aaETags.length;x++) {
    aETags.push(aaETags[x][1]);
  }

  const aaPTags = event.tags.filter(
    ([k, v]) => k === 'p' && v && v !== ''
  );
  const aPTags = [];
  for (let x=0;x<aaPTags.length;x++) {
    aPTags.push(aaPTags[x][1]);
  }

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
          style={{ display: 'none', fontSize: '10px', border: '1px dashed grey', padding: '3px' }}
        >
          <div>extractedVideoUrl: {extractedVideoUrl}</div>
          <div>extractedImageUrl: {extractedImageUrl}</div>
          <div>
            {JSON.stringify(event, null, 4)}
          </div>

          <br/>
          <div>
            <div>ids of e-referenced events:</div>
            {JSON.stringify(aETags)}
          </div>

          <br/>
          <div>
            <div>ids of p-referenced profiles:</div>
            {JSON.stringify(aPTags)}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechDetailsForNostrNerds;
