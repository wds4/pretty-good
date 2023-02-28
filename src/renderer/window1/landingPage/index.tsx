import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from '../mastheads/pgMasthead';
import LeftNavbar1 from '../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../lib/pg/ui';
import { timeout } from '../lib/pg';

/*
This page was initially used as a temporary stop while startup functions were created, but those have been deprecated
Therefore probably can deprecate this page
*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'landing page';
    updateMastheadCenter(mastheadDescriptor);

    // e.click() doesn't work (in production) without an await here - don't know why
    await timeout(10);
    // const e = document.getElementById('pgHomeButton');
    const e = document.getElementById('nostrLandingPageButton');
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
          <div id="mastheadElem">
            <Masthead />
          </div>
          <div id="mainPanel">
            <NavLink to="/NostrHome/NostrLandingPage" id="nostrLandingPageButton">
              <div style={{ fontSize: '12px', lineHeight: '100%' }}>
                nostr landing page
              </div>
            </NavLink>
            <NavLink to="/PrettyGoodHome" id="pgHomeButton">
              <div style={{ fontSize: '12px', lineHeight: '100%' }}>
                pretty good home
              </div>
            </NavLink>

          </div>
        </div>
      </>
    );
  }
}
