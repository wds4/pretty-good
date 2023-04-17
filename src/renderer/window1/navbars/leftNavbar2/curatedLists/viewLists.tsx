import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar2 = () => {
  const devMode2 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode2
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

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ViewAllLists"
        >
          lists
        </NavLink>

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

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CuratedListsWithScoresV6"
        >
          lists & scores
        </NavLink>

        <NavLink
          style={{ display: 'none' }}
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/ViewMyLists"
        >
          view my lists
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNav2Button leftNav2ButtonActive' : 'leftNav2Button'
          }
          end
          to="/CuratedListsHome/CreateNewCuratedList"
        >
          create a new list
        </NavLink>

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
    </>
  );
};

export default LeftNavbar2;
