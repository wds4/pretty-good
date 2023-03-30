import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DefenseTab from '../defenseTab';
import BasicTab from '../basicTab';
import OverviewTab from '../overviewTab';

const GrapevineTweaksTab = () => {
  return (
    <>
      <div style={{ textAlign: 'left', marginBottom: '5px' }}>
        Calculation of user 'trust' scores using the method of the Grapevine is
        subject to sybil and other methods of attack by bad actors. Several
        strategies have been introduced to mitigate these attacks. Each of these
        strategies makes use of parameters that can be adjusted to be more or
        less aggressive depending on the threat level and the nature of the
        attack. For most purposes, the default settings for each of these
        parameters will be sufficient.
      </div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Rigor</Tab>
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
