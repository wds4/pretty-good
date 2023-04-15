import { useNostrEvents } from 'nostr-react';
import { useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';

const GlobalFeedFetchPostsInBackground = ({ filter, mainNostrFeedFilter }) => {
  const dispatch = useDispatch();

  const { events } = useNostrEvents({
    filter,
  });

  if (mainNostrFeedFilter == 'following') {
    events.map(async (event, index) => {
      if (doesEventValidate(event)) {
        dispatch(addNote(event));
        const res = await addNostrNoteToSql(event);
      }
    });
  }

  return (
    <>
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        currently downloadingg (w/in past 2 days): {events.length} posts;
      </div>
    </>
  );
};

export default GlobalFeedFetchPostsInBackground;
