import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';
import { generateNewNostrKeys } from './lib/nostr';

// Initialize redux store from sql
const startApp = async () => {
  // need to remove relaysAutoMerge from nostrProfiles

  /*
  const sql0_a = ' SELECT devModes FROM myNostrProfile LIMIT 1 ';
  const isColPresent0 = await asyncSql(sql0_a);
  if (isColPresent0) {
    console.log("isColPresent0 devModes is truthy")
  } else {
    const sql0_b = ' ALTER TABLE myNostrProfile ADD devModes STRING null ';
    console.log("isColPresent0 devModes is NOT truthy; sql0_b: "+sql0_b)
    const fooB = await asyncSql(sql0_b);
  }
  */

  /*
  const sql0_a = ' SELECT relaysAutoMerge FROM myNostrProfile LIMIT 1 ';
  const isColPresent0 = await asyncSql(sql0_a);
  if (isColPresent0) {
    console.log("isColPresent0 relaysAutoMerge is truthy")
  } else {
    const sql0_b = ' ALTER TABLE myNostrProfile ADD relaysAutoMerge BOOLEAN false ';
    console.log("isColPresent0 relaysAutoMerge is NOT truthy; sql0_b: "+sql0_b)
    const fooB = await asyncSql(sql0_b);
  }

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

  const sql3_a = ' SELECT endorseAsNostCuratedListCurator FROM myNostrProfile LIMIT 1 ';
  const isColPresent3 = await asyncSql(sql3_a);
  if (isColPresent3) {
    console.log("isColPresent3 endorseAsNostCuratedListCurator is truthy")
  } else {
    const sql3_b = ' ALTER TABLE myNostrProfile ADD endorseAsNostCuratedListCurator TEXT null ';
    console.log("isColPresent3 endorseAsNostCuratedListCurator is NOT truthy; sql3_b: "+sql3_b)
    const fooB = await asyncSql(sql3_b);
  }
  */

  const sql4_a = ' SELECT autoImportNip51 FROM myNostrProfile LIMIT 1 ';
  const isColPresent4 = await asyncSql(sql4_a);
  if (isColPresent4) {
    console.log("isColPresent4 autoImportNip51 is truthy")
  } else {
    const sql4_b = ' ALTER TABLE myNostrProfile ADD autoImportNip51 BOOLEAN true ';
    console.log("isColPresent4 autoImportNip51 is NOT truthy; sql4_b: "+sql4_b)
    const fooB = await asyncSql(sql4_b);
  }

  const sql5_a = ' SELECT curatedChannelsData FROM myNostrProfile LIMIT 1 ';
  const isColPresent5 = await asyncSql(sql5_a);
  if (isColPresent5) {
    console.log("isColPresent5 curatedChannelsData is truthy")
  } else {
    const sql5_b = ' ALTER TABLE myNostrProfile ADD curatedChannelsData BOOLEAN true ';
    console.log("isColPresent5 curatedChannelsData is NOT truthy; sql5_b: "+sql5_b)
    const fooB = await asyncSql(sql5_b);
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

  // LOAD testnetListCurationRatings
  const sql5 = 'SELECT * from testnetListCurationRatings ';
  const aNostrTestnetListCurationRatings = await asyncSql(sql5);

  // LOAD curatedLists
  const sql6 = 'SELECT * from curatedLists ';
  const aCuratedListsData = await asyncSql(sql6);

  // LOAD curatedListInstances
  const sql7 = 'SELECT * from curatedListInstances ';
  const aCuratedListInstancesData = await asyncSql(sql7);

  // LOAD ratingsOfCuratedListInstances
  const sql8 = 'SELECT * from ratingsOfCuratedListInstances ';
  const aRatingsOfCuratedListInstancesData = await asyncSql(sql8);

  // LOAD endorsementsOfCurators
  const sql9 = 'SELECT * from endorsementsOfCurators ';
  const aEndorsementsOfCuratorsData = await asyncSql(sql9);

  // LOAD endorsementsOfCurators
  const sql10 = 'SELECT * from nip51Lists ';
  const aNip51ListsData = await asyncSql(sql10);

  /*
  // TABLES (as of 29 Aug 2023)
  0 nostrProfiles (sql2)
  1 followingNetwork
  2 myNostrProfile (sql1)
  3 relays
  4 nostrDirectMessages (sql4)
  5 nostrNotes (sql3)
  6 testnetListCurationRatings (sql5)
  7 curatedLists (sql6)
  8 curatedListInstances (sql7)
  9 ratingsOfCuratedListInstances (sql8)
  10 endorsementsOfCurators (sql9)
  11. nip51Lists (sql10)
  */

  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(
    <App
      oMyActiveNostrProfileData={oMyActiveNostrProfileData}
      aMyNostrProfilesData={aMyNostrProfilesData}
      aNostrProfilesData={aNostrProfilesData}
      aNostrNotesData={aNostrNotesData}
      aNostrDirectMessagesData={aNostrDirectMessagesData}
      aNostrTestnetListCurationRatings={aNostrTestnetListCurationRatings}
      aCuratedListsData={aCuratedListsData}
      aCuratedListInstancesData={aCuratedListInstancesData}
      aRatingsOfCuratedListInstancesData={aRatingsOfCuratedListInstancesData}
      aEndorsementsOfCuratorsData={aEndorsementsOfCuratorsData}
      aNip51ListsData={aNip51ListsData}
    />
  );
};
startApp();
