import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateBackgroundListener } from 'renderer/window1/redux/features/curatedLists/settings/slice';
import {
  updateDevMode4,
  updateDevMode5,
  updateDevMode6,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const GeneralSettings = () => {
  const dispatch = useDispatch();

  const initState = useSelector(
    (state) => state.curatedListsSettings.activateCuratedListsBackgroundListener
  );

  const initState4 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode4
  );

  const initState5 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode5
  );

  const initState6 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode6
  );

  const processStateChange_activateCuratedListsBackgroundListener = (
    newState
  ) => {
    dispatch(updateBackgroundListener(newState));
  };

  const processStateChange_devMode4 = (newState) => {
    dispatch(updateDevMode4(newState));
  };

  const processStateChange_devMode5 = (newState) => {
    dispatch(updateDevMode5(newState));
  };

  const processStateChange_devMode6 = (newState) => {
    dispatch(updateDevMode6(newState));
  };
  return (
    <>
      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">toggle listener</div>
        <div className="grapevineSettingsTopRight">
          activateCuratedListsBackgroundListener
        </div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode"
            processStateChange={(newState) =>
              processStateChange_activateCuratedListsBackgroundListener(
                newState
              )
            }
            initState={initState}
          />
        </div>
        <div className="grapevineSettingsDescription">
          toggle the general listener for curated lists, which is called by the
          Curated Lists masthead
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">
          show Curated Lists from SQL
        </div>
        <div className="grapevineSettingsTopRight">devMode4</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode4"
            processStateChange={(newState) =>
              processStateChange_devMode4(newState)
            }
            initState={initState4}
          />
        </div>
        <div className="grapevineSettingsDescription">
          on Curated Lists main page: show data (lists, list items, and
          endorsements) from SQL. This does not update without refreshing the
          page, but otherwise works as intended.
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">
          show Curated Lists from redux store
        </div>
        <div className="grapevineSettingsTopRight">devMode5</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode5"
            processStateChange={(newState) =>
              processStateChange_devMode5(newState)
            }
            initState={initState5}
          />
        </div>
        <div className="grapevineSettingsDescription">
          on Curated Lists main page: show data (lists, list items,
          endorsements) from redux store. This data updates live without the
          need to refresh tha page. (But still has some bugs as of 3 June 2023.)
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsTitle">
          show additional features on Curated Lists main page
        </div>
        <div className="grapevineSettingsTopRight">devMode6</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="devMode6"
            processStateChange={(newState) =>
              processStateChange_devMode6(newState)
            }
            initState={initState6}
          />
        </div>
        <div className="grapevineSettingsDescription">
          on Curated Lists main page: show extra features including control
          panel, graphical visualization of the web of trust, etc. This is
          useful for debugging this page but makes the page too busy from a UI
          perspective. Also, all of these features are present on the
          visualization page.
        </div>
      </div>
    </>
  );
};
export default GeneralSettings;
