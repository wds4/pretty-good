import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentVersionFocus } from 'renderer/window1/redux/features/eBooks/slice';
import { NavLink } from 'react-router-dom';
import EBookHeader from './eBookHeader';

const ItemVersions = () => {
  const dispatch = useDispatch();

  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  let aDescriptions = oEBooks[eBookSlug].items[itemSlug]?.descriptions;
  if (!aDescriptions) {
    aDescriptions = [];
  }

  const changeVersion = (newVersion) => {
    console.log('changeVersion; v: '+newVersion);
    dispatch(updateCurrentVersionFocus(newVersion))
  };

  return (
    <>
      <div style={{ border: '1px solid grey', padding: '5px' }}>
        {aDescriptions.map((thisButtonVersion) => {
          let versionButtonClass = 'versionButtonDeselected';
          if (thisButtonVersion == versionSlug) {
            versionButtonClass = 'versionButtonSelected';
          }
          return (
            <>
              <button
                type="button"
                className={versionButtonClass}
                style={{ display: 'inline-block', width: '150px' }}
                value={thisButtonVersion}
                onClick={({target: { value }}) => changeVersion(value)}
              >
                {thisButtonVersion}
              </button>
            </>
          );
        })}
      </div>
    </>
  );
};
export default ItemVersions;
