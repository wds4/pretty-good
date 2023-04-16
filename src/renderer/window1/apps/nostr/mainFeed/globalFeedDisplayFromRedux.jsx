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
import Posts from './posts';
import GlobalFeedFetchPostsInBackground from './globalFeedFetchPostsInBackground';

const GlobalFeedDisplayFromRedux = ({ filter, mainNostrFeedFilter }) => {
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
        <div
          style={{ textAlign: 'right', marginRight: '20px', display: 'none' }}
        >
          currently showing: {aEvents.length} posts
        </div>
        <Posts aEvents={aEvents} />
      </div>
    </>
  );
};

export default GlobalFeedDisplayFromRedux;
