import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { fetchAllMyNostrProfilesFromSql } from 'renderer/window1/lib/pg/sql';
import AllCurrentProfiles from './allCurrentProfiles';
import GenerateNewKeys from './generateNewKeys';
import EnterExternalKeys from './enterExternalKeys';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';

export default class NostrProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aMyProfilesData: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: My Profiles';
    updateMastheadCenter(mastheadDescriptor);

    const aMyProfilesData = await fetchAllMyNostrProfilesFromSql();
    if (aMyProfilesData) { this.setState({ aMyProfilesData }); }
  }

  updateMyProfile = (index) => {
    console.log(`updateMyProfile reached; index: ${index}`);
    const aMyProfilesDataUpdated = JSON.parse(
      JSON.stringify(this.state.aMyProfilesData)
    );
    for (let i = 0; i < aMyProfilesDataUpdated.length; i += 1) {
      aMyProfilesDataUpdated[i].active = false;
    }
    aMyProfilesDataUpdated[index].active = true;

    this.setState({ aMyProfilesData: aMyProfilesDataUpdated });
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
            <AllCurrentProfiles
              aMyProfilesData={this.state.aMyProfilesData}
              updateMyProfile={this.updateMyProfile}
            />
            <GenerateNewKeys />
            <EnterExternalKeys />
          </div>
        </div>
      </>
    );
  }
}
