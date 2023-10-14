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
          <div id="mainPanel" style={{ paddingLeft: '20px', fontSize: '20px' }}>
            <div className="h2">Welcome to the Pretty Good family of apps</div>

            <p>
              Pretty Good Apps exists for one purpose: to experiment with different ways to
              bring WEB OF TRUST to nostr!!
            </p>

            <p>
              Strategy: build on the successes of NIP-51, which describes LISTS, with the
              goal of giving Alice the ability to
               delegate list curation to her web of trust via the{' '}
              <a
                href="https://github.com/wds4/DCoSL/tree/main"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                DCoSL protocol
              </a>{' '}
              (Decentralized Curation of Simple Lists).
              DCoSL is designed to allow users to <i>crowdsource</i> a list to
              one's web of trust in a way that is designed to resist sybil
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
              STEP 1: the NIP-51 Lists app, including support for nostr's "a"-tag which allows Alice
              to create a list composed of other lists by other users. I consider this to be a "minor" milestone
              on the road towards WoT. It is possible today, with no changes to the nostr protocol.
              I hope to see more devs add support for the a-tag to NIP-51 lists!
            </p>

            <p>
              STEP 2: the Curated Lists app which provides full support for DCoSL. I consider this to be
              a much more sophisticated and powerful implementation of WoT, but also requires much more
              at the protocol level.
            </p>
          </div>
        </div>
      </>
    );
  }
}
