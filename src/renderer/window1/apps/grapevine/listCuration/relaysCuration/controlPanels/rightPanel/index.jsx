import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CalculationResults from './scores';
import ControlPanel from './controlPanel';

const RightPanel = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>Scores</Tab>
            <Tab>Control Panel</Tab>
          </TabList>
          <div style={{ fontSize: '12px' }}>
            <TabPanel>
              <CalculationResults />
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
