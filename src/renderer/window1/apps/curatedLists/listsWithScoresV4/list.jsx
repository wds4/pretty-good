import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import Graphic from './graphic';
import RightPanel from './controlPanels/rightPanel';

export default class CuratorsOfIndividualList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aRatingsOfInstancesData: [],
      aEndorsementsOfCuratorsData: [],
      aCuratedListInstances: [],
    };
  }

  async componentDidMount() {
    const oListData = this.props.oListData;
    const parentConceptNostrEventID = oListData.event_id;

    const sql2 = ` SELECT * FROM ratingsOfCuratedListInstances WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aRatingsOfInstancesData = await asyncSql(sql2);
    this.setState( {aRatingsOfInstancesData} )

    const sql3 = ` SELECT * FROM endorsementsOfCurators WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aEndorsementsOfCuratorsData = await asyncSql(sql3);
    this.setState( {aEndorsementsOfCuratorsData} )

    const sql4 = ` SELECT * FROM curatedListInstances WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aCuratedListInstances = await asyncSql(sql4);
    this.setState({ aCuratedListInstances });
  }

  render() {
    return (
      <>
        <Graphic
          oListData={this.props.oListData}
          oMyNostrProfileData={this.props.oMyNostrProfileData}
          oNostrProfilesData={this.props.oNostrProfilesData}
          controlPanelSettings={this.props.controlPanelSettings}

          aRatingsOfInstancesData={this.state.aRatingsOfInstancesData}
          aEndorsementsOfCuratorsData={this.state.aEndorsementsOfCuratorsData}
          aCuratedListInstances={this.state.aCuratedListInstances}
        />
      </>
    );
  }
}
