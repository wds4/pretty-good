import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';
import ListPre from './listPre';
import ListNamesOnly from './listNamesOnly';
import ControlPanel from './controlPanels/rightPanel/controlPanel';
import ListSelectButton from './listSelectButton';

export default class ListsWithScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aListsData: [],
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
    };
  }

  async componentDidMount() {
    const sql1 = ` SELECT * FROM curatedLists `;
    const aListsData = await asyncSql(sql1);
    this.setState({ aListsData });

    const sql2 = ' SELECT * FROM myNostrProfile WHERE active = true ';
    const oMyNostrProfileData = await asyncSql(sql2, 'get');
    this.setState({ oMyNostrProfileData });

    const sql3 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql3);
    const oNostrProfilesData = {};
    for (let p = 0; p < aNostrProfilesData.length; p++) {
      const oNostrProfileData = aNostrProfilesData[p];
      oNostrProfilesData[oNostrProfileData.pubkey] = oNostrProfileData;
    }
    this.setState({ oNostrProfilesData });
  }

  render() {
    return (
      <>
        <div
          style={{
            display: 'none',
            width: '400px',
            maxHeight: '400px',
            border: '1px solid black',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          <div className="h4">Control Panel</div>
          <ControlPanel />
        </div>

        <div
          style={{
            display: 'inline-block',
            width: '35%',
            padding: '10px',
            height: '500px',
            overflow: 'scroll',
          }}
        >
          <center>Lists</center>
          {this.state.aListsData.map((oListData) => {
            return (
              <>
                <div>
                  <ListSelectButton oListData={oListData} />
                </div>
              </>
            );
          })}
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '60%',
            height: '500px',
            overflow: 'scroll',
            textAlign: 'center',
          }}
        >
          {this.state.aListsData.map((oListData) => {
            return (
              <>
                <ListPre
                  controlPanelSettings={this.props.controlPanelSettings}
                  oListData={oListData}
                  oMyNostrProfileData={this.state.oMyNostrProfileData}
                  oNostrProfilesData={this.state.oNostrProfilesData}
                />
              </>
            );
          })}
        </div>
      </>
    );
  }
}
