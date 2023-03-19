import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import Overview from './selectCurators';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
      oProfileFocusSqlData: {},
    };
  }

  async componentDidMount() {
    const { curatedListFocusID, curatedListProfileFocusID } = this.props;
    const sql1 = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql1, 'get');
    this.setState({ oListData });

    const sql2 = ` SELECT * FROM nostrProfiles WHERE pubkey = '${curatedListProfileFocusID}' `;
    const oProfileFocusSqlData = await asyncSql(sql2, 'get');
    this.setState({ oProfileFocusSqlData });
  }

  render() {
    return (
      <>
        <Overview
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
          curatedListProfileFocusID={this.props.curatedListProfileFocusID}
          oProfileFocusSqlData={this.state.oProfileFocusSqlData}
        />
      </>
    );
  }
}
