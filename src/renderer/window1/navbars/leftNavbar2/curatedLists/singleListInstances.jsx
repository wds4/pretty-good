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
          to="/CuratedListsHome/CuratedListsWithScoresV8"
        >
          lists
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome"
          >
            home
          </NavLink>
        </div>

        <div style={{fontSize: "12px",marginTop: '3px',marginBottom: '3px'}}>single list</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/ViewIndividualCuratedList"
        >
          home
        </NavLink>

        <div style={{fontSize: "12px",margin: '3px 1px 3px 1px'}}>items on this list</div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/CuratedListsHome/InstancesOfIndividualList"
          >
            home
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListAllItemsNostrLive"
        >
          view all items (nostr live)
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListAllItemsSql"
        >
          view all items (sql)
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListAllRatingsNostrLive"
        >
          ratings of items (nostr live)
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CuratedListAllRatingsSql"
        >
          ratings of items (sql)
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/CuratedListsHome/CreateNewCuratedListInstance"
        >
          create a new item
        </NavLink>

      </div>
    </>
  );
}

export default LeftNavbar2;
