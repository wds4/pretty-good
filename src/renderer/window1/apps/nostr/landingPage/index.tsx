import React from 'react';
import { NavLink } from 'react-router-dom';
import { timeout } from 'renderer/window1/lib/pg';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import ChannelManagement from '../settings/channelManagement/channelManagement';

export default class NostrLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'nostr main feed'; // since landing page currently redirects immediately to main feed page
    updateMastheadCenter(mastheadDescriptor);

    // e.click() doesn't work (in production) without an await here - don't know why
    await timeout(1000);
    const e = document.getElementById('mainFeedButton');
    if (e) {
      e.click();
    }
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
            <NavLink to="/NostrHome/NostrMainFeed" id="mainFeedButton">
              <div style={{ fontSize: '12px', lineHeight: '100%' }}>
                nostr main feed
              </div>
            </NavLink>
            <div>Updating pubkey list for Channels ...</div>
            <div style={{display: 'none'}}>
              <ChannelManagement />
            </div>
          </div>
        </div>
      </>
    );
  }
}
