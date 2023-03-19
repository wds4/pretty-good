import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelCuratedLists">
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome"
          >
            lists home
          </NavLink>

          <hr/>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewAllLists"
          >
            view all lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewMyLists"
          >
            view my lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CreateNewCuratedList"
          >
            create a new list
          </NavLink>
        </div>
      </>
    );
  }
}
