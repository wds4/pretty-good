import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        A <i>concept graph</i> is a graphical representation of data subject to{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('classCriteria'));
          }}
        >
          class criteria
        </div>.
      </div>
    </>
  );
};
export default Content;
