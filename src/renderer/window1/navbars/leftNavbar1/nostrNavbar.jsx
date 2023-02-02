import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NostrLeftNavbar1 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel leftNavPanelNostr">
          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            style={{ marginBottom: '20px' }}
            to="/PrettyGoodHome"
          >
            <div style={{ fontSize: '32px' }}>✔</div>
            <div style={{ fontSize: '12px' }}>Pretty Good</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            to="/NostrHome/NostrLandingPage"
          >
            <div style={{ fontSize: '32px' }}>🐦</div>
            <div style={{ fontSize: '12px' }}>pgnostr</div>
          </NavLink>
        </div>
      </>
    );
  }
}
