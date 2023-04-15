import React from 'react';
import Masthead from 'renderer/window1/mastheads/askNostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/askNostrNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/askNostr/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

export default class AskNostrHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Ask Nostr';
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
            <div style={{margin: '20px 50px 0px 50px'}}>
              Ask Nostr.
            </div>
          </div>
        </div>
      </>
    );
  }
}
