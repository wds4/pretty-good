import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  updateCurrentEBookFocus,
  updateCurrentItemFocus,
} from 'renderer/window1/redux/features/eBooks/slice';
import EBookHeader from '../eBookHeader';

const EBookIndex = () => {
  const dispatch = useDispatch();
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(oEBooks);

  const oItems = oEBooks[currentFocus.eBook].items;
  const aItems = Object.keys(oItems);
  return (
    <>
      <EBookHeader />
      <div style={{fontSize: '22px', marginBottom: '10px'}}>topic index:</div>
      <div>
        {aItems.map((itemSlug) => {
          return (
            <>
              <div style={{marginBottom: '5px'}}>
                <NavLink
                  style={{textDecoration: 'none'}}
                  onClick={() => {
                    dispatch(updateCurrentItemFocus(itemSlug));
                  }}
                  end
                  to="/EBooksHome/EBook"
                >
                  {oItems[itemSlug]?.name}
                </NavLink>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default EBookIndex;
