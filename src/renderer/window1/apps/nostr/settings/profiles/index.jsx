import React from 'react';
import Masthead from '../../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/nostr/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from '../../../../lib/pg/ui';
import AllCurrentProfiles from './allCurrentProfiles';
import GenerateNewKeys from './generateNewKeys';
import EnterExternalKeys from './enterExternalKeys';
import { fetchAllMyNostrProfilesFromSql } from '../../../../lib/pg/sql';

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
