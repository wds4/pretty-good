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
            end to="/CuratedListsHome/CreateNewCuratedList"
          >
            create a new list
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewListOfCuratedLists"
          >
            view lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewIndividualCuratedList"
          >
            view individual list
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CreateNewCuratedListInstance"
          >
            create a new instance
          </NavLink>
        </div>
      </>
    );
  }
}
