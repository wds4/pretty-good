import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const CalculationResults = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>Recommended Relays</Tab>
            <Tab>Relay Lists</Tab>
            <Tab>RL-Curator Hunters</Tab>
          </TabList>

          <TabPanel>Recommended Relays</TabPanel>
          <TabPanel>Relay List Curator Scores</TabPanel>
          <TabPanel>Relay List Curator Hunter Scores</TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default CalculationResults;
