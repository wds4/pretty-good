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
        <i>Topological data completion</i> means that all of the data within
        each node of a concept graph can be reconstituted from scratch using
        only data that is encoded topologically, plus some minimal data within
        each node, such as the name of the node. (In Pretty Good Apps, the name
        of each node is recorded as a property within wordData. So we might
        characterize a concept graph as being "topologically complete modulo
        wordData."") A concept graph with this property is referred to as
        "(topoligically) data-complete." Not all concept graphs are necessarily
        data complete.
      </div>
    </>
  );
};
export default Content;
