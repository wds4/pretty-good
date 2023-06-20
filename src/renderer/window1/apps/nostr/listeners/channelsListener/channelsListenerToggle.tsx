import ToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { useSelector, useDispatch } from 'react-redux';
import { updateBackgroundListener } from 'renderer/window1/redux/features/channels/settings/slice';

const ChannelsListenerToggle = () => {
  const dispatch = useDispatch();

  const initState = useSelector(
    (state) => state.curatedListsSettings.activateCuratedListsBackgroundListener
  );

  const processStateChange_activateChannelsBackgroundListener = (
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
            processStateChange_activateChannelsBackgroundListener(
              newState
            )
          }
          initState={initState}
        />
      </div>
    </>
  );
};
export default ChannelsListenerToggle;
