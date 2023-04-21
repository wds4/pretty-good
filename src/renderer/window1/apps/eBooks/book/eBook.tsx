import { useSelector } from 'react-redux';
import EBookHeader from '../components/eBookHeader';
import ItemHeader from '../components/itemHeader';
import ItemVersions from './itemVersions';
import Description from './description';

const EBook = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <EBookHeader />
      <ItemHeader />
      <ItemVersions />
      <Description />
    </>
  );

};
export default EBook;
