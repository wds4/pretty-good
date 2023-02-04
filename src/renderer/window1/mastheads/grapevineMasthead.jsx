import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GrapevineLogo from 'renderer/window1/assets/Grapevine_Logo03.png';
import BackButton from 'renderer/window1/components/backButton';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import { setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';

export default function Masthead() {
  const dispatch = useDispatch();
  dispatch(setCurrentPage('foo'));
  return (
    <>
      <div className="mastheadContainer" >

        <div className="mastheadLeftContainer" style={{position:"absolute",left:"0px",top:"110px",overflow:"visible"}}>
          <img src={GrapevineLogo} style={{height:"250px",marginLeft:"30px",overflow:"visible"}} />
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
            to="/GrapevineHome/GrapevineProfile"
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
            to="/GrapevineHome/GrapevineSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '10px' }}>settings</div>
          </NavLink>
          <ToggleNostrGrapevineSwitch />
        </div>
      </div>
      <div className="mastheadSubBanner mastheadSubBannerGrapevine">
        <div>grapevine subheading</div>
      </div>
    </>
  );
}
