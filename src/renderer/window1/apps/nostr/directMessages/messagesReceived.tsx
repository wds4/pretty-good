import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const DirectMessagesReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  // 32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245 - jb55
  // 3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d - fiatjaf
  // 84dee6e676e5bb67b4ad4e042cf70cbd8681155db535942fcc6a0533858a7240 - snowden
  const filter = {
    "#p": [ "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245" ],
    since: 0,
    kinds: [4],
  },
  const { events } = useNostrEvents((filter)=>{
    filter: filter
  });
  return (
    <>
      <pre>{JSON.stringify(filter,null,4)}</pre>
      <pre>numEvents received: - {events.length}</pre>
      {events.reverse().map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <div style={{border:"1px solid red",marginBottom:"20px"}}>
              <pre>received: - {event.id}</pre>
              <pre>{JSON.stringify(event,null,4)}</pre>
            </div>

            </>
          );
        }
      })}
    </>
  );
};

export default DirectMessagesReceived;
