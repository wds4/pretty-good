import { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNostrEvents } from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import {
  setTwoBackSteps,
  setCurrentPage,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import Post from 'renderer/window1/apps/nostr/components/post';
import MainFeedTypeSelector from './mainFeedTypeSelector';
import WelcomeBox from './welcomeBox';

const GlobalFeedFetchRecentPostsInBackground = ({ filter }) => {
  const dispatch = useDispatch();
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  let filter2 = JSON.parse(JSON.stringify(filter))
  filter2.since = currentTime - 30 * 60; // 60 * 60 = fetch messages as old as one hour

  const { events } = useNostrEvents({
    filter: filter2,
  });

  events.map(async (event, index) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
    }
  });
  return (
    <>
      <div style={{ textAlign: 'right', marginRight: '20px', display: 'none' }}>
        currently downloading (w/in past hour): {events.length} posts;
      </div>
    </>
  );
};

const GlobalFeedFetchPostsInBackground = ({ filter }) => {
  const dispatch = useDispatch();

  const { events } = useNostrEvents({
    filter,
  });

  events.map(async (event, index) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
    }
  });
  return (
    <>
      <div style={{ textAlign: 'right', marginRight: '20px', display: 'none' }}>
        currently downloading (w/in past 2 days): {events.length} posts;
      </div>
    </>
  );
};

const GlobalFeedDisplayFromRedux = ({ filter }) => {
  let oNotesAllAuthors = {};
  const oNostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);
  const aNostrNoteAuthors = Object.keys(oNostrNotesByAuthor);
  for (let a = 0; a < aNostrNoteAuthors.length; a++) {
    const pk = aNostrNoteAuthors[a];
    if (filter.authors.includes(pk)) {
      const oNotesThisAuthor = oNostrNotesByAuthor[pk];
      oNotesAllAuthors = Object.assign(oNotesAllAuthors, oNotesThisAuthor);
    }
  }
  const aNotesAllAuthors = Object.keys(oNotesAllAuthors);
  const aEvents = [];
  for (let x = 0; x < aNotesAllAuthors.length; x++) {
    const nextId = aNotesAllAuthors[x];
    aEvents.push(oNotesAllAuthors[nextId].event);
  }
  // aEvents.filter(a => parseFloat(a.created_at) > filter.since).sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  aEvents.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  return (
    <>
      <div>
        <div style={{ textAlign: 'right', marginRight: '20px', display: 'none' }}>
          currently showing: {aEvents.length} posts
        </div>
        {aEvents.map((event) => {
          if (doesEventValidate(event)) {
            return (
              <>
                <Post event={event} />
              </>
            );
          }
        })}
      </div>
    </>
  );
};

const GlobalFeed = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  dispatch(setTwoBackSteps());
  dispatch(setCurrentPage('mainFeed'));

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const aExtendedFollowing = myNostrProfile.extendedFollowing;

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );

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
      filter['#g'] = ['grapevine'];
      filter.kinds = [1971];
      break;
    default: // 60 * 60 = fetch messages as old as one hour
      filter.since = currentTime - 30 * 60;
      break;
  }
  // <GlobalFeedFetchRecentPostsInBackground filter={filter} />
  return (
    <>
      <pre className={devModeClassName}>
        filter: {JSON.stringify(filter, null, 4)}
      </pre>
      <div style={{ position: 'relative', height: '40px' }}>
        <div className="mainFeedTypeSelector">
          <MainFeedTypeSelector
            following={aFollowing}
            extendedFollowing={aExtendedFollowing}
          />
        </div>
      </div>
      aExtendedFollowing: {aExtendedFollowing.length}
      <WelcomeBox />
      <pre className={devModeClassName}>
        aFollowing: {JSON.stringify(aFollowing, null, 4)}
      </pre>
      <GlobalFeedFetchPostsInBackground filter={filter} />

      <GlobalFeedDisplayFromRedux filter={filter} />
    </>
  );
};

export default GlobalFeed;
