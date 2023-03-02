import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelPrettyGood">
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodSettings"
          >
            settings
          </NavLink>

          <hr/>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodProfile"
          >
            profile
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome"
          >
            profile 2
          </NavLink>
        </div>
      </>
    );
  }
}
