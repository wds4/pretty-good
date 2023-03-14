import React from 'react';
import { NavLink } from 'react-router-dom';

export default class ConceptGraphLeftNavbar1 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel leftNavPanelCuratedLists">
          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            style={{ marginBottom: '20px' }}
            to="/PrettyGoodHome"
          >
            <div style={{ fontSize: '32px' }}>🦉</div>
            <div style={{ fontSize: '12px' }}>Pretty Good</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            to="/CuratedListsHome"
          >
            <div style={{ fontSize: '32px' }}>📃</div>
            <div style={{ fontSize: '12px' }}>Curated Lists</div>
          </NavLink>
        </div>
      </>
    );
  }
}
