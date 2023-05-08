import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BackButton from 'renderer/window1/components/backButton';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  setCurrentPage,
  updateCurrentApp,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import RelaysStatus from './relaysStatus';
import { noProfilePicUrl } from '../const';

export default function Masthead() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  dispatch(setCurrentPage('foo'));
  dispatch(updateCurrentApp('prettyGood'));
  let avatarUrl = noProfilePicUrl;
  if (myNostrProfile.picture_url) {
    if (myNostrProfile.picture_url != "undefined") {
      avatarUrl = myNostrProfile.picture_url;
    }
  }

  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );

  // devMode1: toggle curatedLists; use here to toggle the grapevine button (currently used with curated lists)
  let devElemClass1 = 'devElemHide';
  if (devMode1) {
    devElemClass1 = 'devElemShowInline';
  }

  // devMode2: toggle apps button
  let devElemClass2 = 'devElemHide';
  if (devMode2) {
    devElemClass2 = 'devElemShowInline';
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
            🦉
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

          <div className={devElemClass2}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/PrettyGoodHome/PrettyGoodApps"
            >
              <div style={{ fontSize: '14px' }}>𓃑</div>
              <div style={{ fontSize: '10px' }}>apps</div>
            </NavLink>
          </div>

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
            to="/PrettyGoodHome/PrettyGoodSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '10px' }}>settings</div>
          </NavLink>

          <div className={devElemClass1}>
            <ToggleNostrGrapevineSwitch />
          </div>
        </div>
      </div>
      <div className="mastheadSubBanner mastheadSubBannerPrettyGood">
        <RelaysStatus />
      </div>
    </>
  );
}
