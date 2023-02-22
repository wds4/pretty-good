import { useSelector } from 'react-redux';
import MyFollowingListReceived from './myFollowingListReceived';
import MyProfileReceived from './myProfileReceived';

const MyNostrProfileListener = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">listening for my nostr profile info </div>
        <MyFollowingListReceived />
        <MyProfileReceived />
      </div>
    </>
  );
};

export default MyNostrProfileListener;
