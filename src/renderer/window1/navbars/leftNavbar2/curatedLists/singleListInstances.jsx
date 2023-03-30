import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelCuratedLists">
          <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Lists</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome"
          >
            home
          </NavLink>

          <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Single List</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewIndividualCuratedList"
          >
            home
          </NavLink>

          <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Instances</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/InstancesOfIndividualList"
          >
            home
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratedListAllInstances"
          >
            view all instances
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratedListAllRatings"
          >
            ratings of instances
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
