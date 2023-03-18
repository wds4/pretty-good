import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import Overview from './overview';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;
    const sql = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql, 'get');
    this.setState({ oListData });
  }

  render() {
    return (
      <>
        <Overview
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
        />
      </>
    );
  }
}
