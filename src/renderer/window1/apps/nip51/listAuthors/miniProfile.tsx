import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { noProfilePicUrl } from 'renderer/window1/const';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FollowButton from 'renderer/window1/apps/nostr/components/followButton';

const NostrMiniProfile = ({ pubkey, searchStringForAuthors, searchStringForLists, whichFollowsSubset, aMyFollowing, oNip51 }) => {
  const dispatch = useDispatch();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';
  let about = '';

  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = `@${profileContent.name}`;
    displayName = profileContent.display_name;
    if (profileContent.picture) {
      avatarUrl = profileContent.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }

  /// // STEP 3 ///// Query network for updated profile information and if found, use that instead, and update redux
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0, // all new events from now
      kinds: [0],
    },
  });
  let event_ = {};
  const event = returnMostRecentEvent(events);
  if (event && doesEventValidate(event)) {
    dispatch(updateNostrProfiles(event));
    event_ = JSON.parse(JSON.stringify(event));
    const content = JSON.parse(event.content);
    event_.content = content;
    name = `@${content.name}`;
    displayName = content.display_name;
    about = content.about;
    avatarUrl = content.picture;
  }
  //////////////////////////////////////

  let displayByAuthorString="block";
  if (searchStringForAuthors) {
    const npub = nip19.npubEncode(pubkey);
    displayByAuthorString = "none";
    if (name && name.includes(searchStringForAuthors)) {
      displayByAuthorString = "block";
    }
    if (displayName && displayName.includes(searchStringForAuthors)) {
      displayByAuthorString = "block";
    }
    if (about && about.includes(searchStringForAuthors)) {
      displayByAuthorString = "block";
    }
    if (pubkey && pubkey.includes(searchStringForAuthors)) {
      displayByAuthorString = "block";
    }
    if (npub && npub.includes(searchStringForAuthors)) {
      displayByAuthorString = "block";
    }
  }

  let displayByListString="block";
  if (searchStringForLists) {
    displayByListString = "none";
    const aListIDs = oNip51.byAuthor[pubkey];
    for (let x=0; x<aListIDs.length; x++) {
      const listID = aListIDs[x];
      const event = oNip51.lists[listID]?.event;
      const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
      let title = "";
      if (aTags_d.length > 0) {
        title = aTags_d[0][1];
        console.log("qwerty title: "+title)
      }
      if (title && title.includes(searchStringForLists)) {
        displayByListString = "block";
      }
    }

  }

  let display="block";
  if (displayByAuthorString == "none") { display="none"; }
  if (displayByListString == "none") { display="none"; }

  let amIFollowing = false;
  if (aMyFollowing.includes(pubkey)) {
    amIFollowing = true;
  }

  if ( (whichFollowsSubset==1) && (!amIFollowing) ) {
    display = "none";
  }
  if ( (whichFollowsSubset==2) && (amIFollowing) ) {
    display = "none";
  }
  return (
    <>
      <div className="authorMiniProfileContainer" style={{display}}>
        <div className="singleUserContainer" style={{textAlign:"left"}}>
          <NavLink
            onClick={() => {
              dispatch(updateNostrProfileFocus(pubkey));
            }}
            to="/NostrHome/NostrViewProfile"
            className="goToUserProfileButton"
          >
            <div className="userListSmallAvatarContainer">
              <img src={avatarUrl} className="userListSmallAvatarBox" />
            </div>
            <div className="singleUserMainBodyContainer">
              <div className="eventNameAndTimeContainer">
                <div className="eventNameContainer">
                  <span style={{ color: 'black' }}>{displayName}</span>
                  <span style={{ color: 'grey', marginLeft: '10px' }}>
                    {name}
                  </span>
                </div>
                <div className="eventTimeContainer" style={{ color: 'grey' }}>
                  ... {pubkey.slice(-6)}
                </div>
              </div>
              <div className="eventContentContainer">{about}</div>
            </div>
          </NavLink>
          <div className="singleUserFollowButtonContainer">
            <FollowButton pubkey={pubkey} />
          </div>
        </div>
      </div>
    </>
  );
};
export default NostrMiniProfile;
