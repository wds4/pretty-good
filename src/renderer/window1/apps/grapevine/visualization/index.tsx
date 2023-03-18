import React from 'react';
import Masthead from '../../../mastheads/grapevineMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/grapevine/home';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
// import GrapevineVisualizationMainPage from './grapevineVisualizationMainPage';
import ReduxInterfaceComponent from './reduxInterfaceComponent';
import GrapevineListener from 'renderer/window1/apps/nostr/listeners/grapevineListener';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Grapevine Visualization';
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
            <GrapevineListener />
            <ReduxInterfaceComponent />
          </div>
        </div>
      </>
    );
  }
}
