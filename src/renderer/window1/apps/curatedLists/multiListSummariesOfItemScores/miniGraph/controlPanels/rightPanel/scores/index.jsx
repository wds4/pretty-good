import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';

const CalculationResults = ({
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
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>items</Tab>
            <Tab>Curator trust scores</Tab>
          </TabList>
          <TabPanel>
            <CuratedListInstanceScores
              curatedListFocusID={curatedListFocusID}
              oListData={oListData}
              aCuratedListInstances={aCuratedListInstances}
              aInstanceCompScoreData={aInstanceCompScoreData}
              nodes={nodes}
              edges={edges}
              aAllUserNodes={aAllUserNodes}
              aAllInstanceNodes={aAllInstanceNodes}
            />
          </TabPanel>
          <TabPanel>
            <NostrProfileScores
              aProfileCompScoreData={aProfileCompScoreData}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
export default CalculationResults;
