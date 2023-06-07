import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const LeftNavbar2 = () => {
  const devMode2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShow"; }
  return (
    <>
      <div className="leftNav2Panel leftNav2PanelCuratedLists">
        <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Lists</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome"
        >
          lists
        </NavLink>

        <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Single List</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/ViewIndividualCuratedList"
        >
          list
        </NavLink>

        <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>List Items</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/InstancesOfIndividualList"
        >
          items
        </NavLink>

        <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>Single Item</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListSpecificInstance"
        >
          item
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/SpecificInstanceViewRatings"
        >
          view ratings
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SpecificInstanceLeaveRating"
          >
            leave rating
          </NavLink>
        </div>

        <div className={devElemClass}>
          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/SpecificInstanceTechOverview"
          >
            technical overview
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LeftNavbar2;
