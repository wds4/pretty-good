import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';

export default class QueryDbForList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oListData: {},
      aEndorsementsOfCuratorsData: [],
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;
    const sql = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql, 'get');
    this.setState({ oListData });

     // LOAD endorsementsOfCurators
    const sql9 = 'SELECT * from endorsementsOfCurators ';
    const aEndorsementsOfCuratorsData = await asyncSql(sql9);
    this.setState({ aEndorsementsOfCuratorsData });
  }

  render() {
    return (
      <>
        <List
          curatedListFocusID={this.props.curatedListFocusID}
          oListData={this.state.oListData}
          aEndorsementsOfCuratorsData={this.state.aEndorsementsOfCuratorsData}
        />
      </>
    );
  }
}
