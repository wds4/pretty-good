import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ItemList from 'renderer/window1/apps/curatedLists/viewIndividualCuratedList/graph/components/itemList';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
// import ItemList from './itemList';

const CalculationResults = ({
  curatedListFocusID,
  oListData,
  aCuratedListInstances,
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
            <ItemList aInstanceCompScoreData={aInstanceCompScoreData} />
          </TabPanel>
          <TabPanel>
            <CuratedListInstanceScores
              curatedListFocusID={curatedListFocusID}
              oListData={oListData}
              aCuratedListInstances={aCuratedListInstances}
              aInstanceCompScoreData={aInstanceCompScoreData}
            />
          </TabPanel>
          <TabPanel>
            <NostrProfileScores aProfileCompScoreData={aProfileCompScoreData} />
          </TabPanel>
        </Tabs>
      </div>

      <div style={{ marginBottom: '10px', textAlign: 'left' }}>
        <center>scoring overview</center>
        List items are placed in one of three bins (accepted, rejected, or
        pending) based on their average scores and the amount of input they have
        received. Endorsements of list items (thumbs up or down) are used to
        calculate average scores. Endorsements of users as curators are used
        to determine how much influence any given user has.
      </div>

      <div
        style={{ display: 'none', textAlign: 'left', marginLeft: '20px', marginRight: '20px' }}
      >
        * As per DIP-00, there is no universal, preferred, 'correct' or
        'reference' list. Each list is in the eye of the beholder.
      </div>
    </>
  );
};
export default CalculationResults;
