import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from '../../../../lib/pg/ui';
import ExtendedFollowingCalculation from './extendedFollowingCalculation';

export default class ExtendedFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Extended Following List';
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
            <div className="h4">Nostr: Extended Following list</div>
            <ExtendedFollowingCalculation />
          </div>
        </div>
      </>
    );
  }
}
