import { useNostrEvents } from 'nostr-react';
import { useSelector } from 'react-redux';
import MessagesSent from './messagesSent';
import MessagesReceived from './messagesReceived';

const DirectMessages = () => {

  return (
    <>
      <div className="h4">all DMs</div>
      <MessagesSent />
      <MessagesReceived />
    </>
  );
};

export default DirectMessages;
