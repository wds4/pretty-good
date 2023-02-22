import React from 'react';
import Masthead from 'renderer/window1/mastheads/nostrMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { fetchAllMyNostrProfilesFromSql } from 'renderer/window1/lib/pg/sql';
import AllCurrentProfiles from './allCurrentProfiles';
import GenerateNewKeys from './generateNewKeys';
import EnterExternalKeys from './enterExternalKeys';

export default class NostrProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aMyProfileData: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: My Profiles';
    updateMastheadCenter(mastheadDescriptor);

    const aMyProfileData = await fetchAllMyNostrProfilesFromSql();
    this.setState({ aMyProfileData });
  }

  updateMyProfile = (index) => {
    console.log(`updateMyProfile reached; index: ${index}`);
    const aMyProfileDataUpdated = JSON.parse(
      JSON.stringify(this.state.aMyProfileData)
    );
    for (let i = 0; i < aMyProfileDataUpdated.length; i += 1) {
      aMyProfileDataUpdated[i].active = false;
    }
    aMyProfileDataUpdated[index].active = true;
    this.setState({ aMyProfileData: aMyProfileDataUpdated });
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
              aMyProfileData={this.state.aMyProfileData}
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
