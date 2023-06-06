import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nostr/settings';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import AllAppSettingsNav from 'renderer/window1/apps/prettyGood/settings/allAppSettingsNav';
// import CuratedListsMasterListener from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import CuratedListsMasterListener from 'renderer/window1/apps/nostr/listeners/curatedListsListenersRedo';

export default class NostrSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Settings';
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
            <AllAppSettingsNav />
            <CuratedListsMasterListener />
          </div>
        </div>
      </>
    );
  }
}
