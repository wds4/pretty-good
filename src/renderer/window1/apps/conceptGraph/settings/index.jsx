import React from 'react';
import Masthead from 'renderer/window1/mastheads/cgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/conceptGraph/settings';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import AllAppSettingsNav from 'renderer/window1/apps/prettyGood/settings/allAppSettingsNav';

export default class ConceptGraphSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Concept Graph: Settings';
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
            <AllAppSettingsNav />
          </div>
        </div>
      </>
    );
  }
}
