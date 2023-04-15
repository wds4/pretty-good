import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import GlobalFeed from './globalFeed';
import SourceToggleSwitch from 'renderer/window1/apps/curatedLists/components/sourceToggleSwitch';

export default class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Main Feed';
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
            <div style={{ marginBottom: '5px' }}>
              <SourceToggleSwitch />
            </div>
            <GlobalFeed />
          </div>
        </div>
      </>
    );
  }
}
