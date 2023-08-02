import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';

export default function FollowingList() {
  const [searchString, setSearchString] = useState("");
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const { name } = myNostrProfile;
  let avatarUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    avatarUrl = myNostrProfile.picture_url;
  } else {
    avatarUrl = BlankAvatar;
  }
  const handleChange = (event) => {
    setSearchString(event.target.value);
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
      <div style={{textAlign: 'left',marginBottom: '5px'}}>
        <div style={{color: 'grey'}}>Search by name, display_name, about, or pubkey (hex or bech32)</div>
        <textarea
          style={{width: '99%'}}
          onChange={handleChange}
        ></textarea>
      </div>
      {[... aFollowing].reverse().map((pk) => {
        return (
          <>
            <MiniProfile
              searchString={searchString}
              pubkey={pk}
            />
          </>
        );
      })}
    </>
  );
}
