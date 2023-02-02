import React from 'react';
import { NavLink } from 'react-router-dom';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import BackButton from 'renderer/window1/components/backButton';

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
            <div style={{ fontSize: '48px', display: 'inline-block', marginRight: '10px' }}>🦉</div>
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
              to="/ConceptGraphHome/ConceptGraphProfile"
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
              to="/ConceptGraphHome/ConceptGraphSettings"
            >
              <div style={{ fontSize: '20px' }}>⚙️</div>
              <div style={{ fontSize: '10px' }}>settings</div>
            </NavLink>
            <ToggleNostrGrapevineSwitch />
          </div>
        </div>
        <div className="mastheadSubBanner mastheadSubBannerConceptGraph">
          <div>Concept Graph subheading</div>
        </div>
      </>
    );
  }
}
