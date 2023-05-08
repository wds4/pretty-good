import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/emptyNavbar';
import { useDispatch } from 'react-redux';
import { updateCurrentApp } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

const AppsNavPage = () => {
  const dispatch = useDispatch();
  return (
    <>
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
                onClick={() => {
                  dispatch(updateCurrentApp('prettyGood'));
                }}
              >
                <center>Pretty Good</center>
                <div className="appsLargeIconEmoji">🦉</div>
              </NavLink>

              <NavLink
                className="pgAppSquareButton"
                exact
                activeClassName="active"
                to="/ConceptGraphHome"
                onClick={() => {
                  dispatch(updateCurrentApp('conceptGraph'));
                }}
              >
                <center>Concept Graph</center>
                <div className="appsLargeIconEmoji">🧠</div>
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
                onClick={() => {
                  dispatch(updateCurrentApp('grapevine'));
                }}
              >
                <center>The Grapevine</center>
                <div className="appsLargeIconEmoji">🍇</div>
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
                className="pgAppSquareButton plexAppSquareActiveButton"
                exact
                activeClassName="active"
                to="/CuratedListsHome"
                onClick={() => {
                  dispatch(updateCurrentApp('curatedLists'));
                }}
              >
                <center>Curated Lists</center>
                <div className="appsLargeIconEmoji">📃</div>
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
              onClick={() => {
                dispatch(updateCurrentApp('nostr'));
              }}
            >
              <center>nostr</center>
              <div className="appsLargeIconEmoji">🪶</div>
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
              className="pgAppSquareButton plexAppSquareActiveButton"
              exact
              activeClassName="active"
              to="/AskNostrHome"
              onClick={() => {
                dispatch(updateCurrentApp('askNostr'));
              }}
            >
              <center>Ask Nostr</center>
              <div className="appsLargeIconEmoji">❓</div>
            </NavLink>
          </center>

          <div className="h3">misc</div>
          <center>
            <NavLink
              className="pgAppSquareButton"
              exact
              activeClassName="active"
              to="/EBooksHome"
              onClick={() => {
                dispatch(updateCurrentApp('eBooks'));
              }}
            >
              <center>eBooks</center>
            </NavLink>
          </center>
        </div>
      </center>
    </>
  );
};

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
            <AppsNavPage />
          </div>
        </div>
      </>
    );
  }
}
