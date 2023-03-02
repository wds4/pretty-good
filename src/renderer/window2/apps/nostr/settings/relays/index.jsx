import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
// import EndorseRelays from './endorseRelays';
import Relays from './relays';
import AddNewRelay from './addNewRelay';
import FollowingForRelays from './followingForRelays';
import RelaysAutoUpdateControls from './relaysAutoUpdateControls';
// import ToggleRelaysAutoUpdate from 'renderer/window1/components/toggleSwitch';

export default class NostrRelays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Relays';
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
            <div className="h3" style={{marginBottom: '5px' }}>Nostr: Relays</div>
            <div style={{ display: 'inline-block',  width:'48%', border: '1px dashed grey' }}>
              <RelaysAutoUpdateControls />
              <Relays />
              <AddNewRelay />
            </div>
            <div style={{ display: 'inline-block', width:'48%', border: '1px dashed grey' }}>
              <FollowingForRelays />
            </div>
          </div>
        </div>
      </>
    );
  }
}
