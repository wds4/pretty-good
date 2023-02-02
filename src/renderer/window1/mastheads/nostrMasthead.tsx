import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BackButton from 'renderer/window1/components/backButton';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostrGlobalState/slice';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import { noProfilePicUrl } from '../const';
import RelaysStatus from './relaysStatus';
import { truncate } from 'fs/promises';

export default function Masthead() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  let avatarUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    avatarUrl = myNostrProfile.picture_url;
  }
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
            🐦
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
            to="/NostrHome/NostrSearchForUser"
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
            to="/NostrHome/NostrCreatePost"
          >
            <div style={{ fontSize: '20px' }}>✏️</div>
            <div style={{ fontSize: '10px' }}>post</div>
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
            to="/NostrHome/NostrSettings"

          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '10px' }}>settings</div>
          </NavLink>
          <ToggleNostrGrapevineSwitch />
        </div>
      </div>
      <div className="mastheadSubBanner mastheadSubBannerNostr">
        <RelaysStatus />
      </div>
    </>
  );
}
