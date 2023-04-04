import MiniProfile from './miniProfile';
import RatingsRows from './ratingsRows';
import ScoresSummary from './scoresSummary';
import TrustScoresSummations from './scoresSummations';
import { nodes } from '../../grapevineVisualization';

const NostrProfile = ({ pubkey, contextDAG, controlPanelSettings }) => {
  const oNode = nodes.get(pubkey);
  return (
    <>
      <center>Nostr User Trust Score Calculations: {contextDAG}</center>
      <center>
        <div style={{ display: 'inline-block' }}>
          <MiniProfile oNode={oNode} pubkey={pubkey} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <ScoresSummary oNode={oNode} contextDAG={contextDAG} pubkey={pubkey} />
        </div>
        <div>
          <RatingsRows
            oNode={oNode}
            pubkey={pubkey}
            controlPanelSettings={controlPanelSettings}
          />
        </div>
        <div>
          <TrustScoresSummations oNode={oNode} pubkey={pubkey} />
        </div>
      </center>
      <div style={{fontSize:'10px',textAlign:'left'}}>{JSON.stringify(oNode,null,4)}</div>
    </>
  );
};
export default NostrProfile;
