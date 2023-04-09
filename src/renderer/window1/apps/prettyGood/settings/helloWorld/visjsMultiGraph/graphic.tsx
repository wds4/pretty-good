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

const Graphic2 = ({ nodes, edges, data }) => {
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
    const nOde = { id: 100, label: 'NODE 100' };
    nodes.update(nOde);
  }, [domNode, network, data, options]);

  return (
    <>
      <div
        style={{
          height: '500px',
          width: '100%',
          border: '1px solid purple',
          display: 'inline-block',
        }}
        ref={domNode}
      />
    </>
  );
};

const Graphic1 = ({ aNodes, aEdges }) => {
  const nodes = new DataSet(aNodes);
  const edges = new DataSet(aEdges);
  const data = {
    nodes,
    edges,
  };
  const network = {};
  const aAllNodes = nodes.getIds();

  const nODe = { id: 200, label: 'NODE 200' };
  nodes.update(nODe);

  const noDe = { id: 0, label: 'NODE 0' };
  nodes.update(noDe);

  return (
    <>
      <div style={{ display: 'inline-block', width: '25%' }}>
        <div>{JSON.stringify(aAllNodes)}</div>
        <Graphic2 nodes={nodes} edges={edges} data={data} />
      </div>
    </>
  );
};
export default Graphic1;
