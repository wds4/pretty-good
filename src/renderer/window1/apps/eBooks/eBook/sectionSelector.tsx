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
      <div style={{ padding: '5px', marginTop: '10px' }}>
        {aDescriptions.map((thisButtonVersionSlug) => {
          const thisButtonVersionName = oItemTypes[thisButtonVersionSlug]?.name;
          let versionButtonClass = 'versionButtonDeselected';
          if (thisButtonVersionSlug == versionSlug) {
            versionButtonClass = 'versionButtonSelected';
          }
          return (
            <>
              <button
                type="button"
                className={versionButtonClass}
                style={{ display: 'inline-block', width: '150px', border: '0px' }}
                value={thisButtonVersionSlug}
                onClick={({target: { value }}) => changeVersion(value)}
              >
                {thisButtonVersionName}
              </button>
            </>
          );
        })}
      </div>
    </>
  );
};
export default ItemVersions;
