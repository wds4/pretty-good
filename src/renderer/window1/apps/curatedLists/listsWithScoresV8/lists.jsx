import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';
import ListPre from './listPre';
import ListNamesOnly from './listNamesOnly';
import ControlPanel from './controlPanels/rightPanel/controlPanel';
import ListSelectButton from './listSelectButton';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds/techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds/techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds/techDetailsForNostrNerds3';
import TechDetailsForNostrNerds4 from './techDetailsForNostrNerds/techDetailsForNostrNerds4';
import ListsAndControlPanel from './listsAndControlPanel';

export const ListsWithScores2 = ({
  controlPanelSettings,
  oMyNostrProfileData,
  oNostrProfilesData,
  aListsData,
}) => {
  /*
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  */
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          width: '63%',
          maxHeight: '600px',
          overflow: 'scroll',
          textAlign: 'center',
        }}
      >
        {aListsData.map((oListData) => {
          return (
            <>
              <ListPre
                controlPanelSettings={controlPanelSettings}
                oListData={oListData}
                oMyNostrProfileData={oMyNostrProfileData}
                oNostrProfilesData={oNostrProfilesData}
              />
            </>
          );
        })}
      </div>
    </>
  );
};
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
        <div>
          <div
            style={{
              display: 'inline-block',
              width: '35%',
              padding: '10px',
              maxHeight: '600px',
              overflow: 'scroll',
            }}
          >
            <ListsAndControlPanel
              aListsData={this.state.aListsData}
            />
          </div>

          <ListsWithScores2
            controlPanelSettings={this.props.controlPanelSettings}
            oMyNostrProfileData={this.state.oMyNostrProfileData}
            oNostrProfilesData={this.state.oNostrProfilesData}
            aListsData={this.state.aListsData}
          />
        </div>
        <TechDetailsForNostrNerds1 />
        <TechDetailsForNostrNerds2 aListData={this.state.aListsData} />
        <TechDetailsForNostrNerds3 aListData={this.state.aListsData} />
        <TechDetailsForNostrNerds4 aListData={this.state.aListsData} />
      </>
    );
  }
}
