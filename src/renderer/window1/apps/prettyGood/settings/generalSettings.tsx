import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDevMode,
  updateDevMode1,
  updateDevMode2,
  updateDevMode3,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
const GeneralSettings = () => {
  const initState = useSelector(
    (state) => state.myNostrProfile.devModes.devMode
  );
  const initState1 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode1
  );
  const initState2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  const initState3 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode3
  );
  const dispatch = useDispatch();
  const processStateChange_devMode = (newState) => {
    dispatch(updateDevMode(newState));
    // dispatch(b_updateDevMode(newState));
  };
  const processStateChange_devMode1 = (newState) => {
    console.log(`processStateChange_devMode1 callback; ${newState}`);
    dispatch(updateDevMode1(newState));
    // dispatch(b_updateDevMode2(newState));
  };
  const processStateChange_devMode2 = (newState) => {
    console.log(`processStateChange_devMode2 callback; ${newState}`);
    dispatch(updateDevMode2(newState));
    // dispatch(b_updateDevMode2(newState));
  };
  const processStateChange_devMode3 = (newState) => {
    console.log(`processStateChange_devMode3 callback; ${newState}`);
    dispatch(updateDevMode3(newState));
    // dispatch(b_updateDevMode3(newState));
  };
  return (
    <>
      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle developer mode</div>
        <div className="grapevineSettingsTopRight">devMode</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode"
            processStateChange={(newState) =>
              processStateChange_devMode(newState)
            }
            initState={initState}
          />
        </div>
        <div className="grapevineSettingsDescription">
          used for debugging (in process of deprecating this generic mode in favor of multiple more specific modes, below)
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle Curated Lists</div>
        <div className="grapevineSettingsTopRight">devMode1</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode1"
            processStateChange={(newState) =>
              processStateChange_devMode1(newState)
            }
            initState={initState1}
          />
        </div>
        <div className="grapevineSettingsDescription">
          access the Curated Lists app
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle alpha / beta mode</div>
        <div className="grapevineSettingsTopRight">devMode2</div>
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
          show misc other apps and features that are still in alpha
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">
          show developer details for nostr nerds
        </div>
        <div className="grapevineSettingsTopRight">devMode3</div>
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
          reveals "nostr nerd" toggle buttons, designated with 🤓, to see things that may be of interest to devs, like:
          <li>individual raw nostr note files</li>
          <li>how concept graph words are structured and packaged into nostr notes</li>
        </div>
      </div>
    </>
  );
};
export default GeneralSettings;
