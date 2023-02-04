import { useSelector } from 'react-redux';
import { fetchDirectMessagesFromAliceToBob } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import Message from './message';

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

  return (
    <>
      pubkey: {pubkey} <br />
      aMessagesFromMe: {aMessagesFromMe.length} <br />
      aMessagesToMe: {aMessagesToMe.length} <br />
      {aMessageIds.map((id) => {
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
