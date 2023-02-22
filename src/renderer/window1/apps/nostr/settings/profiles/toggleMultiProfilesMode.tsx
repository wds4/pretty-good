import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateMultiProfilesMode } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const ToggleMultiProfilesMode = () => {
  const initState = useSelector(
    (state) => state.myNostrProfile.multiProfilesMode
  );
  const dispatch = useDispatch();
  const processStateChange = (newState) => {
    console.log(`processStateChange callback; ${newState}`);
    dispatch(updateMultiProfilesMode(newState));
  };
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'inline-block' }}>
          <ToggleSwitch
            label="multiProfilesMode"
            processStateChange={(newState) => processStateChange(newState)}
            initState={initState}
          />
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '14px',
          }}
        >
          Multi Client
          <br />
          Access
        </div>
        <div
          style={{
            display: 'inline-block',
            fontSize: '10px',
            marginLeft: '10px',
            width: '70%',
          }}
        >
          If you plan to make use of this profile from multiple clients (but
          don't have nip05 set up), this mode will automatically import and
          update your active profile settings, including following list, from
          the nostr network. Experimental; may result in loss of data.
        </div>
      </div>
    </>
  );
};
export default ToggleMultiProfilesMode;
