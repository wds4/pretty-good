import { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
const { options } = VisStyleConstants;

/*
let nodes = new DataSet([]);
let edges = new DataSet([]);
let data = {
  nodes,
  edges,
};
let network = {};
*/

const Graphic = ({aNodes, aEdges}) => {

  let nodes = new DataSet(aNodes);
  let edges = new DataSet(aEdges);
  let data = {
      nodes,
      edges
  };
  let network = {};

  const domNode = useRef(null);

  network = useRef(null);

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
        const { name } = node;
        // drawScoreCalculationPanel(nodeID)
      }
    });
    network.current.on('deselectNode', function (params) {
      // jQuery("#usernameContainer").html("none")
    });
  }, [domNode, network, data, options]);

  const oNode0 = { id: 0, label: 'Node 0' },

  return (
    <>
      <div
        style={{ height: '500px', width: '25%', border: '1px solid purple', display: 'inline-block' }}
        ref={domNode}
      />
    </>
  );
};
export default Graphic;
