import { useRef } from 'react';
import { dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import Posts from './posts';

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
