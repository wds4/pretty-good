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

          <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Curators</div>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratorsOfIndividualList"
          >
            home
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SelectListCurators"
          >
            endorse a curator
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratedListEndorsementsOfCuratorsNostrLive"
          >
            view endorsements (nostr live)
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/CuratedListEndorsementsOfCuratorsSql"
          >
            view endorsements (sql)
          </NavLink>
        </div>
      </>
    );
  }
}
