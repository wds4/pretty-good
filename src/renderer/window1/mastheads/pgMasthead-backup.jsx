import React from 'react';
import { NavLink } from 'react-router-dom';
import BackButton from 'renderer/window1/components/backButton';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <div className="mastheadContainer">
          <div className="mastheadLeftContainer">
            <div
              style={{
                fontSize: '48px',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              ✔
            </div>
          </div>

          <div id="mastheadCenterContainer" className="mastheadCenterContainer">
            center
          </div>

          <div className="mastheadRightContainer">
            <BackButton />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/PrettyGoodHome/PrettyGoodApps"
            >
              <div style={{ fontSize: '20px' }}>
                <span>&#8942;</span>
                <span>&#8942;</span>
                <span>&#8942;</span>
              </div>
              <div style={{ fontSize: '10px' }}>apps</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/PrettyGoodHome/PrettyGoodProfile"
            >
              <div style={{ fontSize: '20px' }}>👤</div>
              <div style={{ fontSize: '10px' }}>profile</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/PrettyGoodHome/PrettyGoodSettings"
            >
              <div style={{ fontSize: '20px' }}>⚙️</div>
              <div style={{ fontSize: '10px' }}>settings</div>
            </NavLink>
            <ToggleNostrGrapevineSwitch />
          </div>
        </div>
        <div className="mastheadSubBanner mastheadSubBannerPrettyGood">
          <div>Pretty Good subheading</div>
        </div>
      </>
    );
  }
}
