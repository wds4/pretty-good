import { useSelector, useDispatch } from 'react-redux';

const TrustScoresSummary = ({ pubkey }) => {

  return (
    <>
      <div
        style={{
          display: 'inline-block',
          border: '1px dashed grey',
          width: '500px',
          marginBottom: '5px',
          textAlign: 'left',
        }}
      >
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>INFLUENCE</div>
          <div>0</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Average</div>
          <div>0</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Input</div>
          <div>0</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Certainty</div>
          <div>0</div>
        </div>
      </div>
    </>
  );
};
export default TrustScoresSummary;
