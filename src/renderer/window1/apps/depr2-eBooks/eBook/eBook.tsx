import { useSelector } from 'react-redux';
import EBookHeader from './eBookHeader';
import ChapterHeader from './chapterHeader';
import SectionSelector from './sectionSelector';
import Section from './section';

const EBook = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <EBookHeader />
      <ChapterHeader />
      <SectionSelector />
      <Section />
    </>
  );

};
export default EBook;
