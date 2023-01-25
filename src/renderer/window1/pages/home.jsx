import React from 'react';
import Masthead from './mastheads/mainMasthead';
import LeftNavbar from './navbars/leftNav';
import * as MiscAppFxns from './lib/app/misc';

const { updateMainColWidth } = MiscAppFxns;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    window.electron.ipcRenderer.once('ipc-show-userDataPaths', (arg) => {
      document.getElementById('dbLocationContainer').innerHTML = arg[0];
      document.getElementById('dbLocationDevContainer').innerHTML = arg[1];
      document.getElementById('dbLocationProdContainer').innerHTML = arg[2];
      const devMode = arg[3];
      if (devMode) {
        document.getElementById('devModeContainer').innerHTML = 'developer';
      }
      if (!devMode) {
        document.getElementById('devModeContainer').innerHTML = 'production';
      }
    });
    window.electron.ipcRenderer.sendMessage('ipc-show-userDataPaths');
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <div className="h4">What is this?</div>

            <div className="infoItem">
              A fork of electron-react-boilerplate with sqlite3 subsequently
              added. Unlike some other similar templates, the database is ready
              to be accessed on the front end (renderer process) using IPC. In
              addition, it's ready to be packaged (doesn't just work in dev
              mode) and avoids a particularly thorny problem with packaged apps
              involving whether your app has write access.
            </div>

            <div className="infoItem">
              There were several complex problems to solve to achieve these two
              goals. You can learn a lot about electron by going through the
              process of forking erb and adding sqlite3 as I did (see my
              README.md). But if you just wanna get started with sqlite3 and
              electron and build your amazing app, this template should be good
              to go.
            </div>

            <br />

            <div className="h4">How it works</div>

            <div className="infoItem">
              A demo sqlite3 database is created at startup in the main process
              (<span style={{ color: 'green' }}>src/main/main.ts</span>).
            </div>

            <div className="infoItem">
              The database is made accessible to the renderer process by using
              IPC to communicate between the two processes. This requires the
              following edits to erb:
              <li>
                Definition of the function asyncSql (see:{' '}
                <span style={{ color: 'green' }}>src/renderer/index.tsx</span>)
              </li>
              <li>
                The listener ipcMain.on('asynchronous-sql-command' ... (
                <span style={{ color: 'green' }}>src/main/main.ts</span>)
              </li>
              <li>
                Use of asyncSql on the front end (
                <span style={{ color: 'green' }}>
                  src/renderer/pages/sqlDemoAp
                </span>
                )
              </li>
            </div>

            <br />

            <div className="h4">Where is the database located?</div>

            <div className="infoItem">
              We are currently in{' '}
              <div id="devModeContainer" style={{ display: 'inline-block' }} />{' '}
              mode. The sqlite database is currently stored in the following
              location:
            </div>

            <pre id="dbLocationContainer" />

            <div className="infoItem">
              In development mode it should be here:
            </div>

            <pre id="dbLocationDevContainer" />

            <div className="infoItem">In production it should be here:</div>

            <pre id="dbLocationProdContainer" />

            <div className="infoItem">
              Click the SQL demo button on the left navbar to test SQL in
              action.
            </div>

            <br />
            <br />
          </div>
        </div>
      </>
    );
  }
}
