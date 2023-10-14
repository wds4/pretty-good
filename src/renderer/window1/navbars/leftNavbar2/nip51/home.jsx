import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar2 = () => {
  const { devMode1, devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );

  // devMode1: toggle curatedLists
  let devElemClass1 = 'devElemHide';
  if (devMode1) {
    devElemClass1 = 'devElemShow';
  }

  // devMode2: toggle alpha / beta mode
  let devElemClass2 = 'devElemHide';
  if (devMode2) {
    devElemClass2 = 'devElemShow';
  }

  return (
    <>
      <div className="leftNav2Panel leftNav2PanelNip51">
        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/NIP51Home"
        >
          home
        </NavLink>

        <div className={devElemClass2} >
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51LoadLists"
          >
            Load Lists
          </NavLink>
        </div>

        <div className={devElemClass2} >
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51ViewLists"
          >
            View Lists
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
          end to="/NIP51Home/NIP51TableOfLists"
        >
          Table: Lists
        </NavLink>

        <div className={devElemClass2} >
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51ListAuthors"
          >
            Authors
          </NavLink>
        </div>

        <div className={devElemClass2} >
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51List"
          >
            View List
          </NavLink>
        </div>

        <div className={devElemClass2} >
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51MakeNewList"
          >
            Make New List
          </NavLink>
        </div>

        <div className={devElemClass2} >
          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind10000Lists"
          >
            Kind 10000 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind10001Lists"
          >
            Kind 10001 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind30000Lists"
          >
            Kind 30000 Lists
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP51Kind30001Lists"
          >
            Kind 30001 Lists
          </NavLink>
        </div>

        <div className={devElemClass2} >
          <hr />

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/NIP51Home/NIP32Explorer"
          >
            NIP 32 Explorer
          </NavLink>
        </div>

      </div>
    </>
  );
};

export default LeftNavbar2;
