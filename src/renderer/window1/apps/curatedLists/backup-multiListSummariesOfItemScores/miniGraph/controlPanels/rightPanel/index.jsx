import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CalculationResults from './scores';
import ControlPanel from './controlPanel';
import Header from './header';

const RightPanel = ({
  curatedListFocusID,
  oListData,
  aCuratedListInstances,
  aInstanceCompScoreData,
  aProfileCompScoreData,
  nodes,
  edges,
  aAllUserNodes,
  aAllInstanceNodes,
}) => {
  return (
    <>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Header
          oListData={oListData}
        />
        <div>B number of items: {aCuratedListInstances.length}</div>
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
                aProfileCompScoreData={aProfileCompScoreData}
                nodes={nodes}
                edges={edges}
                aAllUserNodes={aAllUserNodes}
                aAllInstanceNodes={aAllInstanceNodes}
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
