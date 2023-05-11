import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { noProfilePicUrl } from 'renderer/window1/const';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ToggleMultiClientAccess from './toggleMultiClientAccess';
import MyProfileListener from 'renderer/window1/apps/nostr/listeners/myProfileListener';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';
import TechDetailsForNostrNerds4 from './techDetailsForNostrNerds4';

export default function MyProfile() {
  const dispatch = useDispatch();
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  let aFollowers = [];
  let oRelays = {};
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  if (myNostrProfile.followers) {
    aFollowers = myNostrProfile.followers;
  }
  if (myNostrProfile.relays) {
    oRelays = myNostrProfile.relays;
  }
  let numRelaysRead = 0;
  let numRelaysWrite = 0;
  for (let x = 0; x < Object.keys(oRelays).length; x++) {
    const url = Object.keys(oRelays)[x];
    if (oRelays[url].read) {
      numRelaysRead += 1;
    }
    if (oRelays[url].write) {
      numRelaysWrite += 1;
    }
  }
  let sMultiClientAccess = 'DISABLED';
  let multiClientAccessClassName = 'mcaDisabled';
  if (myNostrProfile.multiClientAccess) {
    sMultiClientAccess = 'ENABLED';
    multiClientAccessClassName = 'mcaEnabled';
  }
  let myProfilePicUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    if (myNostrProfile.picture_url != "undefined") {
      myProfilePicUrl = myNostrProfile.picture_url;
    }
  }
  return (
    <div>
      <div className="mainUserProfileBox myProfileBox">
        <div className="mainUserProfileLeftColumnContainer">
          <div id="largeAvatarContainer" className="largeAvatarContainer">
            <div
              id="myProfileAvatarContainer"
              className="myProfileAvatarContainer"
            />
            <picture>
              <source
                srcSet={myProfilePicUrl}
                className="myProfileAvatarImg"
              />
              <img src={noProfilePicUrl} className="myProfileAvatarImg" />
            </picture>
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
              to="/NostrHome/NostrRelays"
              style={{ marginLeft: '10px' }}
            >
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                {Object.keys(oRelays).length}/{numRelaysRead}/{numRelaysWrite}
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
            <div style={{ display: 'inline-block', marginLeft: '5px' }}>
              <span style={{ color: 'grey' }}>multi client access: </span>
              <ToggleMultiClientAccess />
              <span
                className={multiClientAccessClassName}
                style={{ marginLeft: '10px' }}
              >
                {sMultiClientAccess}
              </span>
            </div>
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
      <TechDetailsForNostrNerds2 myNostrProfile={myNostrProfile} />
      <MyProfileListener />
    </div>
  );
}
/*
      <TechDetailsForNostrNerds1 />
      <TechDetailsForNostrNerds2 myNostrProfile={myNostrProfile} />
      <TechDetailsForNostrNerds3 />
      <TechDetailsForNostrNerds4 />
*/
