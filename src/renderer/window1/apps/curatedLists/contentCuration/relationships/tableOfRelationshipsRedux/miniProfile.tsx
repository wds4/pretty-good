import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
// import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { noProfilePicUrl } from 'renderer/window1/const';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FollowButton from 'renderer/window1/apps/nostr/components/followButton';

export const returnMostRecentEventWithCorrectPubkey = (aEvents,pubkey) => {
  // first, eliminate any event without the indicated pubkey
  const events = [];
  for (let x=0;x<aEvents.length;x++) {
    const event = aEvents[x];
    const pk = event.pubkey;
    if (pk == pubkey) {
      events.push(event);
    }
  }
  try {
    // this gets the oldest:
    // events.sort((b,a) => parseFloat(b.created_at) - parseFloat(a.created_at)); // 1674498966
    // to get the newest:
    events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)); // 1674867581
    if (doesEventValidate(events[0])) {
      return events[0];
    }
    return false;
  } catch (err) {
    return false;
  }
};

export default class NostrMiniProfileWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <NostrMiniProfile pubkey={this.props.pubkey} />
      </>
    );
  }
}

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
  const event = returnMostRecentEventWithCorrectPubkey(events,pubkey);
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
      <div style={{display: 'inline-block'}}>
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
        <div style={{marginLeft: '10px', display:'inline-block'}}>
          <div>
            <span style={{color: 'grey', fontSize: '18px'}}>{name}</span>
          </div>
          <div><FollowButton pubkey={pubkey} /></div>
        </div>
      </div>
    </>
  );
};
