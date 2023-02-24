import React from 'react';
import Masthead from '../../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from '../../../../lib/pg/ui';
import EndorseRelays from './endorseRelays';

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
            <div className="h4">Nostr: Relays</div>
            <EndorseRelays />
          </div>
        </div>
      </>
    );
  }
}
