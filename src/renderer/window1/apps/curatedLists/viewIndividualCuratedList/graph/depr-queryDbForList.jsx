import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';
import GrapevineVisualization from './grapevineVisualization';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
      aRatingsOfInstancesData: [],
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;

    const sql1 = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql1, 'get');
    this.setState({ oListData });

    /*
    const sql2 = ` SELECT * FROM ratingsOfCuratedListInstances WHERE parentConceptNostrEventID = '${curatedListFocusID}' `;
    const aRatingsOfInstancesData = await asyncSql(sql2);
    this.setState({ aRatingsOfInstancesData });

    aRatingsOfInstancesData={this.state.aRatingsOfInstancesData}
    */
  }

  render() {
    return (
      <>
        <GrapevineVisualization
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
        />
      </>
    );
  }
}
