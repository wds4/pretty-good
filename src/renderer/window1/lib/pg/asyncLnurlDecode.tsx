export const asyncLnurlDecode = async (lnurl: string) => {
  const nonce = Math.floor(Math.random() * 100000);
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once(
      `asynchronous-lnurlDecode-reply-${nonce}`,
      (arg) => {
        resolve(arg);
      }
    );
    const data = [lnurl, nonce];
    window.electron.ipcRenderer.sendMessage('asynchronous-lnurlDecode-command', data);
  });
};
