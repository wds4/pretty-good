import ToggleSwitch from './grToggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrGrapevineGeneralSettings } from 'renderer/window1/redux/features/nostr/settings/slice';

const TopPanel = ({  }) => {
  const nostrGrapevineActivationState = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  const dispatch = useDispatch();
  const processStateChange = (newState) => {
    // console.log(`processStateChange callback; ${newState}`);
    const oUpdate = {active: newState }
    dispatch(updateNostrGrapevineGeneralSettings(oUpdate));
  };
  return (
    <>
      <div
        style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}
      >
        "Let me see what my Grapevine has to say about that."
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
      </div>
    </>
  );
};

export default TopPanel;
