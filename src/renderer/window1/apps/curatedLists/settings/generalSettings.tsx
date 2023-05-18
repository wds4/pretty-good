import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateBackgroundListener } from 'renderer/window1/redux/features/curatedLists/settings/slice';

const GeneralSettings = () => {
  const dispatch = useDispatch();

  const initState = useSelector(
    (state) => state.curatedListsSettings.activateCuratedListsBackgroundListener
  );

  const processStateChange_activateCuratedListsBackgroundListener = (
    newState
  ) => {
    dispatch(updateBackgroundListener(newState));
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
    </>
  );
};
export default GeneralSettings;
