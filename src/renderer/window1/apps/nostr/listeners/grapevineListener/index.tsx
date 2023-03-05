import { useSelector } from 'react-redux';
import EndorseAsRelaysPickerListener from './endorseAsRelaysPickerListener';
import EndorseAsRelaysPickerHunterListener from './endorseAsRelaysPickerHunterListener';

const Grapevine = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h3">Relays Recommendation via the Grapevine; kind 39901 Listeners</div>
        <EndorseAsRelaysPickerListener />
        <EndorseAsRelaysPickerHunterListener />
      </div>
    </>
  );
};

export default Grapevine;
