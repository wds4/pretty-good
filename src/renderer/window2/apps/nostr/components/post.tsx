import { NavLink } from 'react-router-dom';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { noProfilePicUrl } from 'renderer/window1/const';
import {
  updateNostrProfileFocus,
  updateNostrPostFocusEvent,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { secsToTime } from 'renderer/window1/lib/pg';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import YoutubeEmbed, { extractVideoID, extractVideoUrl } from './youTubeEmbed';
import ActionButtons from './actionButtons';

const Post = ({ event, index }) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const dispatch = useDispatch();

  let devModeData = '';
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
    devModeData = JSON.stringify(event, null, 4);
  }

  const displayTime = secsToTime(event.created_at);
  const rawContent = event.content;
  const extractedUrl = extractVideoUrl(rawContent);
  let contentMinusVideoUrl = rawContent;
  let embedId2 = null;
  if (extractedUrl) {
    embedId2 = extractVideoID(extractedUrl);
    contentMinusVideoUrl = rawContent.replace(extractedUrl, '');
  }

  // plan to make steps 1, 2, and maybe 3 into single function; 1 and 2 are sync, 3 would have to be async
  /// // STEP 1 ///// Load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = `...${event.pubkey.slice(-6)}`;
  let displayName = '';
  let nameClass = 'nameUnknown';

  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(event.pubkey)) {
    profileContent = JSON.parse(nostrProfiles[event.pubkey].content);
    name = `@${profileContent.name}`;
    displayName = profileContent.display_name;
    nameClass = 'nameKnown';
    if (profileContent.picture) {
      avatarUrl = profileContent.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }

  /*
  // Ought to create a stack of profiles and fetch them one or only a few at a time;
  // store info in redux store and in sql
  /// // STEP 3 ///// Query network for updated profile information and if found, use that instead, and update redux
  // currently this causes an error if too many called -- need to find a solution
  const { events } = useNostrEvents({
    filter: {
      authors: [event.pubkey],
      since: 0, // all new events from now
      kinds: [0],
    },
  });
  let event_ = {};
  const event2 = returnMostRecentEvent(events);
  if (event2 && doesEventValidate(event2)) {
    dispatch(updateNostrProfiles(event2));
    event_ = JSON.parse(JSON.stringify(event2));
    const content = JSON.parse(event2.content);
    event_.content = content;
    name = content.name;
    displayName = content.display_name;
    if (content.picture) {
      avatarUrl = content.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }
  */

  return (
    <>
      <div className="eventContainer">
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(event.pubkey));
          }}
          to={{
            pathname: '/NostrHome/NostrViewProfile',
            state: { pubkey: event.pubkey },
          }}
        >
          <div className="smallAvatarContainer">
            <img src={avatarUrl} className="smallAvatarBox_show" />
          </div>
        </NavLink>
        <div className="eventMainBodyContainer">
          <div className="eventNameAndTimeContainer">
            <div className="eventNameContainer">
              <span className={nameClass} style={{ marginRight: '10px' }}>
                {displayName}
                <span style={{ color: 'grey', marginLeft: '10px' }}>
                  {name}
                </span>
              </span>
            </div>
            <div className="eventTimeContainer">{displayTime}</div>
          </div>
          <NavLink
            onClick={() => {
              dispatch(updateNostrPostFocusEvent(event));
            }}
            to={{
              pathname: '/NostrHome/NostrThread',
              state: { event },
            }}
            className="eventContentContainer"
          >
            <pre>{devModeData}</pre>
            {contentMinusVideoUrl}
            <YoutubeEmbed embedId={embedId2} extractedUrl={extractedUrl} />
          </NavLink>
          <div className="eventActionButtonsContainer">
            <ActionButtons event={event} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
