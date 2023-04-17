import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrettyGoodLeftNavbar1 = () => {
  const devMode2 = useSelector((state) => state.prettyGoodGlobalState.devMode2);
  let devElemClass = 'devElemHide';
  if (devMode2) {
    devElemClass = 'devElemShow';
  }
  return (
    <>
      <div className="leftNavPanel leftNavPanelPrettyGood">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
          }
          style={{ marginBottom: '20px' }}
          to="/PrettyGoodHome"
        >
          <div style={{ fontSize: '32px' }}>🦉</div>
          <div style={{ fontSize: '12px' }}>Pretty Good</div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
          }
          to="/NostrHome/NostrMainFeed"
        >
          <div style={{ fontSize: '32px' }}>🪶</div>
          <div style={{ fontSize: '12px' }}>pgnostr</div>
        </NavLink>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            to="/GrapevineHome"
          >
            <div style={{ fontSize: '32px' }}>🍇</div>
            <div style={{ fontSize: '12px' }}>Grapevine</div>
          </NavLink>
        </div>

        <div className={devElemClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
            }
            to="/ConceptGraphHome"
          >
            <div style={{ fontSize: '32px' }}>🧠</div>
            <div style={{ fontSize: '12px' }}>Concept Graph</div>
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'leftNavButton leftNavButtonActive' : 'leftNavButton'
          }
          to="/CuratedListsHome"
        >
          <div style={{ fontSize: '32px' }}>📃</div>
          <div style={{ fontSize: '12px' }}>Curated Lists</div>
        </NavLink>
      </div>
    </>
  );
};

export default PrettyGoodLeftNavbar1;
