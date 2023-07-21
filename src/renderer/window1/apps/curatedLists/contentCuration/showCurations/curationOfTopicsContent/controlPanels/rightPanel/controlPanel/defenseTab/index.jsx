import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Mod1Tab from './mod1Tab';
import Mod2Tab from './mod2Tab';
import Mod3Tab from './mod3Tab';

const DefenseTab = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Mod 1</Tab>
          <Tab>Mod 2</Tab>
          <Tab>Mod 3</Tab>
        </TabList>

        <TabPanel>
          <Mod1Tab />
        </TabPanel>
        <TabPanel>
          <Mod2Tab />
        </TabPanel>
        <TabPanel>
          <Mod3Tab />
        </TabPanel>
      </Tabs>
    </>
  );
};
export default DefenseTab;
