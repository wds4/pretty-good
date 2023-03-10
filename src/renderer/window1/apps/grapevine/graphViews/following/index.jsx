import React from 'react';
import Masthead from 'renderer/window1/mastheads/grapevineMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/grapevine/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import GraphViewFollowing from './following';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';

export default class GraphViewMyFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oMyNostrProfileData: {},
      aNostrProfilesData: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Graphical View: My Following List';
    updateMastheadCenter(mastheadDescriptor);

    const sql0 = ' SELECT * FROM myNostrProfile WHERE active = true ';
    const oMyNostrProfileData = await asyncSql(sql0,'get');
    // console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))
    this.setState({oMyNostrProfileData: oMyNostrProfileData})

    const sql1 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql1);
    // console.log("qwerty aNostrProfilesData; number: "+aNostrProfilesData.length)
    this.setState({aNostrProfilesData: aNostrProfilesData})
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
            <div className="h4">Graphical View: My Following List</div>
            <GraphViewFollowing
              oMyNostrProfileData={this.state.oMyNostrProfileData}
              aNostrProfilesData={this.state.aNostrProfilesData}
            />
          </div>
        </div>
      </>
    );
  }
}
