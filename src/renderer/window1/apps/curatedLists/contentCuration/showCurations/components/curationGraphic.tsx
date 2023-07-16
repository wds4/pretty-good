import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';

const { options } = VisStyleConstants;

const CurationGraphic = ({
  nodes,
  edges,
  data,
  oMyNostrProfileData,
  controlPanelSettings,
  oCuratedListData,
  oNostrProfilesData,
  curatedListEventId,
}) => {
  const aAllNodes = nodes.getIds();
  const aAllCuratorNodes = [];
  const aAllItemNodes = [];
  for (let n = 0; n < aAllNodes.length; n++) {
    const nodeID = aAllNodes[n];
    const oNode = nodes.get(nodeID);
    if (oNode.group == 'user') {
      if (!aAllCuratorNodes.includes(nodeID)) {
        aAllCuratorNodes.push(nodeID);
      }
    }
    if (oNode.group == 'instance') {
      if (!aAllItemNodes.includes(nodeID)) {
        aAllItemNodes.push(nodeID);
      }
    }
  }

  const domNode = useRef(null);

  const network = useRef(null);

  useEffect(() => {
    network.current = new Network(domNode.current, data, options);
    network.current.fit();

    network.current.on('click', function (params) {
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
    });

    // EDGES
    network.current.on('selectEdge', function (params) {
      // console.log("selectEdge event triggered")
      const edges_arr = params.edges;
      const numEdges = edges_arr.length;
      if (numEdges == 1) {
        const edgeID = edges_arr[0];
      }
    });
    network.current.on('deselectEdge', function (params) {});

    // NODES
    network.current.on('selectNode', function (params) {
      // console.log("selectNode event triggered")
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
      if (numNodes == 1) {
        const nodeID = nodes_arr[0];
        const node = nodes.get(nodeID);
        const { label } = node;
        console.log(`selectNode; label: ${label}`);
        node.label = 'CHANGED';
        nodes.update(node);
        // drawScoreCalculationPanel(nodeID)
      }
    });
    network.current.on('deselectNode', function (params) {
      // jQuery("#usernameContainer").html("none")
    });
  }, [domNode, network, data, options]);

  const devMode6 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode6
  );
  let displayGraph = 'none';
  if (devMode6) {
    displayGraph = 'block';
  }

  return (
    <>
      <div
        style={{
          height: '300px',
          width: '100%',
          border: '1px solid blue',
          display: displayGraph,
        }}
        ref={domNode}
      />
    </>
  );
};
export default CurationGraphic;

