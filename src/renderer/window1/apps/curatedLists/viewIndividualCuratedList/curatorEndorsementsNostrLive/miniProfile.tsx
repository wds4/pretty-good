import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { noProfilePicUrl } from 'renderer/window1/const';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FollowButton from 'renderer/window1/apps/nostr/components/followButton';

const NostrMiniProfile = ({ pubkey }) => {
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

  /*
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
  */

  return (
    <>
      <div className="singleUserContainer" style={{textAlign:"left", width: '100%'}}>
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(pubkey));
          }}
          to="/NostrHome/NostrViewProfile"
          className="goToUserProfileButton"
          style={{width: '100%'}}
        >
          <div className="userListSmallAvatarContainer">
            <img src={avatarUrl} className="userListSmallAvatarBox" />
          </div>
          <div className="singleUserMainBodyContainer" style={{padding: '4px', width: 'calc(100% - 150px)'}}>
            <div className="eventNameAndTimeContainer">
              <div className="eventNameContainer">
                <span style={{ color: 'black' }}>{displayName}</span>
              </div>
              <div className="eventTimeContainer" style={{ color: 'grey' }}>
                ... {pubkey.slice(-6)}
              </div>
            </div>
            <div className="eventNameContainer" style={{color: 'grey'}}>{name}</div>
          </div>
        </NavLink>
        <div className="singleUserFollowButtonContainer">
          <FollowButton pubkey={pubkey} />
        </div>
      </div>
    </>
  );
};
export default NostrMiniProfile;
