import React from 'react';
import Masthead from 'renderer/window1/mastheads/nip51Masthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nip51/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import TableOfLists from './tableOfLists';

export default class TableOfListsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'NIP 51 Lists: Table';
    updateMastheadCenter(mastheadDescriptor);
    const setShowListBelowTable = () => {
      this.setState({showListBelowTable: true})
    }
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
            <TableOfLists />
          </div>
        </div>
      </>
    );
  }
}
