import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { secsToTime } from 'renderer/window1/lib/pg';
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
          const pk_receiver = event.tags.find(
            ([k, v]) => k === 'p' && v && v !== ''
          )[1];
          let showThisEvent = 0;
          // IF THIS PROFILE IS SENDER && I AM RECEIVER
          if (event.pubkey == pubkey && pk_receiver == myPubkey) {
            showThisEvent = 1;
          }
          // IF I AM SENDER && THIS PROFILE IS RECEIVER
          if (event.pubkey == myPubkey && pk_receiver == pubkey) {
            showThisEvent = 2;
          }

          if (showThisEvent == 1) {
            directMessageContainerClassName +=
              ' directMessageContainerFloatLeft';
          }
          if (showThisEvent == 2) {
            directMessageContainerClassName +=
              ' directMessageContainerFloatRight';
          }
          const displayTime = secsToTime(event.created_at);
          if (showThisEvent) {
            return (
              <>
                =<Message event={event} />=
              </>
            );
          }
          <>= no need to send message =</>;
        }
      })}
    </>
  );
};

export default DirectMessages;
