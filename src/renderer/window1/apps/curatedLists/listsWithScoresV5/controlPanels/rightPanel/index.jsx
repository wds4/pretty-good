import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CalculationResults from './scores';
import ControlPanel from './controlPanel';
import Header from './header';

/*
<div>B number of items: {aInstanceCompScoreData.length}</div>
<Tabs>
  <TabList>
    <Tab>Results</Tab>
    <Tab>Control Panel</Tab>
  </TabList>
  <div style={{ fontSize: '12px' }}>
    <TabPanel>
      <CalculationResults
        aInstanceCompScoreData={aInstanceCompScoreData}
        aProfileCompScoreData={aProfileCompScoreData}
      />
    </TabPanel>
    <TabPanel>
      <ControlPanel />
    </TabPanel>
  </div>
</Tabs>
*/

const RightPanel = ({
  oListData,
  aInstanceCompScoreData,
  aProfileCompScoreData,
}) => {
  return (
    <>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Header
          oListData={oListData}
        />
        <Tabs>
          <TabList>
            <Tab>Results</Tab>
            <Tab>Control Panel</Tab>
          </TabList>
          <div style={{ fontSize: '12px' }}>
            <TabPanel>
              <CalculationResults
                aInstanceCompScoreData={aInstanceCompScoreData}
                aProfileCompScoreData={aProfileCompScoreData}
              />
            </TabPanel>
            <TabPanel>
              <ControlPanel />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </>
  );
};
export default RightPanel;
