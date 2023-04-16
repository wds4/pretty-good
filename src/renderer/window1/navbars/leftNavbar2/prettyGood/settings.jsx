import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelPrettyGood">
          <div
            style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
          >
            Pretty Good
          </div>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/PrettyGoodHome"
          >
            home
          </NavLink>

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
            Pretty Good Profile
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodRedux"
          >
            Redux
          </NavLink>

          <br /><br />

          <div style={{fontSize:"10px"}}>Networks & Databases</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodSql"
          >
            SQL
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodNostr"
          >
            nostr
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodIPFSLightweight"
          >
            IPFS
            <div style={{fontSize:"8px"}}>(lightweight)</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodIPFSHeavyweight"
          >
            IPFS
            <div style={{fontSize:"8px"}}>(heavyweight)</div>
          </NavLink>

          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodHelloWorld"
          >
            Hello World
          </NavLink>
        </div>
      </>
    );
  }
}
