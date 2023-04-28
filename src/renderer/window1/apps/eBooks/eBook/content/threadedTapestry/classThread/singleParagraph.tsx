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
        A <i>class thread</i> is a specialized type of{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('thread'));
          }}
        >
          thread
        </div>
        , characterized by a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('classNode'));
          }}
        >
          class node
        </div>{' '}
        at one end and a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('specificInstance'));
          }}
        >
          class instance
        </div>{' '}(a.k.a. <i>specific instance</i> or simply <i>instance</i>)
        at the opposite end, and frequently contains{' '}

        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('setNode'));
          }}
        >
          set nodes
        </div>{' '}
        between these two ends.
        Class threads make up the core of any{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('concept'));
          }}
        >
          concept
        </div>,
        which are the essential building blocks of a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('conceptGraph'));
          }}
        >
          concept graph
        </div>
        .
      </div>
    </>
  );
};
export default Content;
