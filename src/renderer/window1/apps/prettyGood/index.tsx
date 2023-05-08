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
          <div id="mainPanel">
            <div className="h2">Welcome to the Pretty Good family of apps</div>

            <p>
              The motivation behind Pretty Good Apps is to showcase the{' '}
              <NavLink to="/PrettyGoodHome/ThreadedTapestry">
                threaded tapestry
              </NavLink>{' '}
              model of <i>knowledge representation</i> and{' '}
              <i>knowledge curation</i> for distributed & decentralized networks.{' '}
              <NavLink to="/CuratedListsHome">Curated Lists</NavLink> will be
              the initial application to make full use of this model. The long
              term goal is for all projects in the decentralized web to apply
              the basic principles of this model, in one form or another. A high
              level overview of these principles is forthcoming.
            </p>

            <p>
              The baseline app is a desktop nostr client,{' '}
              <NavLink to="/NostrHome/NostrMainFeed">Pretty Good Nostr</NavLink>
              , with Twitter-like features similar to those of other nostr
              clients.
            </p>

            <div className="h2">May 2023 status: *** still in alpha ***</div>

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
