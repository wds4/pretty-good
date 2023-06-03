
import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({oWord}) => {
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
          list as a word
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
            See:
            <li><a style={{textDecoration: 'none'}} href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/100.md" target="_blank">DIP-100: words</a></li>
            <li><a style={{textDecoration: 'none'}} href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/106.md" target="_blank">DIP-106: lists</a></li>
            <li><a style={{textDecoration: 'none'}} href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/107.md" target="_blank">DIP-107: json schema</a></li>
            <br />
            <div>
            There are several deviations from the above DIPs, due to the fact that testnet-1 was launched prior to initial rough draft of DIPs.
            </div>
            <br />
            <li>wordData is not included (may change DIP-100 to say this is allowed)</li>
            <li>nostrCuratedListData is used rather than listData</li>
            <li>nostrCuratedListData and jsonSchemaData are merged into the same word.</li>
          </div>
          <br />
          <div>{JSON.stringify(oWord,null,4)}</div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
