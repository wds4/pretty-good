
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({aListData}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer3"; // add event_id or some other unique identifier if multiple details per page
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
            (SQL for curated lists; individual notes)
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
          <div>SQL for curated lists</div>
          <div>query: const sql1 = ` SELECT * FROM curatedLists `;</div>
          <div>{aListData.map((oListData)=>{
            const event = oListData.event;
            return (
              <>
                <div style={{marginBottom: '20px'}}>
                  <div>{oListData.id}</div>
                  <div>{JSON.stringify(JSON.parse(event),null,4)}</div>
                </div>
              </>
            );
          })}</div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
