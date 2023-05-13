import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
      aListItemsData: [],
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;
    const sql = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql, 'get');
    this.setState({ oListData });

    // LOAD curatedListInstances
    const sql7 = 'SELECT * from curatedListInstances ';
    const aListItemsData = await asyncSql(sql7);
    this.setState({ aListItemsData });
  }

  render() {
    return (
      <>
        <List
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
          aListItemsData={this.state.aListItemsData}
        />
      </>
    );
  }
}
