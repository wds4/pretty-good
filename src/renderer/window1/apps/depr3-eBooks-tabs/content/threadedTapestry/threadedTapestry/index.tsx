import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const SectionContent = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <div>
        <div>currentFocus.eBook: {currentFocus.eBook}</div>
        <Tabs>
          <TabList>
            <Tab>Single Sentence</Tab>
            <Tab>Single Paragraph</Tab>
            <Tab>Examples</Tab>
          </TabList>
          <TabPanel>Single Sentence Content</TabPanel>
          <TabPanel>Single Paragraph Content</TabPanel>
          <TabPanel>Examples Content</TabPanel>
        </Tabs>
      </div>
    </>
  );

};
export default SectionContent;
