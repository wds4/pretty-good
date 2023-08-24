import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({ userDataCustom }) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer_";
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
          <span>data on this user in redux store:</span>
        </div>
        <div
          id={elem_id}
          style={{ display: 'none', fontSize: '12px', border: '1px dashed grey', padding: '3px' }}
        >
          <pre>
            <div>userDataCustom = JSON.parse(nostrProfiles[pubkey].content):</div>
            {JSON.stringify(userDataCustom, null, 4)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default TechDetailsForNostrNerds;
