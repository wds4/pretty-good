import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
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
            to="/PrettyGoodHome/PrettyGoodAbout"
          >
            about
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'leftNav2Button leftNav2ButtonActive'
                : 'leftNav2Button'
            }
            end
            to="/PrettyGoodHome/ThreadedTapestry"
          >
            threaded tapestry
          </NavLink>

        </div>
      </>
    );
  }
}
