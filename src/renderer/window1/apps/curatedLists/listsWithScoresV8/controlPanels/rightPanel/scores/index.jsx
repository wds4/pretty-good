import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
// import ItemList from './itemList';
import ItemList from 'renderer/window1/apps/curatedLists/viewIndividualCuratedList/graph/components/itemList';

const CalculationResults = ({
  aInstanceCompScoreData,
  aProfileCompScoreData,
}) => {
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
  return (
    <>
      <div style={{marginBottom: '10px'}}>
        <div style={{textAlign: 'center', fontSize: '12px'}}>* as determined by:</div>
        <div style={{}}>
          <span style={{textAlign: 'center', color: 'blue', fontSize: '18px'}}>
            <NavLink
              onClick={() => {
                dispatch(updateNostrProfileFocus(seedUser));
              }}
              to="/NostrHome/NostrViewProfile"
              className="goToUserProfileButton"
            >
              {seedUserName}
            </NavLink>
          </span>
          's grapevine
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <TabList>
            <Tab>items</Tab>
            <Tab>item scores</Tab>
            <Tab>curator scores</Tab>
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
      <div style={{textAlign: 'left', marginLeft: '20px', marginRight: '20px'}}>
        * As per DIP-00, there is no universal, preferred, 'correct' or
        'reference' list. Each list is in the eye of the beholder.
      </div>
    </>
  );
};
export default CalculationResults;
