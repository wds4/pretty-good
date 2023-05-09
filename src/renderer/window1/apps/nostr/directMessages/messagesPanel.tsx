import { useSelector } from 'react-redux';
import { fetchDirectMessagesFromAliceToBob } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import Message from './message';
import { timeout } from 'renderer/window1/lib/pg';

// need to clean this code up
const MessagesPanel = ({ pubkey }) => {
  const pubkey_focus = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;

  const oMessagesToMe = fetchDirectMessagesFromAliceToBob(myPubkey,pubkey_focus);
  const oMessagesFromMe = fetchDirectMessagesFromAliceToBob(pubkey_focus,myPubkey);
  console.log("MessagesPanel; myPubkey: "+myPubkey+"; pubkey: "+pubkey )
  console.log("MessagesPanel; oMessagesFromMe: "+ JSON.stringify(oMessagesFromMe,null,4) )
  console.log("MessagesPanel;  oMessagesToMe: "+ JSON.stringify(oMessagesToMe,null,4) )

  // const aMessageIds = [];

  const aMessagesFromMe = Object.keys(oMessagesFromMe);
  const aMessagesToMe = Object.keys(oMessagesToMe);

  const aMessageIds = [ ...aMessagesFromMe, ...aMessagesToMe ];
  const oMessages = { ...oMessagesFromMe, ...oMessagesToMe }

  const aMessages = [];
  aMessageIds.forEach((id) => {
    const oMessage = oMessages[id];
    // console.log("oMessage "+JSON.stringify(oMessage,null,4))
    // console.log("oMessage id: "+id)
    const obj = {
      created_at: oMessage.event.created_at,
      id: id
    }
    aMessages.push(obj)
  });
  // console.log("aMessages BEFORE "+JSON.stringify(aMessages,null,4))
  aMessages.sort((a, b) => parseFloat(a.created_at) - parseFloat(b.created_at));
  // console.log("aMessages AFTER "+JSON.stringify(aMessages,null,4))

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
