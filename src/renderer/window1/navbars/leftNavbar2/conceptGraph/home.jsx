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
      <div className="leftNav2Panel leftNav2PanelConceptGraph">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          Concept Graph
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/ConceptGraphHome"
        >
          home
        </NavLink>

        <hr />

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/ConceptGraphHome/ConceptGraphCreateWord"
        >
          create word
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/ConceptGraphHome/ConceptGraphViewWords"
          >
            view words
          </NavLink>
        </div>

      </div>
    </>
  );
}

export default LeftNavbar2;
