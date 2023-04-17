import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/about';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

export default class PrettyGoodAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'About';
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
            <div className="h4">Pretty Good: About</div>

            <p>
              The motivation behind Pretty Good Apps is to apply the{' '}
              <NavLink to="/PrettyGoodHome/ThreadedTapestry">
                threaded tapestry (TT)
              </NavLink>{' '}
              model of decentralized knowledge representation and curation to
              the creation of a decentralized web of trust.
            </p>

            <p>
              The impetus for the development of the TT model was, and continues
              to be, motivated by the desire to create a reputation system for
              the decentralized web. The TT model does not require lock-in to
              any particular choice of blockchain, token, platform, protocol,
              system of identifiers, etc. The long term goal is a web of trust
              ecosystem with multiple implementations of the TT model. Multiple
              users will be able to interact even when they are using distinct
              platforms, distinct identifiers, distinct programming languages,
              etc.
            </p>

            <p>
              As I build this app, I will also be working on a high level
              overview of the TT model, which I will make available here.
            </p>
          </div>
        </div>
      </>
    );
  }
}
