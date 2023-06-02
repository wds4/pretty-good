import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import ControlPanel from './controlPanels/rightPanel/controlPanel';
import ListSelectButton from './listSelectButton';

const CuratedLists = ({ aListsData }) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  return (
    <>
      <div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          Curated Lists
        </div>

        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: 'grey',
            fontSize: '12px',
          }}
        >
          Anyone can{' '}
          <span style={{ color: 'blue' }}>
            <NavLink
              onClick={() => {
                // dispatch(updateCuratedListFocus());
              }}
              end
              to="/CuratedListsHome/CreateNewCuratedList"
              style={{ textDecoration: 'none' }}
            >
              submit
            </NavLink>
          </span>{' '}
           a new list to the nostr network.
        </div>

        <div style={{ textAlign: 'left', marginBottom: '5px' }}>
          <div style={{ color: 'grey', fontSize: '10px' }}>
            Search lists by name, description, or event ID
          </div>
          <textarea
            style={{ width: '98%', height: '20px', marginBottom: '5px' }}
            onChange={handleChange}
          />
        </div>
        {aListsData.map((oListData) => {
          return (
            <>
              <div>
                <ListSelectButton
                  searchString={searchString}
                  oListData={oListData}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

const ListsAndControlPanel = ({ aListsData }) => {
  return (
    <>
      <div>
        <Tabs>
          <div style={{ display: 'none' }}>
            <TabList>
              <Tab>Curated Lists</Tab>
              <Tab>Control Panel</Tab>
            </TabList>
          </div>
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
  );
};

export default ListsAndControlPanel;
