import React from 'react';
import { NavLink } from 'react-router-dom';

/*
const devMode2 = useSelector(
  (state) => state.prettyGoodGlobalState.devMode2
);
*/
export default class LeftNavbar2 extends React.PureComponent {
  render() {
    const devModeClassName="devElemHide";
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
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome"
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
            to="/CuratedListsHome/ViewAllLists"
          >
            lists
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/MultiListSummariesOfItemScores"
          >
            lists v2
          </NavLink>

          <div className='devMode2Class'>
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

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CuratedListsWithScoresV4"
          >
            lists v4
          </NavLink>
          <NavLink
          style={{display:"none"}}
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/ViewMyLists"
          >
            view my lists
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/CreateNewCuratedList"
          >
            create a new list
          </NavLink>

          <hr />

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/CuratedListsHome/AboutCuratedLists"
          >
            about
          </NavLink>

        </div>
      </>
    );
  }
}
