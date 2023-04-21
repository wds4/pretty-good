import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar2 = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);

  return (
    <>
      <div className="leftNav2Panel leftNav2PanelPrettyGood">
        <div
          style={{ fontSize: '12px', marginTop: '3px', marginBottom: '3px' }}
        >
          eBooks
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/EBooksHome"
        >
          home
        </NavLink>

        <hr />

        <div style={{fontSize: '10px'}}>{eBooks[currentFocus.eBook].title}</div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/EBooksHome/EBook"
        >
          home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'leftNav2Button leftNav2ButtonActive'
              : 'leftNav2Button'
          }
          end
          to="/EBooksHome/EBookIndex"
        >
          index
        </NavLink>
      </div>
    </>
  );
}

export default LeftNavbar2;
