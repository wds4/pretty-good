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

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodHelloWorld"
          >
            Hello World
          </NavLink>

          <div style={{fontSize:"10px"}}>Networks & Databases</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/HelloWorldRedux"
          >
            Redux
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/VisjsHelloWorld"
          >
            Vis.js
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/IpfsCoreHelloWorld"
          >
            IPFS Core
          </NavLink>
        </div>
      </>
    );
  }
}
