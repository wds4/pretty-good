import { useSelector } from 'react-redux';
import BookHeader from './eBookHeader';
import PreviousTopicButton from './previousTopicButton';
import ChapterHeader from './chapterHeader';
import SectionSelector from './sectionSelector';
import Content from './content';

const EBook = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;

  const oItems = oEBooks[eBookSlug].items;
  const aItems = Object.keys(oItems);

  return (
    <>
      <div>
        <BookHeader />
        <ChapterHeader />
        <SectionSelector />
        <div style={{ border: '0px solid purple', padding: '5px' }}>
          <Content />
        </div>
      </div>
    </>
  );

};
export default EBook;
