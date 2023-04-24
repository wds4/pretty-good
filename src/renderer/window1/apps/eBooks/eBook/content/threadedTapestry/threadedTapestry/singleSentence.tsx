import { useSelector, useDispatch } from 'react-redux';
import {
  updateCurrentEBookFocus,
  updateCurrentItemFocus,
} from 'renderer/window1/redux/features/eBooks/slice';

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
            dispatch(updateCurrentItemFocus("knowledgeRepresentation"));
          }}
        >
        knowledge representation
        </div>{' '}
        and{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus("knowledgeCuration"));
          }}
        >
        knowledge curation
        </div>{' '}
        for a distributed,
        decentralized system, such as the decentralized web.
      </div>
    </>
  );
};
export default Content;
