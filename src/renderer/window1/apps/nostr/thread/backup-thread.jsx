import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { addNoteToNostrActiveThread } from 'renderer/window1/redux/features/nostr/settings/slice';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const Thread2 = () => {
  const dispatch = useDispatch();
  const { aThreadNoteIDs, focus } = useSelector(
    (state) => state.nostrSettings.nostrActiveThread
  );
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [1],
      ids: aThreadNoteIDs,
    },
  });
  events.sort((a, b) => parseFloat(a.created_at) - parseFloat(b.created_at)); // oldest first
  return (
    <>
      <div style={{}}>
        <div>number of aThreadNoteIDs: {aThreadNoteIDs.length}</div>
        <div>number of events: {events.length}</div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            // add all referenced note event ids to aThreadNoteIDs
            const aaETags = event.tags.filter(
              ([k, v]) => k === 'e' && v && v !== ''
            );
            for (let x = 0; x < aaETags.length; x++) {
              const id = aaETags[x][1];
              // add this event id to aThreadNoteIDs
              if (!aThreadNoteIDs.includes(id)) {
                dispatch(addNoteToNostrActiveThread(id));
              }
            }

            let threadNoteClass = 'threadNoteNotFocus';
            if (event.id == focus) {
              threadNoteClass = 'threadNoteFocus';
            }
            return (
              <>
                <div className={threadNoteClass}>
                  <div>event.id: {event.id}</div>
                  <Post event={event} />
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

const Thread = () => {
  const event_focus = useSelector(
    (state) => state.nostrSettings.nostrPostFocusEvent
  );
  const dispatch = useDispatch();
  const id_focus = event_focus.id;
  const { aThreadNoteIDs, focus } = useSelector(
    (state) => state.nostrSettings.nostrActiveThread
  );

  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [1],
      // '#e': [id_focus],
      '#e': aThreadNoteIDs,
    },
  });
  events.sort((a, b) => parseFloat(a.created_at) - parseFloat(b.created_at)); // oldest first

  events.map(async (event) => {
    if (doesEventValidate(event)) {
      dispatch(addNote(event));
      const res = await addNostrNoteToSql(event);
      // add this event id to aThreadNoteIDs
      dispatch(addNoteToNostrActiveThread(event.id));
      // add all referenced note event ids to aThreadNoteIDs
      const aaETags = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
      const aETags = [];
      for (let x = 0; x < aaETags.length; x++) {
        const id = aaETags[x][1];
        // add this event id to aThreadNoteIDs
        dispatch(addNoteToNostrActiveThread(id));
        aETags.push(id);
      }
    }
  });

  return (
    <>
      <TechDetailsForNostrNerds id_focus={id_focus} />
      <Thread2 />

      {events.map((event) => {
        if (doesEventValidate(event)) {
          if (event.id != focus) {
            return (
              <>
                <Post event={event} />
              </>
            );
          }
          return <></>;
        }
      })}
    </>
  );
};

export default Thread;

/*
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
*/
