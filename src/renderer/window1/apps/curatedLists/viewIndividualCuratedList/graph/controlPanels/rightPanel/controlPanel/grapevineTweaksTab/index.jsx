import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DefenseTab from '../defenseTab';
import BasicTab from '../basicTab';
import OverviewTab from '../overviewTab';

const GrapevineTweaksTab = () => {
  return (
    <>
      <div style={{ marginBottom: '5px' }}>
        Tweak the details of how user 'trust' scores are calculated by the
        Grapevine.
      </div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Basic</Tab>
          <Tab>Defense</Tab>
        </TabList>

        <TabPanel>
          <OverviewTab />
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
export default GrapevineTweaksTab;
