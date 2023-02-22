import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ToggleMultiClientAccess from './toggleMultiClientAccess';

export default function MyProfile() {
  const dispatch = useDispatch();
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  let aFollowers = [];
  let aRelays = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  if (myNostrProfile.followers) {
    aFollowers = myNostrProfile.followers;
  }
  if (myNostrProfile.relays) {
    aRelays = myNostrProfile.relays;
  }
  let sMultiClientAccess = "DISABLED";
  let multiClientAccessClassName = "mcaDisabled";
  if (myNostrProfile.multiClientAccess) {
    sMultiClientAccess = "ENABLED";
    multiClientAccessClassName = "mcaEnabled";
  }
  return (
    <div>
      <pre className={devModeClassName}>
        {JSON.stringify(myNostrProfile, null, 4)}
      </pre>
      <div className="mainUserProfileBox myProfileBox">
        <div className="mainUserProfileLeftColumnContainer">
          <div id="largeAvatarContainer" className="largeAvatarContainer">
            <div
              id="myProfileAvatarContainer"
              className="myProfileAvatarContainer"
            />
            <img
              src={myNostrProfile.picture_url}
              className="myProfileAvatarImg"
              alt=""
            />
          </div>
          <div className="followCountContainer">
            <NavLink
              className="followsNavLink"
              to="/NostrHome/NostrMyFollowingList"
            >
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                {aFollowing.length}
              </div>
              following
            </NavLink>
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                {aFollowers.length}
              </div>
              followers
            </div>
            <NavLink
              className="followsNavLink"
              to="/NostrHome/NostrUserRelaysList"
              style={{ marginLeft: '10px' }}
            >
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                {aRelays.length}
              </div>
              relays
            </NavLink>
          </div>
        </div>

        <div
          id="mainUserProfileRightColumnContainer"
          className="mainUserProfileRightColumnContainer"
        >
          <div className="myProfileNameContainer">
            <span id="myProfileDisplayNameContainer" style={{ color: 'black' }}>
              {myNostrProfile.display_name}
            </span>
            <span
              id="myProfileNameContainer"
              style={{ color: 'grey', marginLeft: '10px' }}
            >
              @{myNostrProfile.name}
            </span>
          </div>

          <div style={{ marginBottom: '5px' }}>
            <div className="doSomethingButton" style={{ margin: '0px' }}>
              <NavLink
                to="/NostrHome/NostrEditMyProfile"
                style={{ textDecoration: 'none' }}
              >
                edit
              </NavLink>
            </div>
            <div
              className="doSomethingButton"
              style={{ margin: '0px 0px 0px 10px' }}
            >
              <NavLink
                onClick={() => {
                  dispatch(updateNostrProfileFocus(myNostrProfile.pubkey_hex));
                }}
                to={{
                  pathname: '/NostrHome/NostrViewProfile',
                  state: { pubkey: myNostrProfile.pubkey_hex },
                }}
                style={{ textDecoration: 'none' }}
              >
                nostr view
              </NavLink>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <span style={{ color: 'grey' }}>multi client access: </span>
              <ToggleMultiClientAccess />
            </div>
          </div>

          <div style={{ width: '100%', maxHeight: '70px', color: 'grey', marginBottom: '5px' }}>
            multi client access is <span className={multiClientAccessClassName} >{sMultiClientAccess}</span>
          </div>

          <div className="userProfilePubkeyContainer">
            pubkey (hex): {myNostrProfile.pubkey_hex}
            <br />
            pubkey (bech32): {myNostrProfile.pubkey_bech32}
          </div>

          <div
            id="myProfileWebsiteContainer"
            className="myProfileWebsiteContainer"
          >
            {myNostrProfile.website}
          </div>

          <div id="myProfileAboutContainer" className="myProfileAboutContainer">
            {myNostrProfile.about}
          </div>
        </div>
      </div>
    </div>
  );
}
