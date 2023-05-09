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

const TechDetailsForNostrNerds = ({ events, event, event_, userData }) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const event_id = event.id;
  const elem_id = "technicalDetailsForNostrDevsContainer_"+event_id;
  const toggleViewDetails = () => {
    const e = document.getElementById(elem_id);
    const currentState = e.style.display;
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  };

  return (
    <>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>
            View technical details for nostr nerds
          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton"
          >
            toggle 🤓
          </button>
        </div>
        <div
          id={elem_id}
          style={{ display: 'none', fontSize: '12px', border: '1px dashed grey', padding: '3px' }}
        >
          <pre>
            <div>number events received: {events.length}</div>
            {JSON.stringify(event_, null, 4)}
          </pre>
        </div>
      </div>
    </>
  );
};

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
  let bannerPicUrl = "";
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
    bannerPicUrl = profileContent?.banner;
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

  const src = "https://void.cat/d/MreaerC65YkE8zeHvVv6XM.webp";
  const type = "image/webp";

  // <img src={profilePicUrl} className="myProfileAvatarImg" alt="" />
  return (
    <>
      <div style={{position: 'relative', height:'560px'}}>
        <div className="mainUserProfileBox myProfileBox" style={{position: 'relative'}}>
          <div className="mainUserProfileLeftColumnContainer" style={{position:'relative', height:'550px'}}>
            <div id="largeAvatarContainer" className="largeAvatarContainer" style={{position: 'absolute', top: '175px', zIndex: 100}}>
              <div
                id="myProfileAvatarContainer"
                className="myProfileAvatarContainer"
              />
              <picture>
                <source srcset={profilePicUrl} className="myProfileAvatarImg" type="image/webp" />
                <img src={noProfilePicUrl} className="myProfileAvatarImg" />
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
        <div style={{width:'100%', height: '300px', position: 'absolute',top:'0px',backgroundColor:'grey'}}>
          <img src={bannerPicUrl} style={{width: '100%', zIndex: 15}} alt="" />
        </div>
      </div>
      <TechDetailsForNostrNerds events={events} event={event} event_={event_} userData={userData} />
    </>
  );
};
export default MainProfile;
