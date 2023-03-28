import { useSelector, useDispatch } from 'react-redux';
import { nodes } from '../grapevineVisualizationMainPage';

const TrustScoresSummary = ({ pubkey }) => {
  const oNode = nodes.get(pubkey);
  let inf = 0;
  let ave = 0;
  let inp = 0;
  let cer = 0;
  if (oNode) {
    inf = oNode.scores.relaysCuration_allRelayTypes.influence;
    ave = oNode.scores.relaysCuration_allRelayTypes.average;
    inp = oNode.scores.relaysCuration_allRelayTypes.input;
    cer = oNode.scores.relaysCuration_allRelayTypes.certainty;
  }

  return (
    <><div style={{textAlign:"left",fontSize:"10px"}}>
      {JSON.stringify(oNode,null,4)}
    </div>
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
          <div>{inf}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Average</div>
          <div>{ave}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Input</div>
          <div>{inp}</div>
        </div>
        <div style={{display:'inline-block',border:'1px dashed grey',width:'25%'}}>
          <div>Certainty</div>
          <div>{cer}</div>
        </div>
      </div>
    </>
  );
};
export default TrustScoresSummary;
