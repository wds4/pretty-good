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
        In the threaded tapestry model, <i>class criteria</i> refers
        to the following constraints:
        <li>
          every node in the graph is the instance of at least one{' '}
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('concept'));
            }}
          >
            concept
          </div>
        </li>
        <li>
          every{' '}
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('specificInstance'));
            }}
          >
            instance
          </div>{' '}
          obeys the data content and data formatting rules
          transmitted through the{' '}
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('classNode'));
            }}
          >
            class node
          </div>.
        </li>
      </div>
      <p>
        A{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('conceptGraph'));
          }}
        >
          concept graph
        </div>{' '}
        is defined by adherence to these constraints.
      </p>
    </>
  );
};
export default Content;
