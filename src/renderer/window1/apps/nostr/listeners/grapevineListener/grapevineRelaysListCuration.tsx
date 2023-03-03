import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';

const GrapevineRelaysListCuration = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [11901],
      '#g': ['grapevine-testnet'],
      '#r': ['endorseAsRelaysPicker'],
    },
  });
  events.forEach((event, item) => {
    if (doesEventValidate(event)) {
      // dispatch(addDirectMessageToSqlAndReduxStore(event, myPubkey));
    }
  });
  return (
    <>
      <div>numMessages received: {events.length}</div>
      {events.map((event) => {
        return (
          <><div>{JSON.stringify(event,null,4)}</div></>
        )
      })}
    </>
  );
};

export default GrapevineRelaysListCuration;
