import React from 'react';
import { NavLink } from 'react-router-dom';

export default class AskNostrLeftNavbar1 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel leftNavPanelAskNostr">
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
            to="/AskNostrHome"
          >
            <div style={{ fontSize: '32px' }}>❓</div>
            <div style={{ fontSize: '12px' }}>Ask Nostr</div>
          </NavLink>
        </div>
      </>
    );
  }
}
