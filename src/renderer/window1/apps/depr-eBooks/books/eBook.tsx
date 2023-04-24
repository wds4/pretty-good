import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentEBookFocus } from 'renderer/window1/redux/features/eBooks/slice';

const EBook = () => {
  const dispatch = useDispatch();
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      {currentFocus.eBook}
    </>
  );
};
export default EBook;
