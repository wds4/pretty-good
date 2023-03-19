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

          <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Single Instance</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratedListSpecificInstance"
          >
            overview
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SpecificInstanceViewRatings"
          >
            view ratings
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SpecificInstanceLeaveRating"
          >
            leave rating
          </NavLink>

          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SpecificInstanceTechOverview"
          >
            technical overview
          </NavLink>


        </div>
      </>
    );
  }
}
