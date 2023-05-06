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
        <i>Topological data encoding</i> refers to the practice of encoding data
        within the topology of the concept graph. According to the tribal tapestry method,
        class threads are the primary method of topological data encoding. Additional methods
        of data encoding will depend on choice of data structures within nodes. For example,
        in Pretty Good Apps, the property tree is used to encode data in a manner that will
        reconstitution of the JSON Schema which corresponds to each class node.
        The property tree method of encoding is an additional method of topological encoding, independent of and in addition to
        encoding using class threads.
      </div>
    </>
  );
};
export default Content;
