import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import Message from './message';

const DirectMessages = () => {
  const pubkey = useSelector(
    (state) => state.nostrGlobalState.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivKey = myNostrProfile.privkey;
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey, myPubkey],
      since: 0, // all new events from now
      kinds: [4],
    },
  });
  return (
    <>
      {events.reverse().map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <Message event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default DirectMessages;
