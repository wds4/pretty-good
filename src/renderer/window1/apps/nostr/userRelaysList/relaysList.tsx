import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNostr, useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import ToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { updateNostrRelaysForActiveUserInReduxAndNostr } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrRelaysForActiveUserInSql } from 'renderer/window1/lib/pg/sql';
import { isValidObjString } from 'renderer/window1/lib/pg/';

export default function RelaysList() {
  const { publish } = useNostr();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const oMyRelays = myNostrProfile.relays;
  const aMyRelays = Object.keys(oMyRelays);
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const dispatch = useDispatch();
  const processStateChange = async (newState, url) => {
    console.log(`processStateChange; url: ${url}; newState: ${newState}`)
    const oRelaysUpdated = JSON.parse(JSON.stringify(myNostrProfile.relays));

    /*
    if (newState) {
      dispatch(addNewRelay(url))
    } else {
      dispatch(removeRelay(url))
    }
    */
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

  let name = '?';
  let displayName = '?';
  let avatarUrl = noProfilePicUrl;
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    const profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = profileContent.name;
    displayName = profileContent.display_name;
    if (profileContent.picture) {
      avatarUrl = profileContent.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0, // all new events from now
      kinds: [3],
    },
  });
  let oRelays = {};
  if (events.length > 0) {
    const event = returnMostRecentEvent(events);
    if (event && doesEventValidate(event)) {
      if (event.hasOwnProperty('content')) {
        const sRelays = event.content;
        if (isValidObjString(event.content)) {
          oRelays = JSON.parse(sRelays);
        }
      }
    }
  }
  const aRelays = Object.keys(oRelays);

  return (
    <>
      <NavLink
        to="/NostrHome/NostrViewProfile"
        className="goToUserProfileButton"
      >
        <div className="h4" style={{ marginBottom: '10px', fontSize: '28px' }}>
          <div className="userListSmallAvatarContainer">
            <img src={avatarUrl} onError={(event) => (event.target.src = noProfilePicUrl)} className="userListSmallAvatarBox" />
          </div>
          <span
            style={{
              color: 'grey',
              marginLeft: '10px',
              marginRight: '5px',
            }}
          >
            @{name}
          </span>{' '}
          relays
        </div>
      </NavLink>
      <div
        style={{
          padding: '5px',
          marginBottom: '10px',
          backgroundColor: '#CFCFCF',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '30%',
            overflow: 'auto',
          }}
        >
          url
        </div>
        <div
          className="singleRelayUrlRWContainer"
          style={{ display: 'inline-block', width: '100px' }}
        >
          Read
        </div>
        <div
          className="singleRelayUrlRWContainer"
          style={{ display: 'inline-block', width: '100px' }}
        >
          Write
        </div>
        <div
          className="singleRelayUrlRWContainer"
          style={{ display: 'inline-block', width: '100px' }}
        >
          included in my relay list
        </div>
      </div>
      {aRelays.map((url) => {
        const toggleSwitchLabel = url;
        let initState = false;
        if (aMyRelays.includes(url)) {
          initState = true;
        }
        const oRelayInfo = oRelays[url];

        let readHTML = '?';
        if (oRelayInfo.read) {
          readHTML = 'yes';
        } else {
          readHTML = 'no';
        }
        let writeHTML = '?';
        if (oRelayInfo.write) {
          writeHTML = 'yes';
        } else {
          writeHTML = 'no';
        }
        return (
          <>
            <div
              clasName="singleRelayUrlContainer"
              style={{
                padding: '5px',
                marginBottom: '10px',
              }}
            >
              <div
                className="singleRelayUrlNameContainer"
                style={{
                  display: 'inline-block',
                  width: '30%',
                  overflow: 'auto',
                }}
              >
                {url}
              </div>
              <div
                className="singleRelayUrlRWContainer"
                style={{ display: 'inline-block', width: '100px' }}
              >
                {readHTML}
              </div>
              <div
                className="singleRelayUrlRWContainer"
                style={{ display: 'inline-block', width: '100px' }}
              >
                {writeHTML}
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
    </>
  );
}
