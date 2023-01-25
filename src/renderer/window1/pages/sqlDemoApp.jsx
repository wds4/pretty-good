import React, { useState } from 'react';
import { asyncSql } from '../index';

function SqlDemoApp() {
  const [message, setMessage] = useState('SELECT sqlite_version()');
  const [response, setResponse] = useState();

  function send(sql) {
    asyncSql(sql).then((result) => setResponse(result));
  }

  return (
    <>
      <div className="h4">Test it out</div>

      <div className="infoItem">
        For demo purposes, myCoolTable is created at startup in
        src/main/main.ts. You can create more tables, add rows, or execute other
        sql commands below.
      </div>

      <div className="infoItem">
        Type in an sql command, or copy and paste one of the example sql
        commands below, and submit it to the main process (by clicking 'Send').
      </div>

      <pre>
        SELECT * FROM myCoolTable
        <br />
        SELECT sqlite_version()
        <br />
        CREATE TABLE IF NOT EXISTS anotherCoolTable (id INTEGER PRIMARY KEY
        AUTOINCREMENT, itemName TEXT NULL)
        <br />
        INSERT OR IGNORE INTO anotherCoolTable (itemName) VALUES ('foo')
        <br />
        SELECT * FROM sqlite_schema
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
        The SQL response, transmitted via IRC from the main process to the
        renderer process (here), is an object in JSON:
      </div>

      <pre style={{ border: '1px solid orange' }}>
        {(response && JSON.stringify(response, null, 2)) ||
          'No query results yet!'}
      </pre>
    </>
  );
}

export default SqlDemoApp;
