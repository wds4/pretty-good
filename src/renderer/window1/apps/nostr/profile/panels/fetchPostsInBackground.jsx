import { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';

const FetchPostsInBackground = ({since}) => {
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const dispatch = useDispatch();

  const nostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);
  let oNostrNotesThisAuthor = nostrNotesByAuthor[pubkey];
  if (!oNostrNotesThisAuthor) { oNostrNotesThisAuthor = {} }
  let aNostrNoteIDsThisAuthor = Object.keys(oNostrNotesThisAuthor);
  if (!aNostrNoteIDsThisAuthor) { aNostrNoteIDsThisAuthor = [] }

  const filter = {
    authors: [pubkey],
    since: 0,
    kinds: [1],
  };

  filter.since = since;

  const { events } = useNostrEvents({
    filter: filter,
  });
  events.map( async (event) => {
    if (doesEventValidate(event)) {
      if (!aNostrNoteIDsThisAuthor.includes(event.id)) {
        dispatch(addNote(event));
        const res = await addNostrNoteToSql(event);
      }
    }
  });
  return (
    <>
      <div style={{ display: 'none', textAlign: 'right', marginRight: '20px' }}>
        FetchPostsInBackground, fetched events: {events.length}
      </div>
    </>
  );
};

export default FetchPostsInBackground;
