import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateMyRelayListEndorsementMode } from 'renderer/window1/redux/features/nostrGlobalState/slice';

const EndorseRelays = () => {
  const initState = useSelector((state) => state.nostrGlobalState.nostrRelayManagement.endorseMyNostrRelays);
  const dispatch = useDispatch();
  const processStateChange = (newState) => {
    console.log(`processStateChange callback; ${newState}`);
    dispatch(updateMyRelayListEndorsementMode(newState));
  };
  return (
    <>
      <div className="endorseMyRelaysContainer">

        <div className="grapevineSettingsItemMainToggleCol">
          <ToggleSwitch
            label="endorseMyRelays"
            processStateChange={(newState) => processStateChange(newState)}
            initState={initState}
          />
        </div>
        <div style={{display:"inline-block",width:"80%"}}>
        <i>Endorse my nostr relay list</i><br/><br/>
        If you actively vet your relay list, endorsement is a valuable service you can provide to the nostr community.
        If you are no longer actively managing your relay list, you can turn your endorsement off at any point.
        </div>
      </div>
    </>
  );
}
export default EndorseRelays;
