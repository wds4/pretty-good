import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents, useProfile } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { doesEventValidate } from '../../../lib/nostr/eventValidation';
import FollowButton from './followButton';
import FollowCounts from './followCounts';
import UserGrapevinePanel from './userGrapevinePanel';

const NostrProfile = ({}) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const isNostrGrapevineOn = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  const dispatch = useDispatch();
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
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
      since: 0, // all new events from now
      kinds: [0],
    },
  });

  const event = returnMostRecentEvent(events);
  if (event && doesEventValidate(event)) {
    dispatch(updateNostrProfiles(event));
    event_ = JSON.parse(JSON.stringify(event));
    const content = JSON.parse(event.content);
    event_.content = content;
    name = content.name;
    displayName = content.display_name;
    website = content.website;
    about = content.about;
    profilePicUrl = content.picture;
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

          <div className="userProfilePubkeyContainer">
            pubkey (hex): {pubkey}
            <br />
            pubkey (bech32): {npub}
          </div>

          <div>
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
            <div className={grapevineProfileControlPanelClassName}>
              <UserGrapevinePanel />
            </div>
          </div>

          <div
            id="myProfileWebsiteContainer"
            className="myProfileWebsiteContainer"
          >
            {website}
          </div>

          <div id="myProfileAboutContainer" className="myProfileAboutContainer">
            {about}
          </div>
        </div>
      </div>
    </>
  );
};
export default NostrProfile;
