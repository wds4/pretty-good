import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateDevMode } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const GeneralSettings = () => {
  const initState = useSelector((state) => state.prettyGoodGlobalState.devMode);
  const dispatch = useDispatch();
  const processStateChange = (newState) => {
    console.log(`processStateChange callback; ${newState}`);
    dispatch(updateDevMode(newState));
  };
  return (
    <>
      <div className="grapevineSettingsItemContainer">
        toggle developer mode
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode"
            processStateChange={(newState) => processStateChange(newState)}
            initState={initState}
          />
        </div>
      </div>
    </>
  );
};
export default GeneralSettings;
