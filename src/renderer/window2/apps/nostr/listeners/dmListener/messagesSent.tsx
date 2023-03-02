import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';

const DirectMessagesSent = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [myPubkey],
      since: 0,
      kinds: [4],
    },
  });
  events.forEach((event, item) => {
    if (doesEventValidate(event)) {
      dispatch(addDirectMessageToSqlAndReduxStore(event, myPubkey));
    }
  });
  return (
    <>
      <div>numMessages sent: {events.length}</div>
    </>
  );
};

export default DirectMessagesSent;
