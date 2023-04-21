import { useSelector } from 'react-redux';
import EBookHeader from '../components/eBookHeader';

const ItemVersions = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;

  let aDescriptions = oEBooks[eBookSlug].items[itemSlug]?.descriptions;
  if (!aDescriptions) {
    aDescriptions = [];
  }

  const changeVersion = () => {
    console.log('changeVersion');
  };

  return (
    <>
      <div style={{ border: '1px solid grey', padding: '5px' }}>
        {aDescriptions.map((description) => {
          return (
            <>
              <button
                type="button"
                style={{ display: 'inline-block', width: '150px' }}
                onClick={changeVersion}
              >
                {description}
              </button>
            </>
          );
        })}
      </div>
    </>
  );
};
export default ItemVersions;
