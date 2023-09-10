import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { noProfilePicUrl } from 'renderer/window1/const';
import {
  updateNostrProfileFocus,
  updateNostrPostFocusEvent,
  updateNostrActiveThreadFocus,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { secsToTime } from 'renderer/window1/lib/pg';
import YoutubeEmbed, { extractVideoID, extractVideoUrl } from 'renderer/window1/apps/nostr/components/post/youTubeEmbed';
import ImageEmbed, { extractImageUrl } from 'renderer/window1/apps/nostr/components/post/imageEmbed';
import MiniProfile from './miniProfile';

const ReplyingTo = ({ event }) => {
  if (event && event.tags) {
    const aaETags = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
    const aETags = [];
    let replyID = '';
    for (let x = 0; x < aaETags.length; x++) {
      aETags.push(aaETags[x][1]);
      if (aaETags[x].length > 3) {
        const marker = aaETags[x][3];
        if (marker == 'reply') {
          replyID = aaETags[x][1];
        }
        if (marker == 'root') {
        }
        if (marker == 'mention') {
        }
      }
    }
    if (aETags.length > 0) {
      if (!replyID) {
        replyID = aETags[0];
      }
      return (
        <>
          <div className="eventReplyingToContainer">
            <span style={{ color: 'grey' }}>replying to: </span>
            <span>{replyID}</span>
          </div>
        </>
      );
    }
  }
  return <></>;
};

const Post = ({ event }) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const dispatch = useDispatch();

  const displayTime = secsToTime(event.created_at);
  const rawContent = event.content;

  // EXTRACT VIDEO
  const extractedVideoUrl = extractVideoUrl(rawContent);
  let contentMinusVideoUrl = rawContent;
  let embedId2 = null;
  if (extractedVideoUrl) {
    embedId2 = extractVideoID(extractedVideoUrl);
    contentMinusVideoUrl = rawContent.replace(extractedVideoUrl, '');
  }

  // EXTRACT IMAGE
  const extractedImageUrl = extractImageUrl(contentMinusVideoUrl);
  let contentMinusVideoAndImageUrls = contentMinusVideoUrl;
  if (extractedImageUrl) {
    contentMinusVideoAndImageUrls = contentMinusVideoUrl.replace(
      extractedImageUrl,
      ''
    );
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
      // avatarUrl = BlankAvatar;
      avatarUrl = noProfilePicUrl;
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
      <div
        style={{
          textAlign: 'left',
          boxSizing: 'border-box',
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#EFEFEF',
        }}
      >
        <div>
          <NavLink
            onClick={() => {
              dispatch(updateNostrProfileFocus(event.pubkey));
            }}
            to={{
              pathname: '/NostrHome/NostrViewProfile',
              state: { pubkey: event.pubkey },
            }}
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
                backgroundColor: '#EFEFEF',
                display: 'inline-block',
                width: 'calc(86% - 70px)',
                borderRadius: '5px',
                marginLeft: '5px',
                padding: '2px',
                fontSize: '16px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  color: 'black',
                  marginRight: '10px',
                  marginTop: '2px',
                  maxWidth: '80%',
                  overflow: 'auto',
                  paddingLeft: '3px',
                }}
              >
                <span style={{ color: 'black' }}>{displayName}</span>
                <span style={{ color: 'grey', marginLeft: '10px' }}>
                  {name}
                </span>
                <div style={{fontSize: '12px', marginTop: '2px'}} >{displayTime} ago</div>
              </div>

            </div>
          </NavLink>
        </div>
        <div style={{backgroundColor: 'white'}}>
          <ReplyingTo event={event} />
          <NavLink
            onClick={() => {
              dispatch(updateNostrPostFocusEvent(event));
              dispatch(updateNostrActiveThreadFocus(event));
            }}
            to={{
              pathname: '/NostrHome/NostrThread',
              state: { event },
            }}
            className="eventContentContainer"
          >
            {contentMinusVideoAndImageUrls}
            <YoutubeEmbed
              embedId={embedId2}
              extractedVideoUrl={extractedVideoUrl}
            />
            <ImageEmbed extractImageUrl={extractedImageUrl} />
          </NavLink>
        </div>
      </div>
    </>
  )


};
export default Post;


/*
return (
    <>
      <div
        style={{
          textAlign: 'left',
          boxSizing: 'border-box',
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#EFEFEF',
        }}
      >
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
          <ReplyingTo event={event} />

          <NavLink
            onClick={() => {
              dispatch(updateNostrPostFocusEvent(event));
              dispatch(updateNostrActiveThreadFocus(event));
            }}
            to={{
              pathname: '/NostrHome/NostrThread',
              state: { event },
            }}
            className="eventContentContainer"
          >
            {contentMinusVideoAndImageUrls}
            <YoutubeEmbed
              embedId={embedId2}
              extractedVideoUrl={extractedVideoUrl}
            />
            <ImageEmbed extractImageUrl={extractedImageUrl} />
          </NavLink>
        </div>
      </div>
    </>
  );
*/
