import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ThreadedTapestry from './threadedTapestry';

const BookSection = () => {
  const dispatch = useDispatch();
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <div>
        <div>currentFocus.eBook: {currentFocus.eBook}</div>
        <Tabs>
          <TabList>
            <Tab>Threaded Tapestry</Tab>
            <Tab>Concept Graph</Tab>
            <Tab>Grapevine</Tab>
          </TabList>
          <TabPanel><ThreadedTapestry /></TabPanel>
          <TabPanel>Concept Graph Panel</TabPanel>
          <TabPanel>Grapevine Panel</TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default BookSection;
