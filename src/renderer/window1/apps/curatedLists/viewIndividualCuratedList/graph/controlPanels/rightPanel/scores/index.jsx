import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';

const CalculationResults = ({
  curatedListFocusID,
  oListData,
  aCuratedListInstances,
  aInstanceCompScoreData,
}) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>instances</Tab>
            <Tab>profiles</Tab>
          </TabList>
          <TabPanel>
            <CuratedListInstanceScores
              curatedListFocusID={curatedListFocusID}
              oListData={oListData}
              aCuratedListInstances={aCuratedListInstances}
              aInstanceCompScoreData={aInstanceCompScoreData}
            />
          </TabPanel>
          <TabPanel>
            <NostrProfileScores />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default CalculationResults;
