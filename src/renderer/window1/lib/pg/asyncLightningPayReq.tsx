export const asyncLightningPayReq = async (oPaymentRequestData: object) => {
  const nonce = Math.floor(Math.random() * 100000);
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once(
      `asynchronous-lightningPayReq-reply-${nonce}`,
      (arg) => {
        resolve(arg);
      }
    );
    const data = [oPaymentRequestData, nonce];
    window.electron.ipcRenderer.sendMessage('asynchronous-lightningPayReq-command', data);
  });
};
