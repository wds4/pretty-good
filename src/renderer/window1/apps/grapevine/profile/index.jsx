import React from 'react';
import Masthead from '../../../mastheads/grapevineMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/grapevine/profile';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';

export default class GrapevineProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Grapevine: Profile';
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
            <div className="h4">Grapevine: Profile</div>
          </div>
        </div>
      </>
    );
  }
}
