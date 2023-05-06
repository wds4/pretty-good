import { useSelector } from 'react-redux';
import MyFollowingAndRelaysListsReceived from './myFollowingAndRelaysListsReceived';
import MyProfileReceived from './myProfileReceived';

const MyNostrProfileListener = () => {
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">listening for my nostr profile info </div>
        <MyFollowingAndRelaysListsReceived />
        <MyProfileReceived />
      </div>
    </>
  );
};

export default MyNostrProfileListener;
