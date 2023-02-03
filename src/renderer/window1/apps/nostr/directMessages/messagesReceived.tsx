import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const DirectMessagesReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const { events } = useNostrEvents({
    filter: {
      tags: [["p", myPubkey]],
      since: 0, // all new events from now
      kind: 4,
    },
  });
  return (
    <>
      <pre>numEvents received: - {events.length}</pre>
      {events.reverse().map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <pre>received: - {event.id}</pre>
            </>
          );
        }
      })}
    </>
  );
};

export default DirectMessagesReceived;
