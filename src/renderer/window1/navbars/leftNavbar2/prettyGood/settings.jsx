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

        <div className={devElemClass}>
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
        </div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/PrettyGoodHome/PrettyGoodSettings"
        >
          settings
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodProfile"
          >
            Pretty Good Profile
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/PrettyGoodHome/PrettyGoodRedux"
        >
          Redux
        </NavLink>

        <br /><br />

        <div style={{fontSize:"10px"}}>Networks & Databases</div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/PrettyGoodHome/PrettyGoodSql"
        >
          SQL
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodNostr"
          >
            nostr
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/PrettyGoodHome/PrettyGoodIPFSLightweight"
        >
          IPFS
          <div style={{fontSize:"8px"}}>(lightweight)</div>
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/PrettyGoodHome/PrettyGoodIPFSHeavyweight"
        >
          IPFS
          <div style={{fontSize:"8px"}}>(heavyweight)</div>
        </NavLink>

        <div className={devElemClass}>
          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodHelloWorld"
          >
            Hello World
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LeftNavbar2;
