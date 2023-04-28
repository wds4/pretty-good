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
      <div>
        The <i>threaded tapestry</i> model is a proposed model of{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('knowledgeRepresentation'));
          }}
        >
          knowledge representation
        </div>{' '}
        and{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('knowledgeCuration'));
          }}
        >
          knowledge curation
        </div>{' '}
        for a
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('decentralizedDistributedSystem'));
          }}
        >
          decentralized, distributed system
        </div>{' '}
        such as the decentralized web. It is designed to solve the chief problem
        faced by such networks: how to develop and manage a{' '}
        <i>common language</i>, without which no network can properly function.
      </div>
      <p>
        In the threaded tapestry model, information is broken into chunks which
        are represented as nodes in a graph. A specialized path called a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('classThread'));
          }}
        >
          class thread
        </div>{' '}
        is employed as a central tool for organization of information into{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('concept'));
          }}
        >
          concepts
        </div>
        , comparable in some ways to the way that a <i>class</i> is used to organize
        <i>objects</i> in many object oriented programming languages.
      </p>
    </>
  );
};
export default Content;
