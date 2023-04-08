import React, { useState } from 'react';
import { asyncSql } from '../../../../../lib/pg/asyncSql';

function SqlBody() {
  const [message, setMessage] = useState('SELECT * FROM sqlite_schema');
  const [response, setResponse] = useState();

  function send(sql) {
    asyncSql(sql).then((result) => setResponse(result));
  }

  const sql1 = " SELECT * FROM sqlite_schema WHERE type = 'table' ";
  asyncSql(sql1).then((result: Array) => {
    const aTables = result;
    const e = document.getElementById("tableNamesContainer")
    if (e) {
      e.innerHTML = "";
      for (let t=0; t<aTables.length; t++) {
        let tableName = aTables[t].name;
        console.log("tableName: "+tableName);
        e.innerHTML += "<div>"+t+" "+tableName+"</div>";
      }
    }
  });

  const sql2 = ' SELECT sqlite_version() ';
  asyncSql(sql2).then((result: Array) => {
    const sqliteVersion = result[0]['sqlite_version()'];
    document.getElementById('sqLiteVersion').innerHTML = sqliteVersion;
  });

  // query the main process to obtain the expected database paths (dev mode and production mode) for this machine.
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

  return (
    <>
      sqlite3 Version:{' '}
      <div
        id="sqLiteVersion"
        style={{
          marginLeft: '50px',
          border: '1px solid black',
          padding: '10px',
          backgroundColor: 'green',
        }}
      >
        sql version container
      </div>
      <div className="infoItem">
        An sqlite3 database named `prettyGoodDatabase` is created at startup in
        the main process
        (<span style={{ color: 'green' }}>src/main/main.ts</span>). It is made
        accessible to the renderer process by using IPC to communicate between the two processes.
      </div>
      <br />
      <div>Tables:</div>
      <div
        id="tableNamesContainer"
        style={{
          marginLeft: '50px',
          border: '1px solid black',
          padding: '10px',
          backgroundColor: 'green',
        }}
      />
      <div className="infoItem">
        We are currently in{' '}
        <div id="devModeContainer" style={{ display: 'inline-block' }} /> mode.
        The sqlite database is currently stored in the following location:
      </div>
      <pre
        style={{
          marginLeft: '50px',
          border: '1px solid black',
          padding: '10px',
          backgroundColor: 'green',
        }}
        id="dbLocationContainer"
      />
      <div
        style={{
          marginLeft: '50px',
          border: '1px solid black',
          padding: '0px 20px 0px 20px',
          backgroundColor: 'yellow',
        }}
      >
        <div className="infoItem">
          In case things aren't working ... in development mode the database
          should be here:
        </div>

        <pre id="dbLocationDevContainer" />

        <div className="infoItem">In production it should be here:</div>

        <pre id="dbLocationProdContainer" />
      </div>
      <div className="infoItem">
        Type in an sql command, or copy and paste one of the example sql
        commands below, and submit it to the main process (by clicking 'Send').
      </div>
      <pre>
        SELECT * FROM sqlite_schema
        <br />
        SELECT sqlite_version()
        <br />
        CREATE TABLE IF NOT EXISTS anotherCoolTable (id INTEGER PRIMARY KEY
        AUTOINCREMENT, itemName TEXT NULL)
        <br />
        INSERT OR IGNORE INTO anotherCoolTable (itemName) VALUES ('foo')

        <br />
        SELECT * FROM nostrProfiles
      </pre>
      <div className="infoItem">
        For more SQL commands, see:{' '}
        <a
          href="https://www.sqlitetutorial.net/sqlite-nodejs/"
          target="_blank"
          rel="noreferrer"
        >
          SQLite tutorial
        </a>
      </div>
      <div className="infoItem">
        <input
          style={{ width: '80%' }}
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="button" onClick={() => send(message)}>
          Send
        </button>
      </div>
      <div className="infoItem">
        The SQL response, transmitted via IPC from the main process to the
        renderer process (here), is an object in JSON:
      </div>
      <pre style={{ border: '1px solid orange' }}>
        {(response && JSON.stringify(response, null, 2)) ||
          'No query results yet!'}
      </pre>
    </>
  );
}

export default SqlBody;
