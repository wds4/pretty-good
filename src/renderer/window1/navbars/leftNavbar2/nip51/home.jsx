import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelNip51">
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home"
          >
            home
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51LoadLists"
          >
            Load Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51ViewLists"
          >
            View Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51ListAuthors"
          >
            Authors
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51List"
          >
            View List
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51MakeNewList"
          >
            Make New List
          </NavLink>

          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind10000Lists"
          >
            Kind 10000 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind10001Lists"
          >
            Kind 10001 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind30000Lists"
          >
            Kind 30000 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind30001Lists"
          >
            Kind 30001 Lists
          </NavLink>

          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP32Explorer"
          >
            NIP 32 Explorer
          </NavLink>

        </div>
      </>
    );
  }
}
