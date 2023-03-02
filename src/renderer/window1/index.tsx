import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';
import { generateNewNostrKeys } from './lib/nostr';

// Initialize redux store from sql
const startApp = async () => {
  // need to remove relaysAutoMerge from nostrProfiles

  const sql0_a = ' SELECT relaysAutoMerge FROM myNostrProfile LIMIT 1 ';
  const isColPresent0 = await asyncSql(sql0_a);
  if (isColPresent0) {
    console.log("isColPresent0 relaysAutoMerge is truthy")
  } else {
    const sql0_b = ' ALTER TABLE myNostrProfile ADD relaysAutoMerge BOOLEAN false ';
    console.log("isColPresent0 relaysAutoMerge is NOT truthy; sql0_b: "+sql0_b)
    const fooB = await asyncSql(sql0_b);
  }

  /*
  const sql1_a = ' SELECT endorseAsRelaysPicker FROM myNostrProfile LIMIT 1 ';
  const isColPresent1 = await asyncSql(sql1_a);
  if (isColPresent1) {
    console.log("isColPresent1 endorseAsRelaysPicker is truthy")
  } else {
    const sql1_b = ' ALTER TABLE myNostrProfile ADD endorseAsRelaysPicker TEXT null ';
    console.log("isColPresent1 endorseAsRelaysPicker is NOT truthy; sql1_b: "+sql1_b)
    const fooB = await asyncSql(sql1_b);
  }

  const sql2_a = ' SELECT endorseAsRelaysPickerHunter FROM myNostrProfile LIMIT 1 ';
  const isColPresent2 = await asyncSql(sql2_a);
  if (isColPresent2) {
    console.log("isColPresent2 endorseAsRelaysPickerHunter is truthy")
  } else {
    const sql2_b = ' ALTER TABLE myNostrProfile ADD endorseAsRelaysPickerHunter TEXT null ';
    console.log("isColPresent2 endorseAsRelaysPickerHunter is NOT truthy; sql2_b: "+sql2_b)
    const fooB = await asyncSql(sql2_b);
  }
  */
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
