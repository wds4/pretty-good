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
      <div className="leftNav2Panel leftNav2PanelGrapevine">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          grapevine
        </div>
        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/GrapevineHome/GrapevineSettings"
        >
          settings
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/GrapevineHome"
          >
            settings 2
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LeftNavbar2;
