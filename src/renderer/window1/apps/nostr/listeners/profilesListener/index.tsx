import { useSelector } from 'react-redux';
import Kind3ProfilesReceived from './kind3ProfilesReceived';

const Profiles = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">kind3 profiles</div>
        <Kind3ProfilesReceived />
      </div>
    </>
  );
};

export default Profiles;
