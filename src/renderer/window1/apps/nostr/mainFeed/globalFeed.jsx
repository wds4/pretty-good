import { useRef } from 'react';
import { dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrActiveThreadFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import GlobalFeedFetchPostsInBackground from './globalFeedFetchPostsInBackground';
import GlobalFeedDisplayFromRedux from './globalFeedDisplayFromRedux';
import GlobalFeedShowLiveEvents from './globalFeedShowLiveEvents';

const GlobalFeed = ({ aFollowing, aExtendedFollowing }) => {
  const dispatch = useDispatch();
  dispatch(updateNostrActiveThreadFocus(""));

  const { focus } = useSelector(
    (state) => state.nostrSettings.nostrActiveThread
  );

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );
  const nostrMainFeedFilterSettings = useSelector(
    (state) => state.nostrSettings.nostrMainFeedFilterSettings
  );
  const viewEventsLoadStoredData = useSelector(
    (state) => state.nostrSettings.viewEventsLoadStoredData
  );
  // viewEventsLoadStoredData true: load from redux; false: load live from nostr

  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  const filter = {
    kinds: [1],
  };
  if (nostrMainFeedFilterSettings.hasOwnProperty(mainNostrFeedFilter)) {
    const { days, hours, minutes } = nostrMainFeedFilterSettings[mainNostrFeedFilter];
    filter.since = currentTime - ( (24 * 60 * 60 * days) + (60 * 60 * hours) +(60 * minutes) )
  }
  switch (mainNostrFeedFilter) {
    case 'following':
      filter.authors = aFollowing;
      // filter.since = currentTime - 6 * 60 * 60; // 12 * 60 * 60 = fetch messages as old as two days
      break;
    case 'eFollowing':
      filter.authors = aExtendedFollowing;
      // filter.since = currentTime - 2 * 24 * 60 * 60; // 2 * 24 * 60 * 60 = fetch messages as old as two days
      break;
    case 'firehose':
      // all authors
      // filter.since = currentTime - 30 * 60; // 60 * 60 = fetch messages as old as one hour
      break;
    case 'grapevine':
      // all authors
      filter.since = 0; // since forever ago
      filter['#g'] = ['grapevine'];
      filter.kinds = [1971];
      break;
    default: // 60 * 60 = fetch messages as old as one hour
      filter.since = currentTime - 30 * 60;
      break;
  }
  //
  if (viewEventsLoadStoredData) {
    // show notes from redux
    return (
      <>
        <GlobalFeedFetchPostsInBackground
          mainNostrFeedFilter={mainNostrFeedFilter}
          filter={filter}
        />
        <GlobalFeedDisplayFromRedux
          mainNostrFeedFilter={mainNostrFeedFilter}
          filter={filter}
        />
      </>
    );
  }
  // if extendedFollowing or firehose, show notes as they arrive
  if (!viewEventsLoadStoredData) {
    return <GlobalFeedShowLiveEvents filter={filter} />;
  }
};

export default GlobalFeed;
