import MiniInstanceSummary from './miniInstanceSummary';
import ScoresSummary from './scoresSummary';
import RatingsRows from './ratingsRows';
import { nodes } from '../../grapevineVisualization';

const CuratedListInstance = ({
  instanceID,
  contextDAG,
  controlPanelSettings,
}) => {
  const oNode = nodes.get(instanceID);
  return (
    <>
      <center>Instance Comp Score Calculations: {contextDAG}</center>
      <center>
        <div style={{ display: 'inline-block' }}>
          <MiniInstanceSummary oNode={oNode} instanceID={instanceID} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <ScoresSummary oNode={oNode} contextDAG={contextDAG} instanceID={instanceID} />
        </div>
        <div>
          <RatingsRows
            oNode={oNode}
            instanceID={instanceID}
            controlPanelSettings={controlPanelSettings}
          />
        </div>
      </center>
      <div style={{fontSize:'10px',textAlign:'left'}}>{JSON.stringify(oNode,null,4)}</div>
    </>
  );
};
export default CuratedListInstance;
