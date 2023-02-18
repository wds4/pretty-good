import { createRoot } from 'react-dom/client';
import App from './App';
import { asyncSql } from './lib/pg/asyncSql';

// Initialize app with relevant sql data
const startApp = async () => {
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
