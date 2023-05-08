import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import GrapevineLogo from 'renderer/window1/assets/Grapevine_Logo03.png';
import BackButton from 'renderer/window1/components/backButton';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import { setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { noProfilePicUrl } from '../const';

export default function Masthead() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  dispatch(setCurrentPage('foo'));
  let avatarUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    avatarUrl = myNostrProfile.picture_url;
  }

  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );
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
            to="/NostrHome/NostrSearchForUser"
          >
            <div style={{ fontSize: '20px' }}>&#x1F50D;</div>
            <div style={{ fontSize: '10px' }}>search</div>
          </NavLink>
          <NavLink
            onClick={() => {
              dispatch(updateNostrProfileFocus(myNostrProfile.pubkey));
            }}
            className={({ isActive }) =>
              isActive
                ? 'mastheadNavButton mastheadNavButtonActive'
                : 'mastheadNavButton'
            }
            end
            to="/NostrHome/NostrViewMyProfile"
            style={{
              padding: '0px',
              width: '50px',
              height: '50px',
              border: '0px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <img src={avatarUrl} className="myProfileAvatarImgSmall" alt="" />
            </div>
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
        <div>"ASK NOT WHAT YOUR <span style={{color:"purple"}}>GRAPEVINE</span> CAN DO FOR YOU." -- JFK inaugural address, 1961</div>
      </div>
    </>
  );
}
