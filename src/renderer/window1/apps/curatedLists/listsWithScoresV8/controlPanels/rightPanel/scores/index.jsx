import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
// import ItemList from './itemList';
import ItemList from 'renderer/window1/apps/curatedLists/viewIndividualCuratedList/graph/components/itemList';
import SeedUserSelector from '../../topControlPanel/seedUserSelector';
import Header from '../header';

const CalculationResults = ({
  aInstanceCompScoreData,
  aProfileCompScoreData,
  oMyNostrProfileData,
  nodes,
  aAllUserNodes,
  oListData,
}) => {
  /*
  const dispatch = useDispatch();
  const { seedUser } = useSelector(
    (state) => state.controlPanelSettings
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let seedUserName = seedUser;
  if (nostrProfiles.hasOwnProperty(seedUser)) {
    const profileContent = JSON.parse(nostrProfiles[seedUser].content);
    const name = `@${profileContent.name}`;
    const displayName = profileContent.display_name;
    seedUserName = name;
  }
  if (!seedUserName) {
    seedUserName = seedUser;
  }
  */
  return (
    <>
      <Header
        oListData={oListData}
        oMyNostrProfileData={oMyNostrProfileData}
        nodes={nodes}
        aAllUserNodes={aAllUserNodes}
        aProfileCompScoreData={aProfileCompScoreData}
      />
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <div style={{display: 'none'}}>
          <TabList>
            <Tab>items</Tab>
            <Tab>item scores</Tab>
            <Tab>curator scores</Tab>
          </TabList>
          </div>
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
      <div style={{textAlign: 'left', marginLeft: '20px', marginRight: '20px', color: 'grey', fontSize: '12px'}}>
        * As per <a href="https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/00.md" target="_blank">DIP-00</a>, there is no universal, preferred, 'correct' or
        'reference' list. Each list is curated from the perspective of the grapevine's seed user.
      </div>
    </>
  );
};
export default CalculationResults;
