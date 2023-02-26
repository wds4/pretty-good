import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';

// Initialize app with relevant sql data
const startApp = async () => {
  /*
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

  const sql_a = 'SELECT followingListLastUpdate FROM myNostrProfile LIMIT 1 ';
  const isColPresent_a = await asyncSql(sql_a);
  if (!isColPresent_a) {
    const sql_a0 = 'ALTER TABLE myNostrProfile ADD followingListLastUpdate INTEGER NULL ';
    console.log("isColPresent_a is falsy; sql_a0: "+sql_a0)
    const fooA = await asyncSql(sql_a0);
  } else {
    console.log("isColPresent_a is truthy ")
  }

  const sql_b = 'SELECT relaysListLastUpdate FROM myNostrProfile LIMIT 1 ';
  const isColPresent_b = await asyncSql(sql_b);
  if (!isColPresent_b) {
    const sql_b0 = 'ALTER TABLE myNostrProfile ADD relaysListLastUpdate INTEGER NULL ';
    console.log("isColPresent_b is falsy; sql_b0: "+sql_b0)
    const fooB = await asyncSql(sql_b0);
  } else {
    console.log("isColPresent_b is truthy ")
  }

  const sql_a = 'SELECT relays FROM myNostrProfile LIMIT 1 ';
  const isColPresent_a = await asyncSql(sql_a);
  if (!isColPresent_a) {
    const sql_a0 = 'ALTER TABLE myNostrProfile ADD relays TEXT NULL ';
    console.log("isColPresent_a is falsy; sql_a0: "+sql_a0)
    const fooA = await asyncSql(sql_a0);
  } else {
    console.log("isColPresent_a is truthy ")
  }
  */

  // LOAD myNostrProfile
  const sql1 = 'SELECT relays FROM myNostrProfile WHERE active = true ';
  const aRelaysData = await asyncSql(sql1);
  const oRelaysData = JSON.parse(aRelaysData[0].relays);
  const aActive = [];
  for (let r = 0; r < aRelaysData.length; r += 1) {
    const oNextRelayData = aRelaysData[r];
    const { url, active } = oNextRelayData;
    if (active) {
      aActive.push(url);
    }
  }

  // LOAD nostrProfiles
  const sql2 = 'SELECT * from nostrProfiles ';
  const aProfilesData = await asyncSql(sql2);

  // LOAD nostrNotes
  const sql3 = 'SELECT * from nostrNotes ';
  const aNostrNotesData = await asyncSql(sql3);

    // LOAD nostrDirectMessages
    const sql4 = 'SELECT * from nostrDirectMessages ';
    const aNostrDirectMessagesData = await asyncSql(sql4);

  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(
    <App
      relayUrls={aActive}
      oRelaysData={oRelaysData}
      aProfilesData={aProfilesData}
      aNostrNotesData={aNostrNotesData}
      aNostrDirectMessagesData={aNostrDirectMessagesData}
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
