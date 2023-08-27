import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { noProfilePicUrl } from 'renderer/window1/const';

const MiniProfile = ({ pubkey }) => {
  const dispatch = useDispatch();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';
  const about = '';

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
          textAlign: 'left',
          boxSizing: 'border-box',
          height: '50px',
          borderRadius: '5px',
          display: 'inline-block',
          marginTop: '10px',
          width: '100%',
        }}
      >
        <span style={{fontSize: '18px', color: 'grey'}}>curated by: </span>
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(pubkey));
          }}
          to="/NostrHome/NostrViewProfile"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
          >
            <img
              src={avatarUrl}
              onError={(event) => (event.target.src = noProfilePicUrl)}
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '250px',
                width: '75%',
                height: '75%',
                margin: '0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <div
            style={{
              height: '100%',
              display: 'inline-block',
              borderRadius: '5px',
              marginLeft: '5px',
              padding: '2px',
              fontSize: '18px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                color: 'black',
                marginRight: '10px',
                marginTop: '8px',

                overflow: 'auto',
                paddingLeft: '3px',
              }}
            >
              <span style={{ color: 'black' }}>{displayName}</span>
              <span style={{ color: 'grey', marginLeft: '10px' }}>{name}</span>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};
export default MiniProfile;
