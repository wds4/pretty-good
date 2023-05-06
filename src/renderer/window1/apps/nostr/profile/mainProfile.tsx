import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents, useProfile } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FollowButton from 'renderer/window1/apps/nostr/components/followButton';
import RelaysCurationBox from './relaysGrapevine';
import FollowRelaysButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/followRelaysButton';
import EndorseAsRelaysPickerButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerButton';
import EndorseAsRelaysPickerHunterButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerHunterButton';
import FollowCounts from 'renderer/window1/apps/nostr/components/followCounts';
import UserGrapevinePanel from 'renderer/window1/apps/nostr/profile/userGrapevinePanel';
import CuratedListBox from './curatedListBox';

const MainProfile = ({pubkey}) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const isNostrGrapevineOn = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  const dispatch = useDispatch();
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const npub = nip19.npubEncode(pubkey);

  const grapevineProfileControlPanelClassName = isNostrGrapevineOn
    ? "grapevineProfileControlPanel"
    : "block_hide";

  ///// STEP 1 ///// First load default profile info
  let profilePicUrl = noProfilePicUrl;
  let displayName = '';
  let name = '';
  let website = '';
  let about = '';

  let event_ = {};
  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = profileContent.name;
    displayName = profileContent.display_name;
    website = profileContent.website;
    about = profileContent.about;
    if (profileContent.picture) {
      profilePicUrl = profileContent.picture;
    } else {
      profilePicUrl = BlankAvatar;
    }
  }

  ///// alternate step 3
  const { data: userData } = useProfile({
    pubkey,
  });

  ///// STEP 3 ///// Query network for updated profile information and if found, use that instead, and update redux
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [0],
    },
  });

  const event = returnMostRecentEvent(events);
  let lnurl = 'LUNRL';
  let content = {};
  let zapButtonClassName = 'block_hide';
  if (event && doesEventValidate(event)) {
    dispatch(updateNostrProfiles(event));
    event_ = JSON.parse(JSON.stringify(event));
    content = JSON.parse(event.content);
    event_.content = content;
    name = content.name;
    displayName = content.display_name;
    website = content.website;
    about = content.about;
    profilePicUrl = content.picture;
    lnurl = content?.lud06;
    if (lnurl) {
      zapButtonClassName = 'zapButton';
    }
  }
  const toggleLnurl = () => {
    let e = document.getElementById("lud06Container");
    e.style.display = 'inline-block';
  }

  return (
    <>
      <pre className={devModeClassName}>
        number events received: {events.length}
        <br />userData:<br />
        <div>
          <p>Name: {userData?.name}</p>
          <p>Public key: {userData?.npub}</p>
          <p>Picture URL: {userData?.picture}</p>
        </div>
        {JSON.stringify(userData, null, 4)}
        <br />event_:<br />
        {JSON.stringify(event_, null, 4)}
      </pre>
      <div className="mainUserProfileBox myProfileBox">
        <div className="mainUserProfileLeftColumnContainer">
          <div id="largeAvatarContainer" className="largeAvatarContainer">
            <div
              id="myProfileAvatarContainer"
              className="myProfileAvatarContainer"
            />
            <img src={profilePicUrl} className="myProfileAvatarImg" alt="" />
          </div>
          <FollowCounts pubkey={pubkey} />
        </div>

        <div
          id="mainUserProfileRightColumnContainer"
          className="mainUserProfileRightColumnContainer"
        >
          <div className="mainUserNameContainer">
            <span id="myProfileDisplayNameContainer" style={{ color: 'black' }}>
              {displayName}
            </span>
            <span
              id="myProfileNameContainer"
              style={{ color: 'grey', marginLeft: '10px' }}
            >
              @{name}
            </span>
          </div>

          <div>
            <div onClick={()=>toggleLnurl()} style={{ display: 'inline-block', marginRight: '10px' }}>
              <div className={zapButtonClassName} style={{ fontSize: '28px' }}>⚡</div>
            </div>
            <div style={{ display: 'inline-block' }}>
              <NavLink
                end
                to="/NostrHome/NostrDirectMessageConvo"
                style={{ textDecoration: 'none' }}
              >
                <div style={{ fontSize: '28px' }}>&#x1F4AC;</div>
              </NavLink>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <FollowButton pubkey={pubkey} />
            </div>
            <br />
            <div id='lud06Container' style={{display:'none',marginLeft:'10px',fontSize:'12px',padding:'2px',border:'1px solid grey',width:'70%'}}>
              {lnurl}
            </div>
          </div>

          <div>
            <div className={grapevineProfileControlPanelClassName}>
              <div style={{marginLeft: '5px'}}>
                <CuratedListBox
                  pubkey={pubkey}
                  userData={userData}
                />
              </div>
              <div style={{display:'none'}}><RelaysCurationBox pubkey={pubkey} /></div>
              <div style={{display:'none'}}><UserGrapevinePanel /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainProfile;
