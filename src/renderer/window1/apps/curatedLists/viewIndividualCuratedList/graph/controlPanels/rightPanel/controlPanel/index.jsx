import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UsersTab from './usersTab';
import InstancesTab from './instancesTab';
import DisplayTab from './displayTab';
import GrapevineTweaksTab from './grapevineTweaksTab';

const ControlPanel = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Instances</Tab>
          <Tab>Display</Tab>
          <Tab>Tweak Calculations</Tab>
        </TabList>

        <TabPanel>
          <UsersTab />
        </TabPanel>
        <TabPanel>
          <InstancesTab />
        </TabPanel>
        <TabPanel>
          <DisplayTab />
        </TabPanel>
        <TabPanel>
          <GrapevineTweaksTab />
        </TabPanel>
      </Tabs>
    </>
  );
};
export default ControlPanel;
