import { useSelector } from 'react-redux';
import MiniInstanceSummary from './miniInstanceSummary';
import ScoresSummary from './scoresSummary';
import RatingsRows from './ratingsRows';
import { nodes } from '../../curationOfTopics';
import ScoresSummations from './scoresSummations';

const CuratedListInstance = ({
  instanceID,
  contextDAG,
  controlPanelSettings,
}) => {
  const devMode = useSelector(
    (state) => state.myNostrProfile.devModes.devMode
  );
  let devElemClass = "devElemHide";
  if (devMode) { devElemClass = "devElemShow"; }
  const oNode = nodes.get(instanceID);
  return (
    <>
      <center>score calculations overview</center>
      <center>
        <div style={{ display: 'block' }}>
          <MiniInstanceSummary oNode={oNode} instanceID={instanceID} />
        </div>
        <div style={{ display: 'block' }}>
          <ScoresSummary oNode={oNode} contextDAG={contextDAG} instanceID={instanceID} />
        </div>
        <div>
          <RatingsRows
            oNode={oNode}
            instanceID={instanceID}
            controlPanelSettings={controlPanelSettings}
          />
        </div>
        <div>
          <ScoresSummations oNode={oNode} />
        </div>
      </center>
      <div className={devElemClass} style={{fontSize:'10px',textAlign:'left'}}>
        contextDAG: {contextDAG}
        <br />
        {JSON.stringify(oNode,null,4)}
      </div>
    </>
  );
};
export default CuratedListInstance;
