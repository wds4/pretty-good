/*
We will use asyncSql(sql) in src/renderer/pages/sqlDemoApp to send sql commands and replies back and forth
between the main process and the renderer process.
*/
export const asyncSql = async (sql: string) => {
  const nonce = Math.floor(Math.random() * 100000);
  console.log(`asyncSql; nonce: ${nonce}`);
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once(
      `asynchronous-sql-reply-${nonce}`,
      (arg) => {
        resolve(arg);
      }
    );
    const data = [sql, nonce];
    window.electron.ipcRenderer.sendMessage('asynchronous-sql-command', data);
  });
};
