import { useSelector } from 'react-redux';
import { fetchDirectMessagesFromAliceToBob } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import Message from './message';

// need to clean this code up
const MessagesPanel = ({ pubkey }) => {
  const pubkey_focus = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;

  const oMessagesFromMe = fetchDirectMessagesFromAliceToBob(myPubkey,pubkey);
  const oMessagesToMe = fetchDirectMessagesFromAliceToBob(pubkey,myPubkey);

  // const aMessageIds = [];

  const aMessagesFromMe = Object.keys(oMessagesFromMe);
  const aMessagesToMe = Object.keys(oMessagesToMe);

  const aMessageIds = [ ...aMessagesFromMe, ...aMessagesToMe ];
  const oMessages = { ...oMessagesFromMe, ...oMessagesToMe }


  const aMessages = [];
  aMessageIds.forEach((id) => {
    const oMessage = oMessages[id];
    console.log("oMessage "+JSON.stringify(oMessage,null,4))
    console.log("oMessage id: "+id)
    const obj = {
      created_at: oMessage.event.created_at,
      id: id
    }
    aMessages.push(obj)
  });
  console.log("aMessages BEFORE "+JSON.stringify(aMessages,null,4))
  aMessages.sort((a, b) => parseFloat(a.created_at) - parseFloat(b.created_at));
  console.log("aMessages AFTER "+JSON.stringify(aMessages,null,4))

  // events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  // aMessages.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  return (
    <>
      {aMessages.map((obj) => {
        const id = obj.id;
        let showThisEvent = 0;
        if (aMessagesFromMe.includes(id)) {
          showThisEvent = 1;
        }
        if (aMessagesToMe.includes(id)) {
          showThisEvent = 2;
        }
        return (
          <>
            <Message
              event={oMessages[id].event}
              showThisEvent={showThisEvent}
            />
          </>
        );
      })}
    </>
  );
};

export default MessagesPanel;
