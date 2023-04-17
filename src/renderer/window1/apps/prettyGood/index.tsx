import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
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
          <div id="mainPanel">
            <div className="h2">Welcome to the Pretty Good family of apps</div>

            <p>
              The motivation behind Pretty Good Apps is to apply the{' '}
              <NavLink to="/PrettyGoodHome/ThreadedTapestry">
                threaded tapestry
              </NavLink>{' '}
              (TT) model of decentralized knowledge representation and curation
              to the creation of a decentralized web of trust.
            </p>

            <p>
              The baseline app is a desktop nostr client,{' '}
              <NavLink to="/NostrHome/NostrMainFeed">pgnostr</NavLink>, with
              Twitter-like features similar to those of other nostr clients.
            </p>

            <p>
              The first application to differentiate Pretty Good Apps from other
              nostr clients is{' '}
              <NavLink to="/CuratedListsHome">Curated Lists</NavLink>.
            </p>

            <div className="h2">April 2023 status: *** still in alpha ***</div>

            <p>
              Once this app matures sufficiently, I hope to attract the
              attention of other dev teams and motivate them to incorporate the
              threaded tapestry model into their projects.
            </p>

            <p>
              After that, I hope to shift focus to a higher level, abstract
              overview of the threaded tapestry model.
            </p>
          </div>
        </div>
      </>
    );
  }
}
