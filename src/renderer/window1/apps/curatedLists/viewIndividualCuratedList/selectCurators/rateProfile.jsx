import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { noProfilePicUrl } from 'renderer/window1/const';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import CreateNewRating from './createNewRating';

const RateProfile = ({curatedListFocusID, oListData, curatedListProfileFocusID, oProfileFocusSqlData}) => {
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
  if (nostrProfiles.hasOwnProperty(curatedListProfileFocusID)) {
    profileContent = JSON.parse(nostrProfiles[curatedListProfileFocusID].content);
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
      <div style={{display:"inline-block",textAlign:"left",marginBottom:"20px",width:"40%"}}>
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(curatedListProfileFocusID));
          }}
          to="/NostrHome/NostrViewProfile"
          className="goToUserProfileButton"
        >
          <div className="userListSmallAvatarContainer">
            <img
              src={avatarUrl}
              onError={(event) => (event.target.src = noProfilePicUrl)}
              className="userListSmallAvatarBox"
            />
          </div>
        </NavLink>
        <div style={{display:"inline-block",marginLeft:"10px"}}>
          <div style={{ color: 'black' }}>{displayName}</div>
          <div style={{ color: 'grey' }}>
            {name}
          </div>
        </div>
      </div>
      <CreateNewRating
        curatedListFocusID={curatedListFocusID}
        oListSqlData={oListData}
        pubkeyFocusID={curatedListProfileFocusID}
        oProfileSqlData={oProfileFocusSqlData}
       />
    </>
  );
}

export default RateProfile;
