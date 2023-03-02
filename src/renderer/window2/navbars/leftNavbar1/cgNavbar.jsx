import React from 'react';
import { NavLink } from 'react-router-dom';

export default class ConceptGraphLeftNavbar1 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel leftNavPanelConceptGraph">
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
            to="/ConceptGraphHome"
          >
            <div style={{ fontSize: '32px' }}>🧠</div>
            <div style={{ fontSize: '12px' }}>Concept Graph</div>
          </NavLink>
        </div>
      </>
    );
  }
}
