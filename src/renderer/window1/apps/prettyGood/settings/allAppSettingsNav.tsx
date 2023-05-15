import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentApp } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const AllAppSettingsNav = () => {
  const dispatch = useDispatch();
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
    </>
  );
};
export default AllAppSettingsNav;
