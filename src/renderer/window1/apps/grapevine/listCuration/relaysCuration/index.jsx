import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masthead from 'renderer/window1/mastheads/grapevineMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/grapevine/listCuration';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import GrapevineListener from 'renderer/window1/apps/nostr/listeners/grapevineListener';
import RelaysCalcAndVis from './calculationAndVisualization';
import GraphView from './graphView';
import TopControlPanel from './controlPanels/topControlPanel';
import RightPanel from './controlPanels/rightPanel';
import ShowSingleUserTrustScoreCalculations from './showSingleUserTrustScoreCalculations';

export default class RelaysCuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
      aRatingsData: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor =
      'Recommended Relays: Calculation and Visualization';
    updateMastheadCenter(mastheadDescriptor);

    const sql0 = ' SELECT * FROM myNostrProfile WHERE active = true ';
    const oMyNostrProfileData = await asyncSql(sql0,'get');
    // console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))
    this.setState({oMyNostrProfileData: oMyNostrProfileData})

    const sql1 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql1);
    // console.log("qwerty aNostrProfilesData; number: "+aNostrProfilesData.length)
    let oNostrProfilesData = {};
    for (let p=0;p<aNostrProfilesData.length;p++) {
      const oNostrProfileData = aNostrProfilesData[p];
      oNostrProfilesData[oNostrProfileData.pubkey] = oNostrProfileData;
    }
    this.setState({oNostrProfilesData: oNostrProfilesData})

    const sql2 = ' SELECT * FROM testnetListCurationRatings ';
    const aRatingsData = await asyncSql(sql2);
    // console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))
    this.setState({aRatingsData: aRatingsData})

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
            <div className="h4" style={{marginBottom:'10px'}}>Curation of Recommended Relays List by the Grapevine</div>
            <div style={{}}>
              <TopControlPanel />
            </div>
            <div style={{width:'100%',height:'500px'}}>
              <div style={{ display:'inline-block', width:'50%' }}>
                <GraphView
                  oMyNostrProfileData={this.state.oMyNostrProfileData}
                  oNostrProfilesData={this.state.oNostrProfilesData}
                  aRatingsData={this.state.aRatingsData}
                />
              </div>
              <div style={{ display:'inline-block', width:'50%', height:'500px' }}>
                <RightPanel />
              </div>
            </div>
            <GrapevineListener />
            <RelaysCalcAndVis />
          </div>
          <ShowSingleUserTrustScoreCalculations />
        </div>
      </>
    );
  }
}
