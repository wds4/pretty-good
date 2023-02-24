import { useSelector, useDispatch } from 'react-redux';
import {
  updateNostrRelayStoreAndSql,
  addNostrRelay,
  removeNostrRelay,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  addNewRelayToSql,
  deleteRelayUrlFromSql,
} from 'renderer/window1/lib/pg/sql';
import { noteEncode } from 'nostr-tools/nip19';
import EndorseRelayMessage from './endorseRelayMessage';

const RelaysSettings = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  const oRelaysData = useSelector((state) => state.nostrSettings.nostrRelays);
  const processStateChange = (newState, url) => {
    console.log(`toggleRelayActiveState; newState: ${newState}; url: ${url}`);
    const oNewState = {};
    oNewState.url = url;
    oNewState.active = newState;
    dispatch(updateNostrRelayStoreAndSql(oNewState));
    // need to add function to nostr-react so that relays can be changed dynamically
    const e3 = document.getElementById('needToRestartMessage');
    if (e3) {
      e3.style.display = 'block';
    }
  };
  const addNewRelay = async () => {
    const e1 = document.getElementById('newRelayTextarea');
    if (e1) {
      const newUrl = `wss://${e1.value}`;
      console.log(`newUrl: ${newUrl}`);
      const res = await addNewRelayToSql(newUrl);
      dispatch(addNostrRelay(newUrl));
      if (res) {
        const e2 = document.getElementById('newRelayAddedSuccess');
        if (e2) {
          const successMessage = `${newUrl} successfully added to the database.`;
          e2.innerHTML = successMessage;
          const e3 = document.getElementById('needToRestartMessage');
          if (e3) {
            e3.style.display = 'block';
          }
        }
      }
    }
  };
  const deleteRelay = (url) => {
    console.log(`deleteRelay; url: ${url}`);
    const e = document.getElementById(`delete_${url}`);
    if (e) {
      e.style.display = 'inline-block';
    }
  };
  const deleteRelayForReal = (url) => {
    console.log(`deleteRelayForReal; url: ${url}`);
    const res = deleteRelayUrlFromSql(url);
    dispatch(removeNostrRelay(url));
    console.log(`deleteRelayForReal; res: ${JSON.stringify(res, null, 4)}`);
    // const e = document.getElementById("relayInfoContainer_"+url)
    // if (e) { e.style.backgroundColor="#9F9F9F"; }
  };
  const aRelayUrls = Object.keys(oRelaysData);
  return (
    <>
      <pre className={devModeClassName}>
        {JSON.stringify(oRelaysData, null, 4)}
      </pre>
      <div style={{ border: '1px dashed orange' }}>
        <div style={{ display: 'inline-block', border: '1px dashed grey' }}>
          {aRelayUrls.map((url) => {
            const oRelayData = oRelaysData[url];
            const initState = oRelayData.active;
            const deleteButton2Id = `delete_${url}`;
            const relayInfoContainerId = `relayInfoContainer_${url}`;
            return (
              <>
                <div className="relayInfoContainer" id={relayInfoContainerId}>
                  <input
                    className="relayCheckbox"
                    style={{ display: 'inline-block' }}
                    type="checkbox"
                    checked={oRelayData.active}
                    onChange={(e) => processStateChange(e.target.checked, url)}
                  />
                  <div className="relayUrlContainer">{oRelayData.url}</div>
                  <div
                    className="deleteRelayButton doSomethingButton"
                    onClick={() => deleteRelay(url)}
                  >
                    delete
                  </div>
                  <div
                    className="deleteRelayButton doSomethingButton"
                    style={{ display: 'none' }}
                    onClick={() => deleteRelayForReal(url)}
                    id={deleteButton2Id}
                  >
                    delete completely from SQL; are your sure?
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{ display: 'inline-block', fontSize: '18px' }}>wss://</div>
        <textarea
          id="newRelayTextarea"
          style={{ height: '20px', width: '200px' }}
        />
        <div
          id="addRelayButton"
          className="doSomethingButton"
          onClick={addNewRelay}
        >
          add a new relay
        </div>
        <div id="newRelayAddedSuccess" />
        <div id="updateStatusSuccess" />
        <div id="deleteRelaySuccess" />
        <div
          id="needToRestartMessage"
          style={{
            backgroundColor: 'yellow',
            padding: '5px',
            border: '1px solid black',
            display: 'none',
          }}
        >
          You will need to restart the app for any changes to take effect.
        </div>
      </div>
      <EndorseRelayMessage />
    </>
  );
};
export default RelaysSettings;
