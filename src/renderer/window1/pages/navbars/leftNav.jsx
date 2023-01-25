import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar1_Plex extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel">
          <NavLink className="leftNavButton" to="/Home">
            <div style={{ fontSize: '12px', lineHeight: '100%' }}>Notes</div>
          </NavLink>

          <NavLink className="leftNavButton" to="/SqlDemo">
            <div style={{ fontSize: '12px', lineHeight: '100%' }}>SQL demo</div>
          </NavLink>
        </div>
      </>
    );
  }
}
