import { useSelector } from 'react-redux';
import ThreadedTapestry from 'renderer/window1/apps/eBooks/content/threadedTapestry/threadedTapestry';

const Section = () => {

  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  const changeVersion = () => {
    console.log('changeVersion');
  };

  const sectionUrl = "src/renderer/window1/apps/eBooks/books/threadedTapestry/threadedTapestry/"+versionSlug+".md";

  switch(versionSlug) {
    case "singleSentence":
      return (
        <>
          <div style={{ border: '1px solid purple', padding: '5px' }}>
            <div>{versionSlug}</div>
            sectionUrl={sectionUrl}
            <ThreadedTapestry />
          </div>
        </>
      );
      break;
    default:
      return (
        <>
          <div style={{ border: '1px solid purple', padding: '5px' }}>
            <div>{versionSlug}</div>
            sectionUrl={sectionUrl}
          </div>
        </>
      );
  }
};
export default Section;
