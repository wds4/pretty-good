import { useSelector } from 'react-redux';
import MessagesSent from './messagesSent';
import MessagesReceived from './messagesReceived';

const DirectMessages = () => {
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">all DMs</div>
        <MessagesSent />
        <MessagesReceived />
      </div>
    </>
  );
};

export default DirectMessages;
