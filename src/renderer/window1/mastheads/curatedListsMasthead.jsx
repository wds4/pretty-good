import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ToggleNostrGrapevineSwitch from 'renderer/window1/components/grToggleSwitchT2';
import BackButton from 'renderer/window1/components/backButton';
import {
  updateCurrentApp,
  setCurrentPage,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
// import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListenersRedo';
import { noProfilePicUrl } from '../const';
import TapestryStatus from './tapestryStatus';

export default function Masthead() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  dispatch(updateCurrentApp('curatedLists'));
  const currentPage = useSelector((state) => state.prettyGoodGlobalState.currentPage);
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
          <BackButton />
          <div style={{ fontSize: '48px', display: 'inline-block', marginLeft: '10px' }}>📃</div>
        </div>

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
            onClick={() => dispatch(setCurrentPage('NostrSearchForUser'))}
            to="/NostrHome/NostrSearchForUser"
          >
            <div style={{ fontSize: '20px' }}>&#x1F50D;</div>
            <div style={{ fontSize: '10px' }}>search</div>
          </NavLink>
          <NavLink
            onClick={() => {
              dispatch(setCurrentPage('NostrViewMyProfile'));
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
            onClick={() => dispatch(setCurrentPage('curatedListsSettings'))}
            to="/CuratedListsHome/CuratedListsSettings"
          >
            <div style={{ fontSize: '20px' }}>⚙️</div>
            <div style={{ fontSize: '10px' }}>settings</div>
          </NavLink>

          <div className={devElemClass1}>
            <ToggleNostrGrapevineSwitch />
          </div>
        </div>
      </div>
      <CuratedListsListeners />
      <div className="mastheadSubBanner mastheadSubBannerConceptGraph">
        <span><TapestryStatus /></span>
      </div>
    </>
  );
}
// <CuratedListsListeners />

