import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { NavLink } from 'react-router-dom';
import { noProfilePicUrl } from 'renderer/window1/const';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const MiniProfile = ({ pubkey, avatarUrl, name, displayName }) => {
  const dispatch = useDispatch();
  /*
  let noName = "";
  if ( (!name) && (!displayName) ) {
    noName = " ..." + pubkey.slice(-6)
  }
  */
  let nameField = "";
  if (displayName) {
    nameField = displayName;
  }
  if (!nameField) {
    if (name) {
      nameField = <span style={{color: 'grey'}}>{name}</span>;
    } else {
      nameField = <span style={{color: 'grey'}}>... {pubkey.slice(-6)}</span>;
    }
  }
  return (
    <>
      <div style={{display: 'inline-block'}}>
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(pubkey));
          }}
          to="/NostrHome/NostrViewProfile"
          className="goToUserProfileButton"
        >
          <div className="agTableSmallAvatarContainer">
            <img
              src={avatarUrl}
              onError={(event) => (event.target.src = noProfilePicUrl)}
              className="userListSmallAvatarBox"
            />
          </div>
        </NavLink>
      </div>
      <div style={{display: 'inline-block', marginLeft: '5px'}}>
        {nameField}
      </div>
    </>
  );
};

const FetchProfile = ({ pubkey }) => {
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [0],
    },
  });

  const name = '';
  const displayName = '';
  let avatarUrl = noProfilePicUrl;

  if (events.length > 0) {
    const event = events[0];
    if (event && doesEventValidate(event)) {
      dispatch(updateNostrProfiles(event));
      const content = JSON.parse(event.content);
      avatarUrl = content.picture;
    }
  }
  if (!avatarUrl) {
    avatarUrl = noProfilePicUrl;
  }
  return (
    <MiniProfile
      pubkey={pubkey}
      avatarUrl={avatarUrl}
      name={name}
      displayName={displayName}
    />
  );
};

const ProfileFromDatabase = ({ pubkey }) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  let name = '';
  let displayName = '';
  let avatarUrl = noProfilePicUrl;

  const profileContent = JSON.parse(nostrProfiles[pubkey].content);
  name = `@${profileContent.name}`;
  displayName = profileContent.display_name;
  if (profileContent.picture) {
    avatarUrl = profileContent.picture;
  }
  return (
    <MiniProfile
      pubkey={pubkey}
      avatarUrl={avatarUrl}
      name={name}
      displayName={displayName}
    />
  );
};

const MiniProfileCell = (props) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  const { pubkey } = props.value;

  if (nostrProfiles.hasOwnProperty(pubkey)) {
    return (
      <>
        <ProfileFromDatabase pubkey={pubkey} />
      </>
    );
  }
  return (
    <>
      <FetchProfile pubkey={pubkey} />
    </>
  );
};
export default MiniProfileCell;
