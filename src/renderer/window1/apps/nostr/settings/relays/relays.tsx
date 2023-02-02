import { useSelector, useDispatch } from 'react-redux';
import { updateNostrRelayStoreAndSql } from 'renderer/window1/redux/features/nostrGlobalState/slice';
import { addNewRelayToSql } from 'renderer/window1/lib/pg/sql';

const RelaysSettings = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  const oRelaysData = useSelector(
    (state) => state.nostrGlobalState.nostrRelays
  );
  const processStateChange = (newState,url) => {
    console.log("toggleRelayActiveState; newState: "+newState+"; url: "+url)
    const oNewState={};
    oNewState.url=url;
    oNewState.active=newState;
    dispatch(updateNostrRelayStoreAndSql(oNewState));
    // need to add function to nostr-react so that relays can be changed dynamically
    const e3 = document.getElementById("needToRestartMessage");
    if (e3) {
      e3.style.display="block";
    }
  };
  const addNewRelay = async () => {
    const e1 = document.getElementById("newRelayTextarea");
    if (e1) {
      const newUrl = "wss://"+e1.value;
      console.log("newUrl: "+newUrl);
      const res = await addNewRelayToSql(newUrl);
      if (res) {
        const e2 = document.getElementById("newRelayAddedSuccess");
        if (e2) {
          const successMessage = `${newUrl} successfully added to the database.`
          e2.innerHTML = successMessage;
          const e3 = document.getElementById("needToRestartMessage");
          if (e3) {
            e3.style.display="block";
          }
        }
      }
    }

  }
  const aRelayUrls = Object.keys(oRelaysData)
  return (
    <>
      <pre className={devModeClassName}>{JSON.stringify(oRelaysData,null,4)}</pre>
      {aRelayUrls.map((url) => {
        const oRelayData = oRelaysData[url];
        let initState = oRelayData.active;

        return (
          <>
            <div className="relayInfoContainer">
              <input
                className="relayCheckbox"
                style={{ display: 'inline-block' }}
                type="checkbox"
                checked={oRelayData.active}
                onChange={(e) => processStateChange(e.target.checked,url)}
              />
              <div className="relayUrlContainer">{oRelayData.url}</div>
              <div className="deleteRelayButton doSomethingButton">delete</div>
            </div>
          </>
        );
      })}
      <div>
        <div style={{display:"inline-block",fontSize:"18px"}}>wss://</div><textarea
          id="newRelayTextarea"
          style={{ height: '20px', width: '350px' }}
        />
        <div id="addRelayButton" className="doSomethingButton" onClick={addNewRelay}>
          add a new relay
        </div>
        <div id="newRelayAddedSuccess" />
        <div id="updateStatusSuccess" />
        <div id="deleteRelaySuccess" />
        <div id="needToRestartMessage" style={{backgroundColor:"yellow",padding:"5px",border:"1px solid black",display:"none"}}>
          You will need to restart the app for any changes to take effect.
        </div>
      </div>
    </>
  );
};
export default RelaysSettings;
