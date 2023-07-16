import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ItemList from './itemList';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
// import ItemList from './itemList';

const CalculationResults = ({
  aInstanceCompScoreData,
  aProfileCompScoreData,
}) => {
  const dispatch = useDispatch();
  const { seedUser } = useSelector((state) => state.controlPanelSettings);
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
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>items</Tab>
            <Tab>item scores</Tab>
            <Tab>curator scores</Tab>
          </TabList>
          <TabPanel>
            <ItemList
              aInstanceCompScoreData={aInstanceCompScoreData}
            />
          </TabPanel>
          <TabPanel>
            <CuratedListInstanceScores
              aInstanceCompScoreData={aInstanceCompScoreData}
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
