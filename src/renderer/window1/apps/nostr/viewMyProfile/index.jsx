import React from 'react';
import Masthead from '../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/nostr/profile';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import ViewMyProfile from './viewMyProfile';

export default class NostrProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Profile';
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
            <ViewMyProfile />
          </div>
        </div>
      </>
    );
  }
}
