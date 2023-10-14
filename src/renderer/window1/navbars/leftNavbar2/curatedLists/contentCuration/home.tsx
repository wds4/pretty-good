import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar2 = () => {
  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );

  // devMode1: toggle curatedLists
  let devElemClass1 = 'devElemHide';
  if (devMode1) {
    devElemClass1 = 'devElemShow';
  }

  // devMode2: toggle conceptGraph, grapevine, eBooks
  let devElemClass2 = 'devElemHide';
  if (devMode2) {
    devElemClass2 = 'devElemShow';
  }

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

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContextualFeed"
        >
          feed
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/TopicsHome"
        >
          topics
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCreators"
        >
          content creators
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurators"
        >
          content curators
        </NavLink>

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
          to="/CuratedListsHome/ContentCurationShowCurations"
        >
          show curations
        </NavLink>

        <hr />

        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          Settings
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationSettingsRedux"
        >
          redux
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationSettingsSql"
        >
          sql
        </NavLink>

      </div>
    </>
  );
};

export default LeftNavbar2;
