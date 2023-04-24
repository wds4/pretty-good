import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  updateCurrentEBookFocus,
  updateCurrentItemFocus,
} from 'renderer/window1/redux/features/eBooks/slice';
import EBookHeader from '../components/eBookHeader';

const EBookIndex = () => {
  const dispatch = useDispatch();
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  const oItems = eBooks[currentFocus.eBook].items;
  const aItems = Object.keys(oItems);
  return (
    <>
      <EBookHeader />
      <div>
        {aItems.map((itemSlug) => {
          return (
            <>
              <div>
                <NavLink
                  onClick={() => {
                    dispatch(updateCurrentItemFocus(itemSlug));
                  }}
                  end
                  to="/EBooksHome/EBook"
                >
                  {itemSlug}
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
