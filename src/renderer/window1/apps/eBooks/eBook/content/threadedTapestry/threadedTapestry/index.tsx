import { useSelector } from 'react-redux';
import SingleSentence from './singleSentence';
import SingleParagraph from './singleParagraph';
import SinglePage from './singlePage';
import SingleChapter from './singleChapter';
import Notes from './notes';

const Content = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  switch (versionSlug) {
    case 'singleSentence':
      return (
        <>
          <SingleSentence />
        </>
      );
      break;
    case 'singleParagraph':
      return (
        <>
          <SingleParagraph />
        </>
      );
      break;
    case 'singlePage':
      return (
        <>
          <SinglePage />
        </>
      );
      break;
    case 'singleChapter':
      return (
        <>
          <SingleChapter />
        </>
      );
      break;
    case 'notes':
      return (
        <>
          <Notes />
        </>
      );
      break;
    default:
      return (
        <>
          <div>{versionSlug}</div>
        </>
      );
  }
};
export default Content;
