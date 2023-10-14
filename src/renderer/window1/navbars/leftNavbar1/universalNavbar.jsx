import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentApp } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import PurpleNostrich from 'renderer/window1/assets/nostr_logo_prpl.svg';

const UniversalLeftNavbar1 = () => {
  const dispatch = useDispatch();

  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );

  // devMode1: toggle curatedLists
  let devElemClass1 = 'devElemHide';
  if (devMode1) {
    devElemClass1 = 'devElemShow';
  }

  // devMode2: toggle conceptGraph, grapevine, eBooks
  let devElemClass2 = 'devElemHide';
  if (devMode2) {
    devElemClass2 = 'devElemShow';
  }

  const currentApp = useSelector(
    (state) => state.prettyGoodGlobalState.currentApp
  );

  let leftNavPanelClass = 'leftNavPanel';
  switch (currentApp) {
    case 'prettyGood':
      leftNavPanelClass += ' leftNavPanelPrettyGood';
      break;
    case 'nostr':
      leftNavPanelClass += ' leftNavPanelNostr';
      break;
    case 'curatedLists':
      leftNavPanelClass += ' leftNavPanelCuratedLists';
      break;
    case 'conceptGraph':
      leftNavPanelClass += ' leftNavPanelConceptGraph';
      break;
    case 'grapevine':
      leftNavPanelClass += ' leftNavPanelGrapevine';
      break;
    case 'eBooks':
      leftNavPanelClass += ' leftNavPanelEBooks';
      break;
    case 'askNostr':
      leftNavPanelClass += ' leftNavPanelAskNostr';
      break;
    case 'nip51':
      leftNavPanelClass += ' leftNavPanelNip51';
      break;
    default:
    // no change
  }
  return (
    <>
      <div className={leftNavPanelClass}>
        <div style={{display: 'none', color: 'white', backgroundColor: 'black'}}>{currentApp}</div>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
          }
          style={{ marginBottom: '20px' }}
          onClick={() => {
            dispatch(updateCurrentApp('prettyGood'));
          }}
          to="/PrettyGoodHome"
        >
          <div style={{ fontSize: '32px' }}>🦉</div>
          <div style={{ fontSize: '12px' }}>Pretty Good</div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
          }
          onClick={() => {
            dispatch(updateCurrentApp('nostr'));
          }}
          to="/NostrHome/NostrMainFeed"
        >
          <div style={{ fontSize: '32px' }}>
            <img
              src={PurpleNostrich}
              alt=""
              style={{
                display: 'inline-block',
                width: '30px',
              }}
            />
          </div>
          <div style={{ fontSize: '12px' }}>pgnostr</div>
        </NavLink>

        <div className={devElemClass1}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            onClick={() => {
              dispatch(updateCurrentApp('nip51'));
            }}
            to="/NIP51Home"
          >
            <div style={{ fontSize: '32px' }}>📃</div>
            <div style={{ fontSize: '12px' }}>NIP-51 Lists</div>
          </NavLink>
        </div>

        <div className={devElemClass1}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            onClick={() => {
              dispatch(updateCurrentApp('curatedLists'));
            }}
            to="/CuratedListsHome/CuratedListsWithScoresV8"
          >
            <div style={{ fontSize: '32px' }}>📃</div>
            <div style={{ fontSize: '12px' }}>Curated Lists</div>
          </NavLink>
        </div>

        <div className={devElemClass2}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            onClick={() => {
              dispatch(updateCurrentApp('grapevine'));
            }}
            to="/GrapevineHome"
          >
            <div style={{ fontSize: '32px' }}>🍇</div>
            <div style={{ fontSize: '12px' }}>Grapevine</div>
          </NavLink>
        </div>

        <div className={devElemClass2}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            onClick={() => {
              dispatch(updateCurrentApp('conceptGraph'));
            }}
            to="/ConceptGraphHome"
          >
            <div style={{ fontSize: '32px' }}>🧠</div>
            <div style={{ fontSize: '12px' }}>Concept Graph</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UniversalLeftNavbar1;
