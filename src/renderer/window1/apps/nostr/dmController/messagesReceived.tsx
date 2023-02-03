import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const DirectMessagesReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const { events } = useNostrEvents({
    filter: {
      authors: [],
      tags: [["p",myPubkey]],
      since: 0, // all new events from now
      kinds: [4],
    },
  });
  return (
    <>
      <div>numMessages received: {events.length}</div>
    </>
  );
};

export default DirectMessagesReceived;
