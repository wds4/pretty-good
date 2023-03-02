import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const DirectMessagesSent = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const { events } = useNostrEvents({
    filter: {
      authors: [myPubkey],
      since: 0, // all new events from now
      kinds: [4],
    },
  });
  return (
    <>
      <pre>numEvents sent: {events.length}</pre>
      {events.reverse().map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <pre>sent: {event.id}</pre>
            </>
          );
        }
      })}
    </>
  );
};

export default DirectMessagesSent;
