import { useSelector, useDispatch } from 'react-redux';
import { nodes } from '../../grapevineVisualization';

const TrustScoresSummary = ({ oNode, contextDAG, pubkey }) => {
  // contextDAG == "thisListCuration_allContexts"
  let inf = 0;
  let ave = 0;
  let inp = 0;
  let cer = 0;
  if (oNode) {
    inf = oNode.scores[contextDAG].influence;
    ave = oNode.scores[contextDAG].average;
    inp = oNode.scores[contextDAG].input;
    cer = oNode.scores[contextDAG].certainty;
  }

  return (
    <>
      <div style={{display:"none",textAlign:"left",fontSize:"10px"}}>
        {JSON.stringify(oNode,null,4)}
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '500px',
          marginBottom: '5px',
          textAlign: 'left',
        }}
      >
        <div style={{display:'inline-block',width:'25%'}}>
          <div style={{ color: 'grey' }}>INFLUENCE</div>
          <div>{inf}</div>
        </div>
        <div style={{display:'inline-block',width:'25%'}}>
          <div style={{ color: 'grey' }}>Average</div>
          <div>{ave}</div>
        </div>
        <div style={{display:'inline-block',width:'25%'}}>
          <div style={{ color: 'grey' }}>Input</div>
          <div>{inp}</div>
        </div>
        <div style={{display:'inline-block',width:'25%'}}>
          <div style={{ color: 'grey' }}>Certainty</div>
          <div>{cer}</div>
        </div>
      </div>
    </>
  );
};
export default TrustScoresSummary;
