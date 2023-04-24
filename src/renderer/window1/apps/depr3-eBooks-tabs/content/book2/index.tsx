import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
            <Tab>Section 1</Tab>
            <Tab>Section 2</Tab>
          </TabList>
          <TabPanel>Section 1 Panel</TabPanel>
          <TabPanel>Section 2 Panel</TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default BookSection;
