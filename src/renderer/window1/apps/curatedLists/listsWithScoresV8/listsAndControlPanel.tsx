import ControlPanel from './controlPanels/rightPanel/controlPanel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ListSelectButton from './listSelectButton';

const CuratedLists = ({aListsData}) => {
  return (
    <>
      <div>
        {aListsData.map((oListData) => {
          return (
            <>
              <div>
                <ListSelectButton oListData={oListData} />
              </div>
            </>
          );
        })}
      </div>
    </>
  )
}

const ListsAndControlPanel = ({aListsData}) => {
  return (
    <>
      <div>
        <Tabs>
          <TabList>
            <Tab>Curated Lists</Tab>
            <Tab>Control Panel</Tab>
          </TabList>
          <TabPanel>
            <CuratedLists aListsData={aListsData} />
          </TabPanel>
          <TabPanel>
            <div
              style={{
                width: '100%',
                maxHeight: '400px',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              <ControlPanel />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  )
}

export default ListsAndControlPanel;
