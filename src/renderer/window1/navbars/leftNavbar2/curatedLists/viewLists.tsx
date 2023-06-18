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
          Lists
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome"
          >
            home
          </NavLink>

          <hr />
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/MultiListSummariesOfItemScores"
          >
            lists v2
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
            to="/CuratedListsHome/CuratedListsWithScores"
          >
            lists v3
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CuratedListsWithScoresV4"
          >
            lists v4
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CuratedListsWithScoresV5"
          >
            lists v5
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CuratedListsWithScoresV6"
          >
            lists v6
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CuratedListsWithScoresV7"
          >
            lists v7
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CuratedListsWithScoresV8"
        >
          lists: main page
        </NavLink>

        <hr />

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/ViewAllLists"
          >
            all lists
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ViewAllListsFromNostrLive"
        >
          lists (live from nostr)
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ViewAllListsFromSql"
        >
          lists (sql)
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            style={{  }}
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/ViewMyLists"
          >
            my lists
          </NavLink>
        </div>

        <hr />

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CreateNewCuratedList"
        >
          create a new list
        </NavLink>

        <div className={devElemClass}>
          <hr />

          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/AboutCuratedLists"
          >
            about
          </NavLink>
        </div>

        <hr />

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CuratedListsFaq"
        >
          FAQ
        </NavLink>

        <hr />

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ContentCurationHome"
        >
          content curation
        </NavLink>

      </div>
    </>
  );
};

export default LeftNavbar2;
