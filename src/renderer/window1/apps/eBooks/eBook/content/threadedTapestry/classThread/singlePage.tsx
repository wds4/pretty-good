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
        A <i>class thread</i> is the basic building block for the{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('threadedTapestry'));
          }}
        >
          threaded tapestry
        </div>{' '}
        model of knowledge representation.
      </div>
      <p>
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
        </div>{' '}
         at the opposite end. Situated between the class node and the instance
        node, a class thread will frequently traverse one or more{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('setNode'));
          }}
        >
          set nodes
        </div>
        . A{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('concept'));
          }}
        >
          concept
        </div>{' '}
        is defined as the set of all class threads emanating from a given class
        node, plus the set of all nodes traversed by those threads.
      </p>
      <p>
        The class thread derives its name from the class in javascript or
        other object oriented programming languages, described often as a
        blueprint for creating objects. In the threaded tapestry model,
        the class node may be thought of as a blueprint for class instances.
        For any given class thread, Tte requirement that every class
        instance follows the blueprint instructions specified in or
        transmitted by the class node is called the <i>class thread rule</i>.
      </p>
    </>
  );
};
export default Content;
