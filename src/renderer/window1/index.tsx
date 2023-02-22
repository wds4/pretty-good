import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';

// Initialize app with relevant sql data
const startApp = async () => {
  const sql_a = 'SELECT multiClientAccess FROM myNostrProfile LIMIT 1 ';
  const sql_b = 'SELECT banner_url FROM myNostrProfile LIMIT 1 ';
  const isColPresent_a = await asyncSql(sql_a);
  const isColPresent_b = await asyncSql(sql_b);
  if (!isColPresent_a) {
    const sql_a0 = 'ALTER TABLE myNostrProfile ADD multiClientAccess BOOLEAN false ';
    console.log("isColPresent_a is falsy; sql_a0: "+sql_a0)
    const fooA = await asyncSql(sql_a0);
  } else {
    console.log("isColPresent_a is truthy ")
  }
  if (!isColPresent_b) {
    const sql_b0 = 'ALTER TABLE myNostrProfile ADD banner_url TEXT null ';
    console.log("isColPresent_b is falsy; sql_b0: "+sql_b0)
    const fooB = await asyncSql(sql_b0);
  } else {
    console.log("isColPresent_b is truthy ")
  }

  const sql1 = 'SELECT * from relays ';
  const sql2 = 'SELECT * from nostrProfiles ';
  const aRelaysData = await asyncSql(sql1);
  const aProfilesData = await asyncSql(sql2);
  const aActive = [];
  for (let r = 0; r < aRelaysData.length; r += 1) {
    const oNextRelayData = aRelaysData[r];
    const { url, active } = oNextRelayData;
    if (active) {
      aActive.push(url);
    }
  }
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(
    <App
      relayUrls={aActive}
      aRelaysData={aRelaysData}
      aProfilesData={aProfilesData}
    />
  );
};
startApp();
/*
// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
*/
