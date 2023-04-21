import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateCurrentEBookFocus } from 'renderer/window1/redux/features/eBooks/slice';

const TableOfBooks = () => {
  const dispatch = useDispatch();
  const itemTypes = useSelector((state) => state.eBooks.itemTypes);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      TableOfBooks
      {aEBooks.map((eBook) => {
        return (
          <>
            <div>
              <NavLink
                onClick={() => {
                  dispatch(updateCurrentEBookFocus(eBook));
                }}
                end
                to="/EBooksHome/EBook"
              >
                {eBook}
              </NavLink>
            </div>
          </>
        );
      })}
    </>
  );
};
export default TableOfBooks;
