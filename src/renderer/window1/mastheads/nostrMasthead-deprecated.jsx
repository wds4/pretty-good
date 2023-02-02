import React from 'react';
import { NavLink } from 'react-router-dom';
// import AvatarElem from './nostrAvatarElem';

// const myNostrProfile = useSelector((state) => state.myNostrProfile);

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
          <div className="mastheadLeftContainer">pgnostr</div>

          <div id="mastheadCenterContainer" className="mastheadCenterContainer">
            center
          </div>

          <div className="mastheadRightContainer">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/NostrHome"
            >
              <div style={{ fontSize: '20px' }}>&#x1F50D;</div>
              <div style={{ fontSize: '10px' }}>search</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/NostrHome"
            >
              <div style={{ fontSize: '20px' }}>✏️</div>
              <div style={{ fontSize: '10px' }}>post</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/NostrHome/NostrViewMyProfile"
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
              to="/NostrHome/NostrSettings"
            >
              <div style={{ fontSize: '20px' }}>⚙️</div>
              <div style={{ fontSize: '10px' }}>settings</div>
            </NavLink>
          </div>
        </div>
        <div className="mastheadSubBanner mastheadSubBannerNostr">
          <div>nostr subheading</div>
        </div>
      </>
    );
  }
}
