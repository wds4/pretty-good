import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';

// Initialize redux store from sql
const startApp = async () => {

  // LOAD myActiveNostrProfile
  const sql0 = 'SELECT * FROM myNostrProfile WHERE active = true ';
  const oMyActiveNostrProfileData = await asyncSql(sql0, 'get');

  // LOAD myNostrProfiles - loads all of my profiles; currently I do not load all of them into redux so this query may be unnecessary
  const sql1 = 'SELECT * FROM myNostrProfile ';
  const aMyNostrProfilesData = await asyncSql(sql1);

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
