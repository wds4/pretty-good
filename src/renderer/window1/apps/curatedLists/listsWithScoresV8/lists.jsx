import React from 'react';
import { useSelector } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import ListPre from './listPre';
import ListPreRedo from './listPreRedo';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds/techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds/techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds/techDetailsForNostrNerds3';
import TechDetailsForNostrNerds4 from './techDetailsForNostrNerds/techDetailsForNostrNerds4';
import ListsAndControlPanel from './listsAndControlPanel';

export const DataFromRedux = ({
  controlPanelSettings,
  oMyNostrProfileData,
  oNostrProfilesData,
  aCuratedLists,
  oCuratedLists,
  devMode,
}) => {
  if (devMode) {
    return (
      <>
        <div
          style={{
            textAlign: 'left',
            fontSize: '12px',
          }}
        >
          {aCuratedLists.map((curatedListEventId) => {
            const oCuratedListData = oCuratedLists[curatedListEventId];
            return (
              <>
                <ListPreRedo
                  controlPanelSettings={controlPanelSettings}
                  oMyNostrProfileData={oMyNostrProfileData}
                  oNostrProfilesData={oNostrProfilesData}
                  curatedListEventId={curatedListEventId}
                  oCuratedListData={oCuratedListData}
                  oCuratedLists={oCuratedLists}
                />
              </>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
};

export const DataFromSql = ({
  controlPanelSettings,
  oMyNostrProfileData,
  oNostrProfilesData,
  aListsData,
  devMode,
}) => {
  if (devMode) {
    return (
      <>
        <div
          style={{
            textAlign: 'left',
            fontSize: '12px',
          }}
        >
          {aListsData.map((oListData) => {
            return (
              <>
                <div>
                  <ListPre
                    controlPanelSettings={controlPanelSettings}
                    oListData={oListData}
                    oMyNostrProfileData={oMyNostrProfileData}
                    oNostrProfilesData={oNostrProfilesData}
                  />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
};

export const ListsWithScores2 = ({
  controlPanelSettings,
  oMyNostrProfileData,
  oNostrProfilesData,
  aListsData,
  oCuratedLists,
}) => {
  const aCuratedLists = Object.keys(oCuratedLists);
  const { devMode4, devMode5 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          width: '63%',
          maxHeight: '800px',
          overflow: 'scroll',
          textAlign: 'center',
        }}
      >
        <DataFromRedux
          controlPanelSettings={controlPanelSettings}
          oMyNostrProfileData={oMyNostrProfileData}
          oNostrProfilesData={oNostrProfilesData}
          aCuratedLists={aCuratedLists}
          oCuratedLists={oCuratedLists}
          devMode={devMode5}
        />

        <DataFromSql
          controlPanelSettings={controlPanelSettings}
          oMyNostrProfileData={oMyNostrProfileData}
          oNostrProfilesData={oNostrProfilesData}
          aListsData={aListsData}
          devMode={devMode4}
        />
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
      oCuratedLists: {},
    };
  }

  async componentDidMount() {
    // in process of replacing aListsData from SQL with oCuratedLists from redux
    // const oCuratedLists = this.props.oCuratedLists;
    // this.setState({ oCuratedLists });

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
              maxHeight: '800px',
              overflow: 'scroll',
            }}
          >
            <ListsAndControlPanel
              aListsData={this.state.aListsData}
              oCuratedLists={this.props.oCuratedLists}
            />
          </div>

          <ListsWithScores2
            controlPanelSettings={this.props.controlPanelSettings}
            oMyNostrProfileData={this.state.oMyNostrProfileData}
            oNostrProfilesData={this.state.oNostrProfilesData}
            aListsData={this.state.aListsData}
            oCuratedLists={this.props.oCuratedLists}
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
