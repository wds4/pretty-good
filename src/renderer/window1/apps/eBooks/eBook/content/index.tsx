import { useSelector } from 'react-redux';
import ThreadedTapestry from './threadedTapestry';

const ContentBookSelector = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  switch(eBookSlug) {
    case "threadedTapestry":
      return (
        <>
          <ThreadedTapestry />
        </>
      );
      break;
    case "book2":
      return (
        <>
          <div>book: {eBookSlug}</div>
        </>
      );
      break;
    default:
      return (
        <>
          <div>book: {eBookSlug}</div>
        </>
      );
  }
};
export default ContentBookSelector;
