import { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNostrEvents } from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { setTwoBackSteps, setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import Post from 'renderer/window1/apps/nostr/components/post';
import MainFeedTypeSelector from './mainFeedTypeSelector';
import WelcomeBox from './welcomeBox';

const GlobalFeedFetchPostsInBackground = () => {

}

const GlobalFeedDisplayFromRedux = () => {

}

const GlobalFeed = () => {
  const dispatch = useDispatch();
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }

  dispatch(setTwoBackSteps());
  dispatch(setCurrentPage("mainFeed"));
  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const aExtendedFollowing = [];

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

  let oNotesAllAuthors = {};
  const oNostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);
  const aNostrNoteAuthors = Object.keys(oNostrNotesByAuthor)
  for (let a=0;a<aNostrNoteAuthors.length;a++) {
    const pk = aNostrNoteAuthors[a];
    if (filter.authors.includes(pk)) {
      const oNotesThisAuthor = oNostrNotesByAuthor[pk];
      oNotesAllAuthors = Object.assign(oNotesAllAuthors,oNotesThisAuthor);
    }
  }
  const aNotesAllAuthors = Object.keys(oNotesAllAuthors);
  const aEvents = [];
  for (let x = 0; x < aNotesAllAuthors.length; x++) {
    const nextId = aNotesAllAuthors[x];
    aEvents.push(oNotesAllAuthors[nextId].event);
  }
  aEvents.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // first create the list of events by the desired authors
  // then place the events in reverse chronological order

  const { events } = useNostrEvents({
    filter,
  });

  events.map( async (event, index) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
    }
  })

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
      <WelcomeBox />
      <pre className={devModeClassName}>
        aFollowing: {JSON.stringify(aFollowing, null, 4)}
      </pre>
      <div>
        <div style={{ textAlign: 'right', marginRight: '20px' }}>
          currently showing: {aEvents.length} posts; currently downloading: {events.length} posts;
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

export default GlobalFeed;
