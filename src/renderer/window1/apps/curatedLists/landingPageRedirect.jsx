import React from 'react';
import { NavLink } from 'react-router-dom';
import { timeout } from 'renderer/window1/lib/pg';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/viewLists';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';

/*
This page automatically redirects to the Curated Lists main page.
Its purpose is to provide a mechanism for the user to refresh that page:
a NavLink on that page to this page, which then automatically redirects back
to that page. Refreshing that page may be useful to reload curated list data from SQL.
Eventually that won't be necessary, once the curated lists redux store is working as intended.
*/

export default class CuratedListsLandingPageRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Curated Lists';
    updateMastheadCenter(mastheadDescriptor);

    await timeout(1000);
    const e = document.getElementById('curatedListsMainPageButton');
    if (e) {
      e.click();
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
            <div style={{ margin: '20px 50px 0px 50px' }}>
              This page should auto redirects to
              <NavLink
                to="/CuratedListsHome/CuratedListsWithScoresV8"
                id="curatedListsMainPageButton"
              >
              <div style={{ fontSize: '12px', lineHeight: '100%' }}>
                curated lists main page
              </div>
            </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}
