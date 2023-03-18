import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';
import RatingsRows from './ratingsRows';
import TrustScoresSummary from './scoresSummary';
import TrustScoresSummations from './scoresSummations';

const ShowSingleUserTrustScoreCalculations = () => {
  const pk_selected = useSelector(
    (state) => state.controlPanelSettings.selectedPubkeyForShowingTrustCalculations
  );
  return (
    <>
      <div style={{width:'100%',padding:'5px',border:'1px solid purple',backgroundColor:'#CFCFCF'}}>
        <center>Trust Score Calculations</center>
        <center>
          <div style={{display:'inline-block'}}>
            <MiniProfile pubkey={pk_selected} />
          </div>
          <div style={{display:'inline-block'}}>
            <TrustScoresSummary pubkey={pk_selected} />
          </div>
          <div >
            <RatingsRows />
          </div>
          <div >
            <TrustScoresSummations />
          </div>
        </center>
      </div>
    </>
  );
};
export default ShowSingleUserTrustScoreCalculations;
