import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';

const CalculationResults = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>profiles</Tab>
            <Tab>instances</Tab>
          </TabList>
          <TabPanel>
            <NostrProfileScores />
          </TabPanel>
          <TabPanel>
            <CuratedListInstanceScores />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default CalculationResults;
