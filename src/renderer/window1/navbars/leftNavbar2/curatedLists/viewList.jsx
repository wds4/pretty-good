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

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome"
          >
            home
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CuratedListsWithScoresV8"
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

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListEndorsementsOfCuratorsSql"
        >
          curators
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListAllItemsSql"
        >
          items on this list
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/SingleListGraphOfInstances"
        >
          graph
        </NavLink>

        <div className={devElemClass}>
          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/ViewIndividualCuratedListTechOverview"
          >
            technical overview
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LeftNavbar2;
