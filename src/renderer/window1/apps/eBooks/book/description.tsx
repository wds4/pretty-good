import { useSelector } from 'react-redux';
import EBookHeader from '../components/eBookHeader';

const Description = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;

  const changeVersion = () => {
    console.log('changeVersion');
  };

  return (
    <>
      <div style={{ border: '1px solid purple', padding: '5px' }}>
        Description
      </div>
    </>
  );
};
export default Description;
