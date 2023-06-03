import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import GraphicRedo from './graphicRedo';
import RightPanel from './controlPanels/rightPanel';

export default class ListRedo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aRatingsOfInstancesData: [],
      aEndorsementsOfCuratorsData: [],
      aCuratedListInstances: [],
    };
  }

  async componentDidMount() {
    const parentConceptNostrEventID = this.props.curatedListEventId

    /*
    const sql2 = ` SELECT * FROM ratingsOfCuratedListInstances WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aRatingsOfInstancesData = await asyncSql(sql2);
    this.setState( {aRatingsOfInstancesData} )

    const sql3 = ` SELECT * FROM endorsementsOfCurators WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aEndorsementsOfCuratorsData = await asyncSql(sql3);
    this.setState( {aEndorsementsOfCuratorsData} )

    const sql4 = ` SELECT * FROM curatedListInstances WHERE parentConceptNostrEventID = '${parentConceptNostrEventID}' `;
    const aCuratedListInstances = await asyncSql(sql4);
    this.setState({ aCuratedListInstances });
    */
  }

  render() {
    return (
      <>
        <GraphicRedo
          controlPanelSettings={this.props.controlPanelSettings}
          curatedListEventId={this.props.curatedListEventId}
          oMyNostrProfileData={this.props.oMyNostrProfileData}
          oNostrProfilesData={this.props.oNostrProfilesData}
          oCuratedListData={this.props.oCuratedListData}
          oCuratedLists={this.props.oCuratedLists}
        />
      </>
    );
  }
}

