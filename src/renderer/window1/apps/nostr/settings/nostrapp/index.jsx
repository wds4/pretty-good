import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from '../../../../lib/pg/ui';
import NostrApp from './nostrapp';

export default class ExtendedFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'NostrApp.link';
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
            <div className="h4">NostrApp</div>
            <NostrApp />
          </div>
        </div>
      </>
    );
  }
}
