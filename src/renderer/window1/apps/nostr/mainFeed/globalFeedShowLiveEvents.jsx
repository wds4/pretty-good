import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import Post from 'renderer/window1/apps/nostr/components/post/post';

const GlobalFeedShowLiveEvents = ({ filter }) => {
  // if extendedFollowing or firehose, show notes as they arrive
  const { events } = useNostrEvents({
    filter,
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      {events.map((event, index) => {
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

export default GlobalFeedShowLiveEvents;
