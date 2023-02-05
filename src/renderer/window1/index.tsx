import { createRoot } from 'react-dom/client';
import App from './App';

const startApp = (aRelaysData) => {
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
  root.render(<App relayUrls={aActive} aRelaysData={aRelaysData} />);
};

window.electron.ipcRenderer.once('ipc-fetch-relays', (relayUrls) => {
  console.log(`ipc-fetch-relays;  relayUrls: ${relayUrls}`);
  // ought to be able to get rid of window.relayUrls by:
  // sending relayUrls to App where it is handed to NostrProvider (done)
  // adding to redux store (where? able to add it here?) (not yet done)
  // window.relayUrls = relayUrls;
  startApp(relayUrls);
});
window.electron.ipcRenderer.sendMessage('ipc-fetch-relays', ['ping']);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
