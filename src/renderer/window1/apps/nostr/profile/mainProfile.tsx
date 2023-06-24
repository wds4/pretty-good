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
// import FollowRelaysButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/followRelaysButton';
// import EndorseAsRelaysPickerButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerButton';
// import EndorseAsRelaysPickerHunterButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerHunterButton';
import FollowCounts from 'renderer/window1/apps/nostr/components/followCounts';
import UserGrapevinePanel from 'renderer/window1/apps/nostr/profile/userGrapevinePanel';
import RelaysCurationBox from './relaysGrapevine';
import CuratedListBox from './curatedListBox';
import CuratedChannelsBox from './curatedChannelsBox';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';
import {
  addCuratedListEventToSql,
  addInstanceEventToSql,
  addRatingOfCuratedListInstanceEventToSql,
  addEndorsementOfListCuratorEventToSql,
} from 'renderer/window1/lib/pg/sql';
import {
  addCuratedList,
  addCuratedListInstance,
  addRatingOfCuratedListInstance,
  addCuratorEndorsement,
  addThreadedTapestryEvent,
} from 'renderer/window1/redux/features/curatedLists/lists/slice';

const EndorsementListener = ({pubkey}) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  // set up filter
  const kind1 = 39901; // grapevine
  const filter = {
    since: 0,
    kinds: [kind1],
    authors: [myPubkey],
  };
  const { events } = useNostrEvents({
    filter,
  });

  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      const kind = event.kind;
      let c0 = event.tags.filter(([k, v]) => k === 'c' && v && v !== '')[0];
      let d0 = event.tags.filter(([k, v]) => k === 'd' && v && v !== '')[0];
      let e0 = event.tags.filter(([k, v]) => k === 'e' && v && v !== '')[0];
      let g0 = event.tags.filter(([k, v]) => k === 'g' && v && v !== '')[0];
      let l0 = event.tags.filter(([k, v]) => k === 'l' && v && v !== '')[0];
      let m0 = event.tags.filter(([k, v]) => k === 'm' && v && v !== '')[0];
      let p0 = event.tags.filter(([k, v]) => k === 'p' && v && v !== '')[0];
      let r0 = event.tags.filter(([k, v]) => k === 'r' && v && v !== '')[0];
      let s0 = event.tags.filter(([k, v]) => k === 's' && v && v !== '')[0];
      let t0 = event.tags.filter(([k, v]) => k === 't' && v && v !== '')[0];

      if (c0 && (typeof c0 == "object") && (c0.length > 1)) { c0 = c0[1]; }
      if (d0 && (typeof d0 == "object") && (d0.length > 1)) { d0 = d0[1]; }
      if (e0 && (typeof e0 == "object") && (e0.length > 1)) { e0 = e0[1]; }
      if (g0 && (typeof g0 == "object") && (g0.length > 1)) { g0 = g0[1]; }
      if (l0 && (typeof l0 == "object") && (l0.length > 1)) { l0 = l0[1]; }
      if (m0 && (typeof m0 == "object") && (m0.length > 1)) { m0 = m0[1]; }
      if (p0 && (typeof p0 == "object") && (p0.length > 1)) { p0 = p0[1]; }
      if (r0 && (typeof r0 == "object") && (r0.length > 1)) { r0 = r0[1]; }
      if (s0 && (typeof s0 == "object") && (s0.length > 1)) { s0 = s0[1]; }
      if (t0 && (typeof t0 == "object") && (t0.length > 1)) { t0 = t0[1]; }

      if ( (kind == 39901) && (g0 == "grapevine-testnet-901") ) {
        // console.log("qwerty grapevine testnet")
        // endorsements of items
        dispatch(addRatingOfCuratedListInstance(event));
        // endorsements of users
        dispatch(addCuratorEndorsement(event));

        if (l0) {
          // console.log("qwerty endorsement of item")
          const parentConceptNostrEventID = l0;
          const oWord = JSON.parse(event.content);
          if (oWord) {
            if (oWord.hasOwnProperty("ratingData")) {
              if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
                // endorsements of items
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListInstanceRatingFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
                // endorsements of users
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListsCuratorEndorsementFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addEndorsementOfListCuratorEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  return (
    <>
      <div style={{display:'none'}}>listen for endorsement updates; number of events:</div>
    </>
  )
}

const ThisUserProfileListener = ({pubkey}) => {
  const dispatch = useDispatch();
  ///// STEP 3 ///// Query network for updated profile information and if found, use that instead, and update redux
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [0],
    },
  });

  const event = returnMostRecentEvent(events);
  if (event && doesEventValidate(event)) {
    dispatch(updateNostrProfiles(event));
    /*
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
    */
  }
  return (
    <>
      <div style={{display:'none'}}>listen for profile updates (follows) (might be redundant bc of userData?)</div>
    </>
  )
}

// This selects whether to listen to the nostr network for updates:
// 1. to the user profile being viewed (ThisUserProfileListener), versus:
// 2. updates to endorsements by me (EndorsementListener)
// (Too many listeners seem to interfere with each other  ... )
const SelectListener = ({pubkey}) => {
  const isNostrGrapevineOn = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  if (!isNostrGrapevineOn) {
    return (
      <>
        <ThisUserProfileListener pubkey={pubkey} />
      </>
    )
  }
  return (
    <>
      <EndorsementListener pubkey={pubkey} />
    </>
  )
}

const MainProfile = ({pubkey}) => {
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

  let lnurl = 'LUNRL';
  let content = {};
  let zapButtonClassName = 'block_hide';

  // if endorsement buttons are on, then endorsements listeners need to be on,
  // so it's necessary (or at least beneficial) to turn off all other listeners
  let eventsX = [];
  let eventX = {};
  let event_X = {};

  // if (!isNostrGrapevineOn) {

  // }
  const toggleLnurl = () => {
    let e = document.getElementById("lud06Container");
    e.style.display = 'inline-block';
  }
  /*
  // userData2 is created to replace userData which
  const userData2 = {
    name: name,
    display_name: displayName,
  }
  */
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
              <div style={{ display: followButtonDisplay, marginLeft: '10px' }}>
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
                  <CuratedChannelsBox
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
      <TechDetailsForNostrNerds events={eventsX} event={eventX} event_={event_X} />
    </>
  );
};
export default MainProfile;
