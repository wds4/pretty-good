/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sqlite from 'sqlite3';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import webpackPaths from '../../.erb/configs/webpack.paths';

const sqlite3 = sqlite.verbose();

const win1 = true;
const win2 = true;
const win3 = true;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('asynchronous-sql-command', async (event, sql) => {
  db.all(sql, (err, result) => {
    event.reply('asynchronous-sql-reply', result);
  });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const databaseName = 'myCoolDatabase.sqlite3';
const sqlPathDev = path.join(webpackPaths.appPath, 'sql', databaseName);
const sqlPathProd = path.join(app.getPath('userData'), databaseName);
const sqlPath = isDebug ? sqlPathDev : sqlPathProd;

const sqlPathsInfo = [sqlPath, sqlPathDev, sqlPathProd, isDebug];
ipcMain.on('ipc-show-userDataPaths', async (event, arg) => {
  event.reply('ipc-show-userDataPaths', sqlPathsInfo);
});

const db = new sqlite3.Database(sqlPath, (err) => {
  if (err) console.error('Database opening error: ', err);
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS myCoolTable (info TEXT NULL)');
});

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindows = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  /// ////////////// WINDOW 1 //////////////////
  if (win1) {
    let window1: BrowserWindow | null = null;
    window1 = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    window1.loadURL(resolveHtmlPath('index1.html'));

    window1.on('ready-to-show', () => {
      if (!window1) {
        throw new Error('"window1" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        window1.minimize();
      } else {
        window1.show();
      }
    });

    window1.on('closed', () => {
      window1 = null;
    });

    const menuBuilder1 = new MenuBuilder(window1);
    menuBuilder1.buildMenu();

    // Open urls in the user's browser
    window1.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  /// ////////////// WINDOW 2 //////////////////
  if (win2) {
    let window2: BrowserWindow | null = null;
    window2 = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    window2.loadURL(resolveHtmlPath('index2.html'));

    window2.on('ready-to-show', () => {
      if (!window2) {
        throw new Error('"window2" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        window2.minimize();
      } else {
        window2.show();
      }
    });

    window2.on('closed', () => {
      window2 = null;
    });

    const menuBuilder2 = new MenuBuilder(window2);
    menuBuilder2.buildMenu();

    // Open urls in the user's browser
    window2.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  /// ////////////// WINDOW 3 //////////////////
  if (win3) {
    let window3: BrowserWindow | null = null;
    window3 = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    window3.loadURL(resolveHtmlPath('index3.html'));

    window3.on('ready-to-show', () => {
      if (!window3) {
        throw new Error('"window3" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        window3.minimize();
      } else {
        window3.show();
      }
    });

    window3.on('closed', () => {
      window3 = null;
    });

    const menuBuilder3 = new MenuBuilder(window3);
    menuBuilder3.buildMenu();

    // Open urls in the user's browser
    window3.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  db.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindows();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (window1 === null || window2 === null || window3 === null) {
        createWindows();
      }
    });
  })
  .catch(console.log);
