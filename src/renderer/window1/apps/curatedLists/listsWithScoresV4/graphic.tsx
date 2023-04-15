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
  controlPanelSettings,
}) => {
  const oListEvent = JSON.parse(oListData.event);
  let oListWord = {};
  let propertyPath = 'fooData'; //
  if (doesEventValidate(oListEvent)) {
    oListWord = JSON.parse(oListEvent.content);
    propertyPath = oListWord.nostrCuratedListData.propertyPath;
  }

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
      <div style={{ border: '1px solid purple', height: '400px', margin: '2px', display: 'inline-block' }}>
        <Graphic2
          nodes={nodes}
          edges={edges}
          data={data}
          oMyNostrProfileData={oMyNostrProfileData}
          controlPanelSettings={controlPanelSettings}
          oListData={oListData}
        />
      </div>
    </>
  );
};
export default Graphic;
