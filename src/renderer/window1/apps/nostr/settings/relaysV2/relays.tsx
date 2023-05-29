import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  updateNostrRelayStoreAndSql,
  addNostrRelay,
  removeNostrRelay,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  addNewRelayToSql,
  deleteRelayUrlFromSql,
  updateNostrRelaysForActiveUserInSql,
} from 'renderer/window1/lib/pg/sql';
import { noteEncode } from 'nostr-tools/nip19';
import EndorseRelayMessage from './endorseRelayMessage';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrRelaysForActiveUserInReduxAndNostr } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const RelaysSettings = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const nostrSettings = useSelector((state) => state.nostrSettings);
  const dispatch = useDispatch();
  const { publish } = useNostr();

  const processStateChange = (newState, url, which) => {
    console.log(`toggleRelayActiveState; ${which}; newState: ${newState}; url: ${url}`);
    // update relays in current user
    let oRelaysUpdated = JSON.parse(JSON.stringify(myNostrProfile.relays))
    oRelaysUpdated[url][which] = newState;
    // update relays list for active user in redux store and broadcast to the nostr network
    dispatch(updateNostrRelaysForActiveUserInReduxAndNostr(oRelaysUpdated,myNostrProfile,publish)); // NO LONGER UPDATES IN SQL
    // then transfer updated settings to the nostr settings store, which makes them the active relay list
    updateNostrRelaysForActiveUserInSql(oRelaysUpdated);
    dispatch(resetNostrSettingsNostrRelays(oRelaysUpdated));
  };

  const oRelaysData = myNostrProfile.relays;
  const aRelays = Object.keys(oRelaysData);
  return (
    <>
      <div style={{ width: '100%', marginBottom: '5px' }}>
        <div className="h3"><a id="relaysSettingsMyRelays">My Relays</a></div>
        <Tooltip
          anchorSelect="#relaysSettingsMyRelays"
          html={tooltipContent.relaysSettingsMyRelays}
          clickable
          className="reactTooltip"
        />
        <br/>
        {aRelays.map((url) => {
          const oRelayData = oRelaysData[url];
          const relayInfoContainerId = `relayInfoContainer_${url}`;
          return (
            <>
              <div className="relayInfoContainer" id={relayInfoContainerId}>
                <div className="relayUrlContainer">{url}</div>
                <div style={{display:'inline-block',width: '70px', fontSize: '12px'}}>
                  <input
                    className="relayCheckbox"
                    style={{ display: 'inline-block' }}
                    type="checkbox"
                    checked={oRelayData.read}
                    onChange={(e) => processStateChange(e.target.checked, url, 'read')}
                  />
                  read
                </div>
                <div style={{display:'inline-block',width: '100px', fontSize: '12px' }}>
                  <input
                    className="relayCheckbox"
                    style={{ display: 'inline-block' }}
                    type="checkbox"
                    checked={oRelayData.write}
                    onChange={(e) => processStateChange(e.target.checked, url, 'write')}
                  />
                  write
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default RelaysSettings;
