import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from 'renderer/window1/mastheads/nip51Masthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/nip51/home';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import Kind10001Lists from './kind10001Lists';

export default class Kind10001ListsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'NIP 51 kind 10001 Lists';
    updateMastheadCenter(mastheadDescriptor);
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
            <Kind10001Lists />
          </div>
        </div>
      </>
    );
  }
}
