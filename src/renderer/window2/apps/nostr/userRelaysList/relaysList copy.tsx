import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';

export default function RelaysList() {
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
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
  if (events.length > 0) {
    const event = returnMostRecentEvent(events);
    if (doesEventValidate(event)) {
      if (event.hasOwnProperty('content')) {
        const content = JSON.parse(event.content);
        const aRelayUrls = Object.keys(content);
        return (
          <>
            <pre style={{ display: 'none' }}>
              {JSON.stringify(content, null, 4)}
            </pre>
            <NavLink
              to="/NostrHome/NostrViewProfile"
              className="goToUserProfileButton"
            >
              <div
                className="h4"
                style={{ marginBottom: '10px', fontSize: '28px' }}
              >
                <div className="userListSmallAvatarContainer">
                  <img src={avatarUrl} className="userListSmallAvatarBox" />
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
                backgroundColor:"#CFCFCF",
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
            </div>
            {aRelayUrls.map((url) => {
              const oRelayInfo = content[url];
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
                  <pre style={{ display: 'none' }}>
                    {JSON.stringify(oRelayInfo, null, 4)}
                  </pre>
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
                  </div>
                </>
              );
            })}
          </>
        );
      }
    }
  }
  /*
  return (
    <>
      <div className="h4">relays</div>
      {events.map((event) => {
        return (
          <>
            <pre>{JSON.stringify(event, null, 4)}</pre>
          </>
        );
      })}
    </>
  );
  */

  /*
  const event = returnMostRecentEvent(events);
  if (doesEventValidate(event)) {
    if (event.hasOwnProperty('content')) {
      return (
        <>
          <pre>{JSON.stringify(event,null,4)}</pre>
        </>
      );
    }
  }
  */
}
