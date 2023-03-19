import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/curatedListsNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/instance';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import QueryReduxForInstance from './queryReduxForInstance';

export default class CuratedListSpecificInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Specific Instance';
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
            <QueryReduxForInstance />
          </div>
        </div>
      </>
    );
  }
}
