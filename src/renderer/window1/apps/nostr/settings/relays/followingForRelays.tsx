import React, { useState, setState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';
import MiniProfile from './miniProfile';
import ToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { updateNostrRelaysForActiveUserInReduxAndNostr } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrRelaysForActiveUserInSql } from 'renderer/window1/lib/pg/sql';

const RelaysPanel = ({ aRecRelays, oRecRelays, aFollowingForRelays }) => {
  const { publish } = useNostr();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const oMyRelays = myNostrProfile.relays;
  const aMyRelays = Object.keys(oMyRelays);
  const dispatch = useDispatch();
  const processStateChange = async (newState, url) => {
    console.log(`processStateChange; url: ${url}; newState: ${newState}`)

    const oRelaysUpdated = JSON.parse(JSON.stringify(myNostrProfile.relays));
    if (newState) {
      oRelaysUpdated[url] = { read: true, write: true };
    } else {
      delete oRelaysUpdated[url];
    }
    // update relays list for active user in redux store and broadcast to the nostr network
    dispatch(
      updateNostrRelaysForActiveUserInReduxAndNostr(
        oRelaysUpdated,
        myNostrProfile,
        publish
      )
    );
    // then transfer updated settings to the nostr settings store, which makes them the active relay list
    updateNostrRelaysForActiveUserInSql(oRelaysUpdated);
    dispatch(resetNostrSettingsNostrRelays(oRelaysUpdated));
  };
  return (
    <>
      <div>
        <div className="h4" style={{marginBottom:'10px'}}>Recommended Relays</div>
        <div>
          {aRecRelays.map((url) => {
            const toggleSwitchLabel = url;
            let initState = false;
            if (aMyRelays.includes(url)) {
              initState = true;
            }
            return (
              <>
                <div style={{marginBottom:'5px'}}>
                  <div
                    style={{
                      display: 'inline-block',
                      width: '300px',
                      fontSize: '14px',
                    }}
                  >
                    {url}
                  </div>
                  <div
                    className="singleRelayUrlRWContainer"
                    style={{ display: 'inline-block', width: '100px' }}
                  >
                    <ToggleSwitch
                      label={toggleSwitchLabel}
                      processStateChange={(newState) =>
                        processStateChange(newState, url)
                      }
                      initState={initState}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const FollowingForRelays = () => {
  const oKind3ProfilesData = useSelector(
    (state) => state.nostrProfiles.kind3NostrProfiles
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const { publish } = useNostr();
  const dispatch = useDispatch();
  let aFollowingForRelays = [];
  if (myNostrProfile.followingForRelays) {
    aFollowingForRelays = myNostrProfile.followingForRelays;
  }
  const oRecRelays = {};
  const aRecRelays = [];
  for (let r = 0; r < aFollowingForRelays.length; r++) {
    const pk = aFollowingForRelays[r];
    if (oKind3ProfilesData && oKind3ProfilesData.hasOwnProperty(pk)) {
      const oKind3Event = oKind3ProfilesData[pk];
      if (oKind3Event && oKind3Event.hasOwnProperty('content') && oKind3Event.content) {
        const oRelays = JSON.parse(oKind3Event.content);
        oRecRelays[pk] = oRelays;
        let aRelays = [];
        if (oRelays) {
          aRelays = Object.keys(oRelays);
        }
        for (let x = 0; x < aRelays.length; x++) {
          const url = aRelays[x];
          if (!aRecRelays.includes(url)) {
            aRecRelays.push(url);
          }
        }
      }
    }
  }
  return (
    <>
      <div style={{ width: '100%', border: '1px dashed grey', padding: '5px' }}>
        <div className="h4">Recommended Relays Pickers</div>
        list of the relays lists I am following; number:{' '}
        {aFollowingForRelays.length}
        <div>
          {aFollowingForRelays.map((pk) => {
            return (
              <>
                <div>
                  <input type="checkbox" checked="checked" />
                  <MiniProfile pubkey={pk} />
                </div>
              </>
            );
          })}
        </div>
        <RelaysPanel
          aRecRelays={aRecRelays}
          oRecRelays={oRecRelays}
          aFollowingForRelays={aFollowingForRelays}
        />
      </div>
    </>
  );
};
export default FollowingForRelays;
