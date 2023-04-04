import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { noProfilePicUrl } from 'renderer/window1/const';

const NostrMiniProfile = ({ pubkey }) => {
  const dispatch = useDispatch();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';

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
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          border: '1px solid black',
          width: '500px',
          marginBottom: '5px',
          padding: '5px',
          marginLeft: '5px',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'inline-block' }}>
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
          </NavLink>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '5px' }}>
          <div>
            <span style={{ color: 'black' }}>{displayName}</span>
            <span style={{ color: 'grey', marginLeft: '10px' }}>{name}</span>
          </div>
          <div style={{fontSize: '10px' }}>
            {pubkey}
          </div>
        </div>
      </div>
    </>
  );
};
export default NostrMiniProfile;
