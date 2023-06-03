import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/prettyGood/settings';
import { updateMainColWidth, updateMastheadCenter } from '../../../../lib/pg/ui';

export default class PrettyGoodSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'IPFS (heavyweight) Settings';
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
            <div className="h4">IPFS (heavyweight) Settings</div>
          </div>
        </div>
      </>
    );
  }
}
