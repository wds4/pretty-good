import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({oChannels}) => {
  // const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  const devMode3 = true;
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainerD"; // add event_id or some other unique identifier if multiple details per page
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
          <span>channels.aThreadedTapestryEventIDs</span>
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
          <div>channels.aThreadedTapestryEventIDs =</div>
          <div>{JSON.stringify(oChannels.aThreadedTapestryEventIDs,null,4)}</div>

          <div style={{fontSize:'12px',height:'200px',overflow:'auto', border:'1px solid black',padding:'5px'}}>
            <div>number of nodes: {oChannels.aThreadedTapestryEventIDs.length}</div>
            {oChannels.aThreadedTapestryEventIDs.map((event_id)=>{
              if (oChannels.conceptGraph.nodes.byEventID[event_id]) {
                const oEvent = oChannels.conceptGraph.nodes.byEventID[event_id]?.event;
                const oWord = oChannels.conceptGraph.nodes.byEventID[event_id]?.word;
                const wordSlug = oWord.wordData.slug;
                return (
                  <>
                    <div style={{marginLeft: '20px'}}>{wordSlug}</div>
                    <div style={{display:'none'}}>{JSON.stringify(oWord,null,4)}</div>
                  </>
                )
              } else { return <></> }
            })}
          </div>

        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
