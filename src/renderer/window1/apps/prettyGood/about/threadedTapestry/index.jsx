import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/about';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

export default class ThreadedTapestry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Threaded Tapestry';
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
            <div className="h2">the Threaded Tapestry Model</div>
            <p>
              The Threaded Tapestry model is a model of knowledge representation
              and curation for distributed, decentralized systems, such as the
              decentralized web or the cerebral cortex. This model can be
              broken down into two components: decentralized knowledge
              representation and decentralized knowledge curation.
            </p>

            <div style={{fontSize: '22px'}}>decentralized knowledge representation</div>

            <p>(...)</p>

            <div style={{fontSize: '22px'}}>decentralized knowledge curation</div>

            <p>(...)</p>

          </div>
        </div>
      </>
    );
  }
}
