import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/viewLists';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import SourceToggleSwitch from 'renderer/window1/apps/curatedLists/components/sourceToggleSwitch';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import AllLists from './allLists';

export default class ConceptGraphSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aListData: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'All Lists';
    updateMastheadCenter(mastheadDescriptor);

    const sql1 = ` SELECT * FROM curatedLists `;
    const aListData = await asyncSql(sql1);
    this.setState({ aListData });
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <div style={{ marginBottom: '5px' }}>
              <SourceToggleSwitch />
            </div>
            <AllLists aListData={this.state.aListData} />
          </div>
        </div>
      </>
    );
  }
}
