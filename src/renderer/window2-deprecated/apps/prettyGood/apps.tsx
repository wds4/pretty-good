import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from '../../mastheads/pgMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class PrettyGoodApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'the Pretty Good family of decentralized apps';
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
            <center>
              <div
                style={{
                  display: 'inline-block',
                  width: '1050px',
                  textAlign: 'left',
                  marginTop: '20px',
                }}
              >
                <div className="h3">infrastructure / under the hood</div>
                <center>
                  <div style={{ display: 'inline-block' }}>
                    <NavLink
                      className="pgAppSquareButton"
                      exact
                      activeClassName="active"
                      to="/PrettyGoodHome"
                    >
                      <center>Pretty Good</center>
                      <center>(umbrella app)</center>
                    </NavLink>

                    <NavLink
                      className="pgAppSquareButton"
                      exact
                      activeClassName="active"
                      to="/ConceptGraphHome"
                    >
                      <center>Concept Graph</center>
                    </NavLink>

                    <NavLink
                      className="pgAppSquareButton plexAppSquareInactiveButton"
                      exact
                      activeClassName="active"
                      to="/"
                    >
                      <center>Ontologies</center>
                    </NavLink>

                    <NavLink
                      className="pgAppSquareButton"
                      exact
                      activeClassName="active"
                      to="/GrapevineHome"
                    >
                      <center>The Grapevine</center>
                    </NavLink>
                  </div>
                </center>

                <br />

                <div className="h3">new types of apps</div>
                <center>
                  <div style={{ display: 'inline-block', textAlign: 'left' }}>
                    <NavLink
                      className="pgAppSquareButton plexAppSquareInactiveButton"
                      exact
                      activeClassName="active"
                      to="/"
                    >
                      <center>Crowdscreened Groups</center>
                    </NavLink>

                    <NavLink
                      className="pgAppSquareButton plexAppSquareInactiveButton"
                      exact
                      activeClassName="active"
                      to="/"
                    >
                      <center>Proof of Humanity</center>
                    </NavLink>

                    <NavLink
                      className="pgAppSquareButton plexAppSquareInactiveButton"
                      exact
                      activeClassName="active"
                      to="/"
                    >
                      <center>List Curation</center>
                    </NavLink>
                  </div>
                </center>

                <br />

                <div className="h3">old style</div>
                <center>
                  <NavLink
                    className="pgAppSquareButton"
                    exact
                    activeClassName="active"
                    to="/NostrHome"
                  >
                    <center>nostr</center>
                  </NavLink>

                  <NavLink
                    className="pgAppSquareButton plexAppSquareInactiveButton"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    <center>Search</center>
                  </NavLink>

                  <NavLink
                    className="pgAppSquareButton plexAppSquareInactiveButton"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    <center>Readit</center>
                  </NavLink>

                  <NavLink
                    className="pgAppSquareButton plexAppSquareInactiveButton"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    <center>RSS Feeds</center>
                  </NavLink>

                  <NavLink
                    className="pgAppSquareButton plexAppSquareInactiveButton"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    <center>Ask PG: decentralized Questions & Answers</center>
                  </NavLink>
                </center>
              </div>
            </center>
          </div>
        </div>
      </>
    );
  }
}
