import { useSelector } from 'react-redux';
import GrapevineRelaysListCuration from './grapevineRelaysListCuration';

const Grapevine = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  devModeClassName = 'devModeOn';
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">Grapevine Events</div>
        <GrapevineRelaysListCuration />
      </div>
    </>
  );
};

export default Grapevine;
