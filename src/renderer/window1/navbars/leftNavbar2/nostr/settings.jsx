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
      <div className="leftNav2Panel leftNav2PanelNostr">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          nostr
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/NostrHome/NostrSettings"
        >
          settings
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/NostrHome/NostrProfiles"
        >
          my profiles
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/NostrHome/ProfileManagement"
        >
          profile management
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome/NostrRelays"
          >
            relays (old)
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/NostrHome/NostrRelaysV2"
        >
          relays
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/NostrHome/NostrMainFeedSettings"
        >
          main feed
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome/NostrSettingsExtendedFollowing"
          >
            extended following
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome/NostrSettingsGrapevine"
          >
            grapevine
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome/NostrSql"
          >
            sql
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome"
          >
            <div style={{ fontSize: '26px' }}>&#x1F310;</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/NostrHome/NostrApp"
          >
            nostrapp
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LeftNavbar2;
