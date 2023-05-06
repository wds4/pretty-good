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
        A <i>toxic thread</i> is a specific type of thread woven into a <i>tribal tapestry</i>
        which employs <i>toxicity</i> to ensure uniqueness of the tapestry (ensure that the tapestry
        will be emblematic of the tribe)
        and to establish a basis for the creation of <i>virtue signals</i>.
      </div>
      <p>There are two main categories of toxicity:
        <li>false beliefs</li>
        <li>logical fallacies or contradictions</li>
      </p>
    </>
  );
};
export default Content;
