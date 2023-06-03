import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import ItemList from 'renderer/window1/apps/curatedLists/viewIndividualCuratedList/graph/components/itemList';
import NostrProfileScores from './nostrProfileScores';
import CuratedListInstanceScores from './instanceScores';
import HeaderRedo from '../headerRedo';

const CalculationResultsRedo = ({
  aInstanceCompScoreData,
  aProfileCompScoreData,
  oMyNostrProfileData,
  nodes,
  aAllUserNodes,
  oNostrProfilesData,
  oCuratedListData,
  curatedListEventId,
}) => {
  const devMode6 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode6
  );
  let displayTabs = 'none';
  if (devMode6) {
    displayTabs = 'block';
  }
  return (
    <>
      <HeaderRedo
        oNostrProfilesData={oNostrProfilesData}
        oMyNostrProfileData={oMyNostrProfileData}
        nodes={nodes}
        aAllUserNodes={aAllUserNodes}
        aProfileCompScoreData={aProfileCompScoreData}
        oCuratedListData={oCuratedListData}
        curatedListEventId={curatedListEventId}
      />
      <div style={{ textAlign: 'center' }}>
        <Tabs>
          <div style={{ display: displayTabs }}>
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
      <div
        style={{
          textAlign: 'left',
          marginLeft: '20px',
          marginRight: '20px',
          color: 'grey',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'none', marginBottom: '5px' }}>
          As per{' '}
          <a
            href="https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/00.md"
            target="_blank"
            rel="noreferrer"
          >
            DIP-00
          </a>
          , there is no universal, preferred, 'correct' or 'reference' list.
          Each list is curated from the perspective of the grapevine's seed
          user.
        </div>
        <div style={{display: 'none'}}>
          * Plant the grapevine around a different seed user to see whether list
          items change or stay the same.
        </div>
      </div>
    </>
  );
};
export default CalculationResultsRedo;
