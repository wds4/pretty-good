import { useSelector, useDispatch } from 'react-redux';
import { nodes } from '../graphView';

const TrustScoresSummary = ({ pubkey }) => {
  const oNode = nodes.get(pubkey);
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
          <div>{oNode.scores.relaysCuration_allRelayTypes.influence}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Average</div>
          <div>{oNode.scores.relaysCuration_allRelayTypes.average}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Input</div>
          <div>{oNode.scores.relaysCuration_allRelayTypes.input}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Certainty</div>
          <div>{oNode.scores.relaysCuration_allRelayTypes.certainty}</div>
        </div>
      </div>
    </>
  );
};
export default TrustScoresSummary;
