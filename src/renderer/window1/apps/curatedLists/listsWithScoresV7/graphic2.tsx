import { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { singleIterationCompositeUserScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationCompositeUserScoreCalculations';
import { singleIterationInstanceScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationInstanceScoreCalculations';
import ListUI from './listUI';
import Header from './controlPanels/rightPanel/header';

const { options } = VisStyleConstants;

const Graphic2 = ({
  nodes,
  edges,
  data,
  oMyNostrProfileData,
  controlPanelSettings,
  oListData,
}) => {
  const myPubKey = oMyNostrProfileData.pubkey;
  const aAllNodes = nodes.getIds();
  const aAllUserNodes = [];
  const aAllInstanceNodes = [];
  for (let n = 0; n < aAllNodes.length; n++) {
    const nodeID = aAllNodes[n];
    const oNode = nodes.get(nodeID);
    if (oNode.group == 'user') {
      if (!aAllUserNodes.includes(nodeID)) {
        aAllUserNodes.push(nodeID);
      }
    }
    if (oNode.group == 'instance') {
      if (!aAllInstanceNodes.includes(nodeID)) {
        aAllInstanceNodes.push(nodeID);
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
    /*
    const nODe = { id: 200, label: 'NODE 200' };
    nodes.update(nODe);
    const noDe = { id: 0, label: 'NODE 0' };
    nodes.update(noDe);
    const nOde = { id: 100, label: 'NODE 100' };
    nodes.update(nOde);
    */
  }, [domNode, network, data, options]);

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          border: '1px solid blue',
          display: 'none',
        }}
        ref={domNode}
      />
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          height: '100%',
        }}
      >
        <Header
          oListData={oListData}
        />
        <ListUI
          nodes={nodes}
          edges={edges}
          data={data}
          oMyNostrProfileData={oMyNostrProfileData}
          controlPanelSettings={controlPanelSettings}
          aAllNodes={aAllNodes}
          aAllUserNodes={aAllUserNodes}
          aAllInstanceNodes={aAllInstanceNodes}
          oListData={oListData}
        />
      </div>
    </>
  );
};
export default Graphic2;
