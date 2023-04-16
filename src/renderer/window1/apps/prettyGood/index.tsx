import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

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
              <span style={{ color: 'grey' }}>threaded tapestry (TT)</span>{' '}
              model of decentralized knowledge representation and curation.
            </p>

            <p>
              The baseline app will be a desktop nostr client, with features
              similar to other nostr clients.
            </p>

            <p>
              The first application to use the TT model will be Curated
              Lists. This is perhaps the simplest possible demonstration of the
              TT model. It will demonstrates decentralized knowledge representation (the
              concept graph, with a list being the most primitive example of a
              concept) and decentralized knowledge curation (using the grapevine).
            </p>

            <div className="h2">April 2023 status: *** still in alpha ***</div>

            <p>
              Once this reaches beta, I hope to attract the attention of other
              dev teams and motivate them to incorporate the threaded tapestry
              model into their projects. Once this is achieved, I will shift
              focus to an academic treatement of the threaded tapestry model.
            </p>

            <p>Choose an app on the left, at varying stages of construction.</p>
          </div>
        </div>
      </>
    );
  }
}
