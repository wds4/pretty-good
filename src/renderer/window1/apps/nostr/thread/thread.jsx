import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';

const Thread = () => {
  const event_focus = useSelector(
    (state) => state.nostrSettings.nostrPostFocusEvent
  );
  const dispatch = useDispatch();
  const id_focus = event_focus.id

  const nostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);

  const { events } = useNostrEvents({
    filter: {
      since: 0, // all new events from now
      kinds: [1],
      "#e": [id_focus],
    },
  });

  events.map( async (event) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
    }
  })

  return (
    <>
      <div>{JSON.stringify(event_focus,null,4)}</div>
      <Post event={event_focus} />
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        {events.length} posts
      </div>
      {events.map((event) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <Post event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default Thread;
