import React, { useState, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import Masthead from '../../../../mastheads/pgMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/prettyGood/helloWorld';
import * as MiscAppFxns from '../../lib/app/misc.ts';

const { updateMainColWidth } = MiscAppFxns;

const { options } = VisStyleConstants;

export var nodes = new DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
  { id: 6, label: 'Node 6' },
  { id: 7, label: 'Node 7' },
  { id: 8, label: 'Node 8' },
]);

export var edges = new DataSet([
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 1, to: 5 },
  { from: 3, to: 6 },
  { from: 2, to: 7 },
  { from: 2, to: 8 },
]);

export var data = {
  nodes,
  edges,
};

export var network = {};

const NFG_Graphic = () => {
  /*
    var nodes_arr = [];
    var edges_arr = [];

    nodes = new DataSet(nodes_arr);
    edges = new DataSet(edges_arr);
    data = {
        nodes,
        edges
    };
    */

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

  return (
    <>
      <div
        style={{ height: '500px', width: '700px', border: '1px solid purple' }}
        ref={domNode}
      />
    </>
  );
};

export default class ExtendedFollowerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    document.getElementById('mastheadCenterContainer').innerHTML =
      'visjs hello world';
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <div id="mastheadElem">
            <Masthead />
          </div>
          <div id="mainPanel">
            <div>
              visjs hello world
              <NFG_Graphic />
            </div>
          </div>
        </div>
      </>
    );
  }
}
