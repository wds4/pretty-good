/*
We will use asyncSql(sql) in src/renderer/pages/sqlDemoApp to send sql commands and replies back and forth
between the main process and the renderer process.

// db.all: ARRAY OF ROWS
const aFooData = await asyncSql(sql, 'all');
e.g. const sql = 'SELECT relays FROM myNostrProfile WHERE active = true ';
returns aFooData = [ { col1: foo, col2: foo }, { col1: foo, col2: foo } ]

const aFooData = await asyncSql(sql); -- same as above (all is default behaviour)

// db.get: SINGLE ROW
e.g. const sql = 'SELECT relays FROM myNostrProfile ';
const oFooData = await asyncSql(sql, 'get');
returns oFooData = { col1: foo, col2: foo }

// db.each: ?
const fooData = await asyncSql(sql, 'each');
returns fooData = (?)
*/

export const asyncSql = async (sql: string, queryType) => { // queryType is optional parameter: all, get, each
  const nonce = Math.floor(Math.random() * 100000);
  // console.log(`asyncSql; nonce: ${nonce}`);
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once(
      `asynchronous-sql-reply-${nonce}`,
      (arg) => {
        resolve(arg);
      }
    );
    // queryType: all, get, each (if null, all is the default action)
    // all: returns array;
    const data = [sql, nonce, queryType];
    window.electron.ipcRenderer.sendMessage('asynchronous-sql-command', data);
  });
};
