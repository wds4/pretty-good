import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from '../../../lib/nostr/eventValidation';
import { updateNostrEvents } from '../../../redux/features/nostr/settings/slice';
import { timeout } from 'renderer/window1/lib/pg';

const Thread = () => {
  const event_focus = useSelector(
    (state) => state.nostrGlobalState.nostrPostFocusEvent
  );
  const dispatch = useDispatch();
  const id_focus = event_focus.id

  const { events } = useNostrEvents({
    filter: {
      since: 0, // all new events from now
      kinds: [1],
      "#e": [id_focus],
    },
  });

  return (
    <>
      <Post event={event_focus} />
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        {events.length} posts
      </div>
      {events.map((event) => {
        if (doesEventValidate(event)) {
          dispatch(updateNostrEvents(event));
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
