import { useSelector } from 'react-redux';

import Chunk from './chunk';
import ClassCriteria from './classCriteria';
import ClassNode from './classNode';
import ClassThread from './classThread';
import Concept from './concept';
import ConceptGraph from './conceptGraph';
import DataDuality from './dataDuality';
import DecentralizedDistributedSystem from './decentralizedDistributedSystem';
import Grapevine from './grapevine';
import KnowledgeCuration from './knowledgeCuration';
import KnowledgeRepresentation from './knowledgeRepresentation';
import LockInMinimization from './lockInMinimization';
import LooseConsensus from './looseConsensus';
import NeuronalTapestry from './neuronalTapestry';
import PrimaryChallenge from './primaryChallenge';
import SetNode from './setNode';
import SpecificInstance from './specificInstance';
import Thread from './thread';
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
    case 'chunk':
      return (
        <>
          <Chunk />
        </>
      );
      break;
    case 'classCriteria':
      return (
        <>
          <ClassCriteria />
        </>
      );
      break;
    case 'classNode':
      return (
        <>
          <ClassNode />
        </>
      );
      break;
    case 'classThread':
      return (
        <>
          <ClassThread />
        </>
      );
      break;
    case 'concept':
      return (
        <>
          <Concept />
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
    case 'dataDuality':
      return (
        <>
          <DataDuality />
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
    case 'looseConsensus':
      return (
        <>
          <LooseConsensus />
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
    case 'setNode':
      return (
        <>
          <SetNode />
        </>
      );
      break;
    case 'primaryChallenge':
      return (
        <>
          <PrimaryChallenge />
        </>
      );
      break;
    case 'specificInstance':
      return (
        <>
          <SpecificInstance />
        </>
      );
      break;
    case 'thread':
      return (
        <>
          <Thread />
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
