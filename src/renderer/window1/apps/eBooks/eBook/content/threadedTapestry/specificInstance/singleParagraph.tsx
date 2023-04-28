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
        . According to the <i>Threaded Tapestry Principle</i> (class thread
        rule?), an instance must follow blueprint instructions transmitted by or
        specified within the corresponding{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('classNode'));
          }}
        >
          class node
        </div>
        . The <i>instance</i> of a class thread may also be referred to as an
        instance of the concept that is defined by the corresponding class node.
        Any node can be, and usually is, a specific instance of more that one concept
        (and hence, more than one class thread).
      </div>
    </>
  );
};
export default Content;
