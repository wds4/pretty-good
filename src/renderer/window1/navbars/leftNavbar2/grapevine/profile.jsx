import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelGrapevine">
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/GrapevineHome/GrapevineProfile"
          >
            profile
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/GrapevineHome"
          >
            profile 2
          </NavLink>
        </div>
      </>
    );
  }
}
