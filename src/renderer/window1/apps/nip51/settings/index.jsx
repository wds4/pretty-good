import React from 'react';

import Masthead from 'renderer/window1/mastheads/nip51Masthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nip51/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import AllAppSettingsNav from 'renderer/window1/apps/prettyGood/settings/allAppSettingsNav';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import ListsSettings from './listsSettings';

export default class GrapevineSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aNip51ListsData: []
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'NIP 51 Lists: Settings';
    updateMastheadCenter(mastheadDescriptor);

    const sql10 = 'SELECT * from nip51Lists ';
    const aNip51ListsData = await asyncSql(sql10);
    this.setState({aNip51ListsData});
  }

  //

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
            <ListsSettings aNip51ListsData={this.state.aNip51ListsData} />
          </div>
        </div>
      </>
    );
  }
}
