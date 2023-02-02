import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MiniProfile from 'renderer/window1/apps/nostr/components/miniProfile';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';

export default function FollowingList() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const { name } = myNostrProfile;
  let avatarUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    avatarUrl = myNostrProfile.picture_url;
  } else {
    avatarUrl = BlankAvatar;
  }
  return (
    <>
      <NavLink
        to="/NostrHome/NostrViewMyProfile"
        className="goToUserProfileButton"
      >
        <div className="h4" style={{ marginBottom: '10px', fontSize: '28px' }}>
          <div className="userListSmallAvatarContainer">
            <img alt="" src={avatarUrl} className="userListSmallAvatarBox" />
          </div>
          <span
            style={{ color: 'grey', marginLeft: '10px', marginRight: '5px' }}
          >
            @{name}
          </span>{' '}
          following
        </div>
      </NavLink>
      {aFollowing.map((pk) => {
        return (
          <>
            <MiniProfile pubkey={pk} />
          </>
        );
      })}
    </>
  );
}
