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

const MiniProfile = ({ pubkey }) => {
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
  /// ///////////////////////////////////
  */

  return (
    <>
      <div
        style={{
          textAlign: 'left',
          boxSizing: 'border-box',
          height: '50px',
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#EFEFEF',
        }}
      >
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
              alt=""
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
              backgroundColor: '#EFEFEF',
              display: 'inline-block',
              width: 'calc(86% - 70px)',
              borderRadius: '5px',
              marginLeft: '5px',
              padding: '2px',
              fontSize: '22px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                color: 'black',
                marginRight: '10px',
                marginTop: '8px',
                maxWidth: '80%',
                overflow: 'auto',
                paddingLeft: '3px',
              }}
            >
              <span style={{ color: 'black' }}>{displayName}</span>
              <span style={{ color: 'grey', marginLeft: '10px' }}>
                {name}
              </span>
            </div>
            <div
              style={{
                color: 'grey',
                display: 'inline-block',
                float: 'right',
                marginTop: '8px',
              }}
            >
              ... {pubkey.slice(-6)}
            </div>
          </div>
        </NavLink>
        <div
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
          }}
        >
          <FollowButton pubkey={pubkey} />
        </div>
      </div>
    </>
  );
};
export default MiniProfile;
