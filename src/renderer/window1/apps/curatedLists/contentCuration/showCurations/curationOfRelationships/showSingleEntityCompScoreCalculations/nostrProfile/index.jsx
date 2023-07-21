import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';
import RatingsRows from './ratingsRows';
import ScoresSummary from './scoresSummary';
import TrustScoresSummations from './scoresSummations';
import { nodes } from '../../curationOfRelationships';

const NostrProfile = ({ pubkey, contextDAG, controlPanelSettings }) => {
  const devMode = useSelector(
    (state) => state.myNostrProfile.devModes.devMode
  );
  let devElemClass = "devElemHide";
  if (devMode) { devElemClass = "devElemShow"; }
  const oNode = nodes.get(pubkey);
  return (
    <>
      <center>score calculations overview</center>
      <center>
        <div style={{ display: 'block' }}>
          <MiniProfile oNode={oNode} pubkey={pubkey} />
        </div>
        <div style={{ display: 'block' }}>
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
      <div className={devElemClass} style={{fontSize:'10px',textAlign:'left'}}>
        {contextDAG}
        <br />
        {JSON.stringify(oNode,null,4)}
      </div>
    </>
  );
};
export default NostrProfile;
