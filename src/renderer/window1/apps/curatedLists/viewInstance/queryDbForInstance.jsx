import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';
import Instance from './instance';

export default class QueryDbForInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oInstanceSqlData: {},
    };
  }

  async componentDidMount() {
    const { curatedListInstanceFocusID } = this.props;
    const sql = ` SELECT * FROM curatedListInstances WHERE event_id = '${curatedListInstanceFocusID}' `;
    const oInstanceSqlData = await asyncSql(sql, 'get');
    this.setState({ oInstanceSqlData });
  }

  render() {
    return (
      <>
        <Instance
          curatedListInstanceFocusID={this.props.curatedListInstanceFocusID}
          oInstanceSqlData={this.state.oInstanceSqlData}
        />
      </>
    );
  }
}
