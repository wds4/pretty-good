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
      {aEBooks.map((eBook) => {
        return (
          <>
            <div >
              <NavLink
                onClick={() => {
                  dispatch(updateCurrentEBookFocus(eBook));
                }}
                end
                to="/EBooksHome/EBook"
              >
                <div style={{border: '1px solid purple', padding: '5px', marginBottom: '5px', width: '300px'}}>
                {eBook}
                </div>
              </NavLink>
            </div>
          </>
        );
      })}
    </>
  );
};
export default TableOfBooks;
