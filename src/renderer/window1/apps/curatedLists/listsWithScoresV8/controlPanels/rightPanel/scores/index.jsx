import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
import ItemList from './itemList';

const CalculationResults = ({
  aInstanceCompScoreData,
  aProfileCompScoreData,
}) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>items</Tab>
            <Tab>item scores</Tab>
            <Tab>Curator trust scores</Tab>
          </TabList>
          <TabPanel>
            <ItemList aInstanceCompScoreData={aInstanceCompScoreData} />
          </TabPanel>
          <TabPanel>
            <CuratedListInstanceScores
              aInstanceCompScoreData={aInstanceCompScoreData}
            />
          </TabPanel>
          <TabPanel>
            <NostrProfileScores aProfileCompScoreData={aProfileCompScoreData} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default CalculationResults;
