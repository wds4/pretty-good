import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { NavLink } from 'react-router-dom';

export default class PrettyGoodHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'home';
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
          <div id="mainPanel" style={{ paddingLeft: '20px' }}>
            <div className="h2">Welcome to the Pretty Good family of apps</div>

            <p>
              Pretty Good Apps was built as a test of{' '}
              <a
                href="https://github.com/wds4/DCoSL/tree/main"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                DCoSL: Decentralized Curation of Simple Lists
              </a>
              . The DCoSL protocol allows you to <i>crowdsource</i> a list to
              your web of trust in a way that is designed to resist sybil
              attacks and to generate{' '}
              <a
                href="https://github.com/wds4/DCoSL/blob/main/glossary/looseConsensus.md"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                loose consensus
              </a>
              .
            </p>

            <p>
              I don't claim DCoSL to be perfect. But I do think it's pretty
              good! Give it a spin, see how it works, and decide for yourself.
            </p>
          </div>
        </div>
      </>
    );
  }
}
