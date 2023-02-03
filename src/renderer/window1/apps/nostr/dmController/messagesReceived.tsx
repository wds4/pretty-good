import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';

const DirectMessagesReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      since: 0, // all new events from now
      kinds: [4],
      '#p': [myPubkey],
    },
  });
  events.forEach((event, item) => {
    if (doesEventValidate(event)) {
      dispatch(addDirectMessageToSqlAndReduxStore(event, myPubkey));
    }
  });
  return (
    <>
      <div>numMessages received: {events.length}</div>
    </>
  );
};

export default DirectMessagesReceived;
