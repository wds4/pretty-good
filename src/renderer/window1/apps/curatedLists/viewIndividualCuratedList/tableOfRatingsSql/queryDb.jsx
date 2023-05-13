import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
      aRatingsOfCuratedListItemsData: [],
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;
    const sql = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql, 'get');
    this.setState({ oListData });

    // LOAD ratingsOfCuratedListInstances
    const sql8 = 'SELECT * from ratingsOfCuratedListInstances ';
    const aRatingsOfCuratedListItemsData = await asyncSql(sql8);
    this.setState({ aRatingsOfCuratedListItemsData });

  }

  render() {
    return (
      <>
        <List
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
          aRatingsOfCuratedListItemsData={this.state.aRatingsOfCuratedListItemsData}
        />
      </>
    );
  }
}
