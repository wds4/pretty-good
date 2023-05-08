import React from 'react';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/helloWorld';
import Graphic from './graphic';

const aNodes0 = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
];

const aEdges0 = [{ from: 1, to: 2 }];

const aNodes1 = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
  { id: 6, label: 'Node 6' },
  { id: 7, label: 'Node 7' },
  { id: 8, label: 'Node 8' },
];

const aEdges1 = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 1, to: 5 },
  { from: 3, to: 6 },
  { from: 2, to: 7 },
  { from: 2, to: 8 },
];

const aNodes2 = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
];

const aEdges2 = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
];

export default class VisjsHelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aNodes0: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
      ],
      aEdges0: [{ from: 1, to: 2 }],
      aNodes1: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' },
        { id: 6, label: 'Node 6' },
        { id: 7, label: 'Node 7' },
        { id: 8, label: 'Node 8' },
      ],
      aEdges1: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 1, to: 5 },
        { from: 3, to: 6 },
        { from: 2, to: 7 },
        { from: 2, to: 8 },
      ],
      aNodes2: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
      ],
      aEdges2: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
      ],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Visjs, multi graphs: Hello World';
    updateMastheadCenter(mastheadDescriptor);
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <div className="h4">visjs with multiple editable graphs</div>
            <Graphic aNodes={this.state.aNodes0} aEdges={this.state.aEdges0} />
            <Graphic aNodes={this.state.aNodes1} aEdges={this.state.aEdges1} />
            <Graphic aNodes={this.state.aNodes2} aEdges={this.state.aEdges2} />
          </div>
        </div>
      </>
    );
  }
}
