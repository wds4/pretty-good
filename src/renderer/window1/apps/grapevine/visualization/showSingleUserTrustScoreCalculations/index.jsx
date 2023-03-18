import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';
import RatingsRows from './ratingsRows';
import TrustScoresSummary from './scoresSummary';
import TrustScoresSummations from './scoresSummations';

const ShowSingleUserTrustScoreCalculations = ({controlPanelSettings}) => {
  /*
  const pk_selected = useSelector(
    (state) => state.controlPanelSettings.selectedPubkeyForShowingTrustCalculations
  );
  */
  const pk_selected = controlPanelSettings.selectedPubkeyForShowingTrustCalculations;
  return (
    <>
      <div style={{width:'100%',padding:'5px',border:'1px solid purple',backgroundColor:'#CFCFCF'}}>
        <center>Trust Score Calculationss</center>
        aF: {controlPanelSettings.attenuationFactor}
        <center>
          <div style={{display:'inline-block'}}>
            <MiniProfile pubkey={pk_selected} />
          </div>
          <div style={{display:'inline-block'}}>
            <TrustScoresSummary pubkey={pk_selected} />
          </div>
          <div >
            <RatingsRows pubkey={pk_selected} controlPanelSettings={controlPanelSettings} />
          </div>
          <div >
            <TrustScoresSummations pubkey={pk_selected} />
          </div>
        </center>
      </div>
    </>
  );
};
export default ShowSingleUserTrustScoreCalculations;
