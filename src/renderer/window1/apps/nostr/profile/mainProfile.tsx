import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProfile, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import FollowButton from 'renderer/window1/apps/nostr/components/followButton';
// import FollowRelaysButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/followRelaysButton';
// import EndorseAsRelaysPickerButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerButton';
// import EndorseAsRelaysPickerHunterButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerHunterButton';
import FollowCounts from 'renderer/window1/apps/nostr/components/followCounts';
// import UserGrapevinePanel from 'renderer/window1/apps/nostr/profile/userGrapevinePanel';
// import RelaysCurationBox from './relaysGrapevine';
import { asyncLnurlDecode } from 'renderer/window1/lib/pg/asyncLnurlDecode';
import SelectListener from './mainPageListeners/selectListener';
import CuratedListBox from './curatedListBox';
import CuratedChannelsBox from './curatedChannelsBox';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';

const MainProfile = ({pubkey}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;

  let aMyRelays = [];
  const relays = useSelector((state) => state.nostrSettings.nostrRelays);
  if (relays) {
    aMyRelays = Object.keys(relays);
  }
  aMyRelays.unshift("relays");

  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const isNostrGrapevineOn = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  // const title = isNostrGrapevineOn ? 'ON' : 'OFF';

  const grapevineProfileControlPanelClassName = isNostrGrapevineOn
    ? "grapevineProfileControlPanel"
    : "block_hide";

  const followButtonDisplay = isNostrGrapevineOn
    ? "none"
    : "inline-block"

  ///// STEP 1 ///// First load default profile info
  let profilePicUrl = noProfilePicUrl;
  let bannerPicUrl = "";
  let displayName = '';
  let name = '';
  let website = '';
  let about = '';

  let lnurl = 'LUNRL';
  let lud16 = '';
  let content = {};
  let zapButtonClassName = 'block_hide';

  let event_ = {};
  /// // STEP 2 ///// If already present in redux store, replace with that
  // userDataCustom will replace userData from useProfile
  let userDataCustom = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    userDataCustom = JSON.parse(nostrProfiles[pubkey].content);
    name = userDataCustom.name;
    displayName = userDataCustom.display_name;
    website = userDataCustom.website;
    about = userDataCustom.about;
    if (userDataCustom.picture) {
      profilePicUrl = userDataCustom.picture;
    } else {
      profilePicUrl = BlankAvatar;
    }
    bannerPicUrl = userDataCustom?.banner;
    if (userDataCustom?.lud06) {
      lnurl = userDataCustom?.lud06;
      zapButtonClassName = 'zapButton';
    }
    if (userDataCustom?.lud16) {
      lud16 = userDataCustom?.lud16;
      zapButtonClassName = 'zapButton';
    }
  }

  // TODO: deprecate userData, useProfile.
  // Replace userData with userDataCustom (ought to be ready; just needs name and display_name, which it has)
  // 1. Go to CuratedListBox and replace userData={userData} with userData={userDataCustom}
  // Verify that CuratedListBox works as intendend.
  // 2. If it works as intended, then delete the alternate step 3 line (here).
  ///// alternate step 3
  const { data: userData } = useProfile({
    pubkey,
  });

  // if endorsement buttons are on, then endorsements listeners need to be on,
  // so it's necessary (or at least beneficial) to turn off all other listeners

  const toggleLnurl = async () => {
    let e = document.getElementById("lnurlContainer");
    if (e) {
      const currentState = e.style.display;
      if (currentState == 'inline-block') {
        e.style.display = 'none';
      }
      if (currentState == 'none') {
        e.style.display = 'inline-block';
      }
    }
  }
  return (
    <>
      <SelectListener pubkey={pubkey} />
      <div style={{position: 'relative', height:'560px'}}>
        <div className="mainUserProfileBox myProfileBox" style={{position: 'relative'}}>
          <div className="mainUserProfileLeftColumnContainer" style={{position:'relative', height:'550px'}}>
            <div id="largeAvatarContainer" className="largeAvatarContainer" style={{position: 'absolute', top: '175px', zIndex: 100}}>
              <div
                id="myProfileAvatarContainer"
                className="myProfileAvatarContainer"
              />
              <picture>
                <img
                  src={profilePicUrl}
                  onError={(event) => (event.target.src = noProfilePicUrl)}
                  className="myProfileAvatarImg"
                />
              </picture>
            </div>
            <div id="largeAvatarContainer" className="largeAvatarContainer" style={{height:'300px'}}>

            </div>
            <div style={{position:'absolute',top:'425px'}}>
              <FollowCounts pubkey={pubkey} />
            </div>

          </div>

          <div
            id="mainUserProfileRightColumnContainer"
            className="mainUserProfileRightColumnContainer"
            style={{top:'300px'}}
          >
            <div className="mainUserNameContainer" style={{padding: '5px'}}>
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
              <span onClick={()=>toggleLnurl()} className={zapButtonClassName} style={{ marginRight: '10px' }}>
                <div style={{ fontSize: '28px', display: 'inline-block' }}>⚡</div>
              </span>
              <span style={{ display: 'inline-block'}}>
                <NavLink
                  end
                  to="/NostrHome/NostrDirectMessageConvo"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ fontSize: '28px' }}>&#x1F4AC;</div>
                </NavLink>
              </span>
              <div style={{ display: followButtonDisplay, marginLeft: '10px' }}>
                <FollowButton pubkey={pubkey} />
              </div>
            </div>
            <div id='lnurlContainer' style={{display:'none',marginLeft:'10px',fontSize:'12px',padding:'2px',border:'1px solid grey',width:'70%'}}>
              {lud16}{'    '}{lnurl}
            </div>

            <div>
              <div className={grapevineProfileControlPanelClassName}>
                <div style={{marginLeft: '5px'}}>
                  <CuratedListBox
                    pubkey={pubkey}
                    userData={userData}
                  />
                  <CuratedChannelsBox
                    pubkey={pubkey}
                    userData={userData}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div style={{width:'100%', height: '300px', position: 'absolute',top:'0px',backgroundColor:'grey'}}>
          <img src={bannerPicUrl} style={{width: '100%', zIndex: 15}} alt="" />
        </div>
      </div>
      <TechDetailsForNostrNerds2 userDataCustom={userDataCustom} />
    </>
  );
};
export default MainProfile;

/*
// used to go below lnurl
<div style={{display:'none'}}><RelaysCurationBox pubkey={pubkey} /></div>
<div style={{display:'none'}}><UserGrapevinePanel /></div>
*/
