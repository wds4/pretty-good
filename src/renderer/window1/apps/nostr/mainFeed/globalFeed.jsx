import { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import Post from '../components/post';
import MainFeedTypeSelector from './mainFeedTypeSelector';
import { updateNostrEvents } from '../../../redux/features/nostrGlobalState/slice';

const GlobalFeed = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrGlobalState.mainNostrFeedFilter
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = myNostrProfile.following;
  let aExtendedFollowing = [];

  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);

  const filter = { kinds: [1] };
  switch (mainNostrFeedFilter) {
    case 'following':
      filter.authors = aFollowing;
      filter.since = currentTime - 2 * 24 * 60 * 60; // 2 * 24 * 60 * 60 = fetch messages as old as two days
      break;
    case 'eFollowing':
      filter.authors = aExtendedFollowing;
      filter.since = currentTime - 2 * 24 * 60 * 60; // 2 * 24 * 60 * 60 = fetch messages as old as two days
      break;
    case 'firehose':
      // all authors
      filter.since = currentTime - 30 * 60; // 60 * 60 = fetch messages as old as one hour
      break;
    case 'grapevine':
      // all authors
      filter.since = 0; // since forever ago
      filter["#g"]=["grapevine"]
      filter.kinds=[1971]
      break;
    default:
      filter.since = currentTime - 30 * 60; // 60 * 60 = fetch messages as old as one hour
      break;
  }

  const { events } = useNostrEvents({
    filter,
  });

  return (
    <>
      <pre className={devModeClassName}>filter: {JSON.stringify(filter,null,4)}</pre>
      <div style={{ position: 'relative', height: '40px' }}>
        <div className="mainFeedTypeSelector">
          <MainFeedTypeSelector
            following={aFollowing}
            extendedFollowing={aExtendedFollowing}
          />
        </div>
      </div>
      <pre className={devModeClassName}>aFollowing: {JSON.stringify(aFollowing,null,4)}</pre>
      <div>
        <div style={{ textAlign: 'right', marginRight: '20px' }}>
          {events.length} posts
        </div>
        {events.map((event, index) => {
          if (doesEventValidate(event)) {
            dispatch(updateNostrEvents(event));
            return (
              <>
                <Post event={event} index={index} />
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default GlobalFeed;
