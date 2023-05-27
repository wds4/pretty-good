import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentApp } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const AllAppSettingsNav = () => {
  const dispatch = useDispatch();

  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );
  let devElemClass1 = "devElemHide";
  if (devMode1) { devElemClass1 = "devElemShowInline"; }
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShowInline"; }

  return (
    <>
      <div style={{marginBottom: '10px', textAlign: 'center'}}>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'mastheadNavButton mastheadNavButtonActive'
              : 'mastheadNavButton'
          }
          end
          onClick={() => {
            dispatch(updateCurrentApp('prettyGood'));
          }}
          to="/PrettyGoodHome/PrettyGoodSettings"
        >
          <div style={{ fontSize: '20px' }}>⚙️</div>
          <div style={{ fontSize: '8px' }}>Pretty Good</div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'mastheadNavButton mastheadNavButtonActive'
              : 'mastheadNavButton'
          }
          end
          onClick={() => {
            dispatch(updateCurrentApp('nostr'));
          }}
          to="/NostrHome/NostrSettings"
        >
          <div style={{ fontSize: '20px' }}>⚙️</div>
          <div style={{ fontSize: '8px' }}>Nostr</div>
        </NavLink>

        <div className={devElemClass1}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            onClick={() => {
              dispatch(updateCurrentApp('curatedLists'));
            }}
            to="/CuratedListsHome/CuratedListsSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '8px' }}>Curated Lists</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            onClick={() => {
              dispatch(updateCurrentApp('grapevine'));
            }}
            to="/GrapevineHome/GrapevineSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '8px' }}>Grapevine</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            onClick={() => {
              dispatch(updateCurrentApp('conceptGraph'));
            }}
            to="/ConceptGraphHome/ConceptGraphSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '8px' }}>Concept Graph</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            onClick={() => {
              dispatch(updateCurrentApp('eBooks'));
            }}
            to="/EBooksHome/EBooksSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '8px' }}>eBooks</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            onClick={() => {
              dispatch(updateCurrentApp('askNostr'));
            }}
            to="/AskNostrHome/AskNostrSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '8px' }}>Ask Nostr</div>
          </NavLink>
        </div>

      </div>
    </>
  );
};
export default AllAppSettingsNav;
