import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import Instance from './instance';

export default class QueryDbForInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListSqlData: {},
      oInstanceSqlData: {},
    };
  }

  async componentDidMount() {
    const { curatedListFocusID, curatedListInstanceFocusID } = this.props;

    const sql1 = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListSqlData = await asyncSql(sql1, 'get');
    this.setState({ oListSqlData });

    const sql2 = ` SELECT * FROM curatedListInstances WHERE event_id = '${curatedListInstanceFocusID}' `;
    const oInstanceSqlData = await asyncSql(sql2, 'get');
    this.setState({ oInstanceSqlData });
  }

  render() {
    return (
      <>
        <Instance
          curatedListInstanceFocusID={this.props.curatedListInstanceFocusID}
          curatedListFocusID={this.props.curatedListFocusID}
          oListSqlData={this.state.oListSqlData}
          oInstanceSqlData={this.state.oInstanceSqlData}
        />
      </>
    );
  }
}
