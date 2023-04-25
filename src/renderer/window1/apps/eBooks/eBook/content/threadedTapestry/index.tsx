import { useSelector } from 'react-redux';

import ConceptGraph from './conceptGraph';
import DecentralizedDistributedSystem from './decentralizedDistributedSystem';
import Grapevine from './grapevine';
import KnowledgeCuration from './knowledgeCuration';
import KnowledgeRepresentation from './knowledgeRepresentation';
import LockInMinimization from './lockInMinimization';
import NeuronalTapestry from './neuronalTapestry';
import ThreadedTapestry from './threadedTapestry';
import TribalTapestry from './tribalTapestry';

const Section = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  switch (itemSlug) {
    case 'conceptGraph':
      return (
        <>
          <ConceptGraph />
        </>
      );
      break;
    case 'decentralizedDistributedSystem':
      return (
        <>
          <DecentralizedDistributedSystem />
        </>
      );
      break;
    case 'grapevine':
      return (
        <>
          <Grapevine />
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
    case 'lockInMinimization':
      return (
        <>
          <LockInMinimization />
        </>
      );
      break;
    case 'neuronalTapestry':
      return (
        <>
          <NeuronalTapestry />
        </>
      );
      break;
    case 'threadedTapestry':
      return (
        <>
          <ThreadedTapestry />
        </>
      );
      break;
    case 'tribalTapestry':
      return (
        <>
          <TribalTapestry />
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
