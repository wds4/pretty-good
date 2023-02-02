import ToggleSwitch from './grToggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrGrapevineGeneralSettings, restoreDefaultNostrGrapevineSettings } from 'renderer/window1/redux/features/nostrGlobalState/slice';

const TopPanel = ({  }) => {
  const nostrGrapevineActivationState = useSelector((state) => state.nostrGlobalState.nostrGrapevineSettings.active);
  const dispatch = useDispatch();
  const processStateChange = (newState) => {
    // console.log(`processStateChange callback; ${newState}`);
    const oUpdate = {active: newState }
    dispatch(updateNostrGrapevineGeneralSettings(oUpdate));
  };
  const resetDefaults = () => {
    console.log(`resetDefaults`);
    dispatch(restoreDefaultNostrGrapevineSettings());
  }
  return (
    <>
      <div
        style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}
      >
        The Grapevine is under construction and not yet functional.
      </div>
      <div
        className="grapevineSettingsItemContainer"
        style={{ textAlign: 'center' }}
      >
        <div className="grapevineSettingsItemLeftCol">Grapevine</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="grapevine"
            processStateChange={(newState) => processStateChange(newState)}
            initState={nostrGrapevineActivationState}
          />
        </div>
        <button
          type="button"
          id="resetDefaultGrapevineSettingsButton"
          className="doSomethingButton"
          onClick={resetDefaults}
        >
          Reset Default Grapevine Settings
        </button>
      </div>
    </>
  );
};

export default TopPanel;
