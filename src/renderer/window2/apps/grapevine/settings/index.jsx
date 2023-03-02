import React from 'react';
import Masthead from '../../../mastheads/grapevineMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/grapevine/settings';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';

export default class GrapevineSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Grapevine: Settings';
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
            <div className="h4">Grapevine: Settings</div>
          </div>
        </div>
      </>
    );
  }
}
