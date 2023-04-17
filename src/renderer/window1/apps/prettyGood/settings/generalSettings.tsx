import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDevMode,
  updateDevMode2,
  updateDevMode3,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';

const GeneralSettings = () => {
  const initState1 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode
  );
  const initState2 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode2
  );
  const initState3 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode3
  );
  const dispatch = useDispatch();
  const processStateChange_devMode = (newState) => {
    dispatch(updateDevMode(newState));
  };
  const processStateChange_devMode2 = (newState) => {
    console.log(`processStateChange_devMode2 callback; ${newState}`);
    dispatch(updateDevMode2(newState));
  };
  const processStateChange_devMode3 = (newState) => {
    console.log(`processStateChange_devMode3 callback; ${newState}`);
    dispatch(updateDevMode3(newState));
  };
  return (
    <>
      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle developer mode</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode"
            processStateChange={(newState) =>
              processStateChange_devMode(newState)
            }
            initState={initState1}
          />
        </div>
        <div className="grapevineSettingsDescription">
          used for debugging (may be deprecating this mode in favor of below)
        </div>
      </div>
      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle alpha / beta mode</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode2"
            processStateChange={(newState) =>
              processStateChange_devMode2(newState)
            }
            initState={initState2}
          />
        </div>
        <div className="grapevineSettingsDescription">
          show features that are still in alpha
        </div>
      </div>
      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">
          show developer details for nostr nerds
        </div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode3"
            processStateChange={(newState) =>
              processStateChange_devMode3(newState)
            }
            initState={initState3}
          />
        </div>
        <div className="grapevineSettingsDescription">
          reveals "nostr nerd" toggle buttons to see things like how concept
          graph words are structured and how they are packaged into nostr notes
        </div>
      </div>
    </>
  );
};
export default GeneralSettings;
