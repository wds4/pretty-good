import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
const { options } = VisStyleConstants;

export let nodes = new DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
]);

export let edges = new DataSet([
  { from: 1, to: 2 },

]);

export let data = {
  nodes,
  edges,
};

export let network = {};

const populateProfileInfoContainer = () => {
  var oNxtEdge = {from: 3, to: 4}
    edges.update(oNxtEdge)
  }

const Graphic = () => {
  const domNode = useRef(null);

  network = useRef(null);

  useEffect(() => {
    network.current = new Network(domNode.current, data, options);
    // network.current.fit();

    network.current.on("hoverNode", function (params) {
      console.log("hoverNode Event:", params);
      console.log("hoverNode Event: params.node: ", params.node);
      var nodeID = params.node;
      var aAllNodes = nodes.getIds()
      // populateProfileInfoContainer()
    });

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

  populateProfileInfoContainer()

  return (
    <>
      <div
        style={{ height: '500px', width: '700px', border: '1px solid purple' }}
        ref={domNode}
      />
    </>
  );
};

const GraphViewFollowing = () => {
  return (
    <>
      Following
      <Graphic />
    </>
  );
};
export default GraphViewFollowing;
