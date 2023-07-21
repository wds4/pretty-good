import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UsersTab from './usersTab';
import InstancesTab from './instancesTab';
import DisplayTab from './displayTab';
import GrapevineTweaksTab from './grapevineTweaksTab';

const ControlPanel = () => {
  return (
    <>
      <div style={{ marginBottom: '5px', textAlign: 'left' }}>
        There are several adjustable parameters that influence the calculation of
        scores, including the attenuation factor (above), the seed user (above),
        and others in the tabs below.
      </div>
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Items</Tab>
          <Tab>Display</Tab>
          <Tab>sybil mitigation</Tab>
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
