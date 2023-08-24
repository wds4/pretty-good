import { useSelector } from 'react-redux';
import { secsToTime } from 'renderer/window1/lib/pg';

const TechDetailsForNostrNerds = ({ events, event }) => {
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

  let oContent = {};
  if (event && event.content) {
    const sContent = event.content;
    oContent = JSON.parse(sContent);
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
          <span>actively downloaded kind:0 event</span>
        </div>
        <div
          id={elem_id}
          style={{ display: 'none', fontSize: '12px', border: '3px solid purple', padding: '3px' }}
        >
          <div>number of events: {events.length}</div>
          <pre>
            {events.map((e)=>{
              const oData = JSON.parse(e.content);
              const created_at = e.created_at;
              const howLongAgo = secsToTime(created_at);
              return (
                <>
                  <div style={{marginBottom: '20px'}}>
                    <div style={{marginBottom:'5px', padding: '5px', backgroundColor: 'red', color: 'white'}}>{howLongAgo} ago</div>
                    <div style={{marginBottom:'10px',backgroundColor: 'yellow'}}>{JSON.stringify(e,null,4)}</div>
                    <div style={{marginBottom:'10px',backgroundColor: 'blue', color: 'white'}}>{JSON.stringify(oData,null,4)}</div>
                  </div>
                </>
              )
            })}
          </pre>
          <pre>
            {JSON.stringify(oContent, null, 4)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default TechDetailsForNostrNerds;
