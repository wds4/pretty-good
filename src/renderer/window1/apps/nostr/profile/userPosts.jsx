import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from '../../../lib/nostr/eventValidation';
import { updateNostrEvents } from '../../../redux/features/nostr/settings/slice';
import { timeout } from 'renderer/window1/lib/pg';

const UserPosts = () => {
  const pubkey = useSelector(
    (state) => state.nostrGlobalState.nostrProfileFocus
  );
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0, // all new events from now
      kinds: [1],
    },
  });
  return (
    <>
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

export default UserPosts;
