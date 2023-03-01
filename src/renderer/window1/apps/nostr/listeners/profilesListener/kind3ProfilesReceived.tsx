import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';

const Kind3ProfilesReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: aFollowing,
      since: 0,
      kinds: [3],
    },
  });
  events.forEach((event, item) => {
    if (doesEventValidate(event)) {
      // dispatch(addDirectMessageToSqlAndReduxStore(event, myPubkey));
    }
  });
  return (
    <>
      <div>numNotes received: {events.length}</div>
    </>
  );
};

export default Kind3ProfilesReceived;
