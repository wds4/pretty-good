import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EBookHeader from './eBookHeader';
import ChapterHeader from './chapterHeader';
import ThreadedTapestry from 'renderer/window1/apps/eBooks/content/threadedTapestry';

const EBook = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <EBookHeader />
      <ChapterHeader />
      <Tabs>
        <TabList>
          <Tab>Threaded Tapestry</Tab>
          <Tab>Book 2</Tab>
        </TabList>
        <TabPanel>
          <ThreadedTapestry />
        </TabPanel>
        <TabPanel>
          Book 2 Panel
        </TabPanel>
      </Tabs>
    </>
  );

};
export default EBook;
