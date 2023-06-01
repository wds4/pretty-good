import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import MiniProfile from './miniProfile';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';

export default function FollowingList() {
  const [searchString, setSearchString] = useState("");
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let name = "?";
  let displayName = "?";
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

  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [3],
    },
  });
  console.log(
    `FollowingList; events.length: ${events.length}; pubkey: ${pubkey}`
  );
  let aFollowing = [];
  const handleChange = (event) => {
    setSearchString(event.target.value);
  }
  if (events.length > 0) {
    const event = returnMostRecentEvent(events);
    if (doesEventValidate(event)) {
      if (event.hasOwnProperty('tags')) {
        aFollowing = event.tags;
        // console.log(`FollowingList; aFollowing.length: ${aFollowing.length}`);
        return (
          <>
            <NavLink
              to="/NostrHome/NostrViewProfile"
              className="goToUserProfileButton"
            >
              <div className="h4" style={{marginBottom:"10px",fontSize:"28px"}}>
                <div className="userListSmallAvatarContainer">
                  <img alt="" src={avatarUrl} className="userListSmallAvatarBox" />
                </div>
                <span style={{color:"grey",marginLeft:"10px",marginRight:"5px"}}>@{name}</span> following
              </div>
            </NavLink >
            <div style={{textAlign: 'left',marginBottom: '5px'}}>
              <div style={{color: 'grey'}}>Search by name, display_name, about, or pubkey (hex or bech32)</div>
              <textarea
                style={{width: '99%'}}
                onChange={handleChange}
              ></textarea>
            </div>
            {aFollowing.map((oPk) => {
              if (oPk[0] == 'p') {
                const pk = oPk[1];
                return (
                  <>
                    <MiniProfile
                      searchString={searchString}
                      pubkey={pk}
                    />
                  </>
                );
              }
              return <div className={devModeClassName}>Error; {JSON.stringify(oPk)}</div>;
            })}
          </>
        );
      }
    }
  }
}
