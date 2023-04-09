import { useSelector } from 'react-redux';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { extractNodesAndEdges } from 'renderer/window1/lib/curatedLists';

import Graphic2 from './graphic2';

const { options } = VisStyleConstants;

const Graphic = ({
  oMyNostrProfileData,
  oNostrProfilesData,
  oListData,
  aCuratedListInstances,
  aRatingsOfInstancesData,
  aEndorsementsOfCuratorsData,
}) => {
  const oListEvent = JSON.parse(oListData.event);
  let oListWord = {};
  let propertyPath = 'fooData'; //
  if (doesEventValidate(oListEvent)) {
    oListWord = JSON.parse(oListEvent.content);
    propertyPath = oListWord.nostrCuratedListData.propertyPath;
  }
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );

  const { aNodes, aEdges } = extractNodesAndEdges(
    oMyNostrProfileData,
    oNostrProfilesData,
    propertyPath,
    aCuratedListInstances,
    aRatingsOfInstancesData,
    aEndorsementsOfCuratorsData,
    controlPanelSettings,
  );

  const nodes = new DataSet(aNodes);
  const edges = new DataSet(aEdges);
  const data = {
    nodes,
    edges,
  };

  return (
    <>
      <div style={{ border: '1px solid purple', margin: '10px' }}>
        <div style={{ display: 'inline-block', width: '100%' }}>
          <Graphic2
            nodes={nodes}
            edges={edges}
            data={data}
            oMyNostrProfileData={oMyNostrProfileData}
            controlPanelSettings={controlPanelSettings}
            oListData={oListData}
          />
        </div>
      </div>
    </>
  );
};
export default Graphic;
