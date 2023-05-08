import React from 'react';
import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/prettyGood/settings';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import GeneralSettings from './generalSettings';
import AllAppSettingsNav from './allAppSettingsNav';

export default class PrettyGoodSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Pretty Good: Settings';
    updateMastheadCenter(mastheadDescriptor);
  }

  processStateChange = (newState) => {
    console.log(`processStateChange callback; ${newState}`);
  };

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
            <GeneralSettings />
          </div>
        </div>
      </>
    );
  }
}
