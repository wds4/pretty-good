import { useSelector } from 'react-redux';
import NostrProfile from './nostrProfile';
import CuratedListInstance from './curatedListInstance';

const ShowSingleEntityCompScoreCalculations = ({
  contextDAG,
  controlPanelSettings,
}) => {
  const pk_selected = useSelector(
    (state) =>
      state.controlPanelSettings.selectedPubkeyForShowingTrustCalculations
  );
  const instanceID_selected = useSelector(
    (state) =>
      state.controlPanelSettings.selectedInstanceIDForShowingCompScoreCalculations
  );
  const { entityTypeForShowingCalculations } = controlPanelSettings;
  if (entityTypeForShowingCalculations === 'nostrProfile') {
    return (
      <>
        <div
          style={{
            width: '100%',
            padding: '5px',
            border: '1px solid purple',
            backgroundColor: '#CFCFCF',
          }}
        >
          <NostrProfile
            pubkey={pk_selected}
            contextDAG={contextDAG}
            controlPanelSettings={controlPanelSettings}
          />
        </div>
      </>
    );
  }
  if (entityTypeForShowingCalculations === 'curatedListInstance') {
    return (
      <>
        <div
          style={{
            width: '100%',
            padding: '5px',
            border: '1px solid purple',
            backgroundColor: '#CFCFCF',
          }}
        >
          <CuratedListInstance
            instanceID={instanceID_selected}
            contextDAG={contextDAG}
            controlPanelSettings={controlPanelSettings}
          />
        </div>
      </>
    );
  }
};
export default ShowSingleEntityCompScoreCalculations;
