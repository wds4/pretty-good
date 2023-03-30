import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CalculationResults from './scores';
import ControlPanel from './controlPanel';

const RightPanel = ({
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
            <Tab>Results</Tab>
            <Tab>Control Panel</Tab>
          </TabList>
          <div style={{ fontSize: '12px' }}>
            <TabPanel>
              <CalculationResults
                curatedListFocusID={curatedListFocusID}
                oListData={oListData}
                aCuratedListInstances={aCuratedListInstances}
                aInstanceCompScoreData={aInstanceCompScoreData}
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
