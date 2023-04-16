import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/about';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

export default class TribalTapestry extends React.Component {
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
            <div className="h4">the Threaded Tapestry Model</div>
            <p>
              The Threaded Tapestry model is a model of knowledge representation
              and curation for distributed, decentralized systems, such as the
              decentralized web or the cerebral cortex.
            </p>

            <p>
              The impetus for the development of the TT model was, and continues
              to be, my attempts at building a reputation system for the
              decentralized web.
            </p>

            <p>
              As I build this app, I will also be working on a high level
              overview of the TT model, which I will make available on this app.
            </p>
          </div>
        </div>
      </>
    );
  }
}
