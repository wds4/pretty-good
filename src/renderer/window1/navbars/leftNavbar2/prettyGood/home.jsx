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
      <div className="leftNav2Panel leftNav2PanelPrettyGood">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          Pretty Good
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/PrettyGoodHome"
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
          to="/PrettyGoodHome/PrettyGoodFaq"
        >
          FAQ
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/PrettyGoodHome/PrettyGoodAbout"
          >
            about
          </NavLink>
        </div>

      </div>
    </>
  );
}

export default LeftNavbar2;
