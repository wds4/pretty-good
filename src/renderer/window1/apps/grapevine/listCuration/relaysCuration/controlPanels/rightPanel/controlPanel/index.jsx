import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UsersTab from './usersTab';
import DefenseTab from './defenseTab';
import BasicTab from './basicTab';
import DisplayTab from './displayTab';

const ControlPanel = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Display</Tab>
          <Tab>Basic</Tab>
          <Tab>Defense</Tab>
        </TabList>

        <TabPanel>
          <UsersTab />
        </TabPanel>
        <TabPanel>
          <DisplayTab />
        </TabPanel>
        <TabPanel>
          <BasicTab />
        </TabPanel>
        <TabPanel>
          <DefenseTab />
        </TabPanel>
      </Tabs>
    </>
  );
};
export default ControlPanel;
