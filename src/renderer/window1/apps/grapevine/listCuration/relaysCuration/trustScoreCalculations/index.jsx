import MiniProfile from './miniProfile';
import RatingsRows from './ratingsRows';
import TrustScoresSummary from './scoresSummary';
import TrustScoresSummations from './scoresSummations';

const TrustScoreCalculations = () => {
  const pk_selected = "e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f";
  return (
    <>
      <div style={{width:'100%',padding:'5px',border:'1px solid purple',backgroundColor:'#CFCFCF'}}>
        <center>Trust Score Calculations</center>
        <center>
          <div style={{display:'inline-block'}}>
            <MiniProfile pubkey={pk_selected} />
          </div>
          <div style={{display:'inline-block'}}>
            <TrustScoresSummary />
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
export default TrustScoreCalculations;
