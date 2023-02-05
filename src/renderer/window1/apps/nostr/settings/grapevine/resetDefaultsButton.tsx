import { useDispatch } from 'react-redux';
import { restoreDefaultNostrGrapevineSettings } from 'renderer/window1/redux/features/nostr/settings/slice';

const ResetDefaultsButton = ({  }) => {
  const dispatch = useDispatch();
  const resetDefaults = () => {
    console.log(`resetDefaults`);
    dispatch(restoreDefaultNostrGrapevineSettings());
  }
  return (
    <>
      <button
        type="button"
        id="resetDefaultGrapevineSettingsButton"
        className="doSomethingButton"
        onClick={resetDefaults}
      >
        Reset Default Grapevine Settings
      </button>
    </>
  );
};

export default ResetDefaultsButton;
