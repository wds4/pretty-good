import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar2 = () => {
  const devMode2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShow"; }

  return (
    <>
      <div className="leftNav2Panel leftNav2PanelCuratedLists">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          Content Curation
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationHome"
        >
          home
        </NavLink>

        <hr />

        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          graphs
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationGraphs"
        >
          graphs
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationContextTreeGraph"
        >
          context tree
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationGrapevineGraph"
        >
          grapevine
        </NavLink>
      </div>
    </>
  );
};

export default LeftNavbar2;
