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
        A <i>specific instance</i>, a.k.a an <i>instance</i>, is the final node
        of a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('classThread'));
          }}
        >
          class thread
        </div>
        .
      </div>
    </>
  );
};
export default Content;
