import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <p>
      The <i>neuronal tapestry model</i> (a.k.a. the{' '}
        <i>cortical tapestry model</i>) is the hypothesis that knowledge
        representation and curation in the central
        nervous system, in particular the cerebral cortex, follow the
        <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('threadedTapestry'));
            }}
          >
            threaded tapestry
          </div>{' '}
          model.
      </p>
    </>
  );
};
export default Content;
