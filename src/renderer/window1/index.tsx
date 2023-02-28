import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';
import { generateNewNostrKeys } from './lib/nostr';

// Initialize redux store from sql
const startApp = async () => {

  const sql_a = ' SELECT relaysAutoUpdate FROM myNostrProfile LIMIT 1 ';
  const isColPresent = await asyncSql(sql_a);
  if (isColPresent) {
    console.log("isColPresent is truthy")
  } else {
    const sql_b = ' ALTER TABLE myNostrProfile ADD relaysAutoUpdate BOOLEAN false ';
    console.log("isColPresent is NOT truthy; sql_b: "+sql_b)
    const fooB = await asyncSql(sql_b);
  }

  // LOAD myNostrProfiles - loads all of my profiles; currently I do not load all of them into redux so this query may be unnecessary
  const sql0 = 'SELECT * FROM myNostrProfile ';
  let aMyNostrProfilesData = await asyncSql(sql0);
  if (aMyNostrProfilesData.length == 0) {
    // make new profile
    const [sk, pk] = await generateNewNostrKeys(true)

    // now requery the database for aMyNostrProfilesData
    aMyNostrProfilesData = await asyncSql(sql0);
  }

  // LOAD myActiveNostrProfile
  const sql1 = 'SELECT * FROM myNostrProfile WHERE active = true ';
  const oMyActiveNostrProfileData = await asyncSql(sql1, 'get');

  // LOAD nostrProfiles
  const sql2 = 'SELECT * from nostrProfiles ';
  const aNostrProfilesData = await asyncSql(sql2);

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
      oMyActiveNostrProfileData={oMyActiveNostrProfileData}
      aMyNostrProfilesData={aMyNostrProfilesData}
      aNostrProfilesData={aNostrProfilesData}
      aNostrNotesData={aNostrNotesData}
      aNostrDirectMessagesData={aNostrDirectMessagesData}
    />
  );
};
startApp();
