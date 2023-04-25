import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateCurrentEBookFocus } from 'renderer/window1/redux/features/eBooks/slice';

const TableOfBooks = () => {
  const dispatch = useDispatch();
  const itemTypes = useSelector((state) => state.eBooks.itemTypes);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(oEBooks);
  return (
    <>
      <div className="h2">Titles</div>
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
                style={{textDecoration: 'none'}}
              >
                <div style={{color: 'purple', padding: '5px', marginBottom: '5px', width: '300px'}}>
                {oEBooks[eBook]?.title}
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
