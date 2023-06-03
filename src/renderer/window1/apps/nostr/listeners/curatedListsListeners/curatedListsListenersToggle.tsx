import ToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { useSelector, useDispatch } from 'react-redux';
import { updateBackgroundListener } from 'renderer/window1/redux/features/curatedLists/settings/slice';

const CuratedListsListenersToggle = () => {
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
      <div style={{display:'inline-block'}}>
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
    </>
  );
};
export default CuratedListsListenersToggle;
