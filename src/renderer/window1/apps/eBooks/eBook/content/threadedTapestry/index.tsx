import { useSelector } from 'react-redux';
import ThreadedTapestry from './threadedTapestry';
import ConceptGraph from './conceptGraph';
import KnowledgeCuration from './knowledgeCuration';
import KnowledgeRepresentation from './knowledgeRepresentation';

const Section = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  switch (itemSlug) {
    case 'threadedTapestry':
      return (
        <>
          <ThreadedTapestry />
        </>
      );
      break;
    case 'conceptGraph':
      return (
        <>
          <ConceptGraph />
        </>
      );
      break;
    case 'knowledgeCuration':
      return (
        <>
          <KnowledgeCuration />
        </>
      );
      break;
    case 'knowledgeRepresentation':
      return (
        <>
          <KnowledgeRepresentation />
        </>
      );
      break;
    default:
      return (
        <>
          <div>Secton / Item: {itemSlug}</div>
        </>
      );
  }
};
export default Section;
