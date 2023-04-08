import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';

const FetchPostsInBackground = () => {
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const dispatch = useDispatch();

  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [1],
    },
  });
  events.map( async (event) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
    }
  });
  return (
    <>
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        FetchPostsInBackground, starting from the beginning of time; fetched events: {events.length}
      </div>
    </>
  );
};

export default FetchPostsInBackground;
