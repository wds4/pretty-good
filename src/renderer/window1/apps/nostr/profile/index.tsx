import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/emptyNavbar';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import CuratorEndorsements from 'renderer/window1/apps/nostr/listeners/curatedListsListeners/curatorEndorsements';
import Profile from './profile';

export default class NostrViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'nostr: view profile';
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
          <div id="mastheadElem">
            <Masthead />
          </div>
          <div id="mainPanel">
            <Profile />
            <CuratorEndorsements />
          </div>
        </div>
      </>
    );
  }
}
