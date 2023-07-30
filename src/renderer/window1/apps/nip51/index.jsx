import React from 'react';
import Masthead from 'renderer/window1/mastheads/nip51Masthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nip51/home';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class NostrHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'NIP-51 Lists: Home';
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
            <div className="h4">NIP-51 Lists: Home</div>
          </div>
        </div>
      </>
    );
  }
}
