import { useSelector } from 'react-redux';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { extractNodesAndEdgesRedo } from 'renderer/window1/lib/curatedLists/extractNodesAndEdgesRedo';

import Graphic2Redo from './graphic2Redo';

const { options } = VisStyleConstants;

const GraphicRedo = ({
  controlPanelSettings,
  curatedListEventId,
  oMyNostrProfileData,
  oNostrProfilesData,
  oCuratedListData,
  oCuratedLists,
}) => {
  const oWord = oCuratedListData.oWord;
  const propertyPath = oWord.nostrCuratedListData.propertyPath;

  const { aNodes, aEdges } = extractNodesAndEdgesRedo(
    oMyNostrProfileData,
    oNostrProfilesData,
    propertyPath,
    oCuratedListData,
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
      <div
        style={{
          padding: '2px',
          width: '98%',
          maxHeight: '800px',
          margin: '2px',
          display: 'inline-block',
        }}
      >
        <Graphic2Redo
          nodes={nodes}
          edges={edges}
          data={data}
          oMyNostrProfileData={oMyNostrProfileData}
          controlPanelSettings={controlPanelSettings}
          oCuratedListData={oCuratedListData}
          oNostrProfilesData={oNostrProfilesData}
          curatedListEventId={curatedListEventId}
        />
      </div>
    </>
  );
};
export default GraphicRedo;

