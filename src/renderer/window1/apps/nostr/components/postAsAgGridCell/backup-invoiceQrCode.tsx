import QRCode from "react-qr-code";
import { useSelector } from 'react-redux';
import { asyncLightningPayReq } from 'renderer/window1/lib/pg/asyncLightningPayReq';
// import lightningPayReq from 'bolt11';
// require('light-bolt11-decoder')
const foo = require('light-bolt11-decoder').decode("LNBC100N1PJDH8LPPP5W5YCT47CGXEJ8X6PN8JXCEYW6YMG2NXCMDNY39MM2HCRMYYFLUFSHP59XF7GYCR4AUQMALRHXQDNS2T92MHQEJ3Y5N5D24AYE7KADH0UPTSCQZZSXQYZ5VQSP5SRK00PLUZPFX77FGZXLCK4S9RRCC5E0G33QV5UDKHVRKVA548FPS9QYYSSQ22TAC8PCXSG5RFPJ6YZ8K3LQC3E9FLCW5KJRU2SKVWNQTYS92ZQ8CX6HTMJG7TWWXZXL5685RCMF5L4LNA3AXP607LVYMWGR8JAFSHGPJKCTKQ")


const mockCreateInvoice = async () => {
  const oPaymentRequestData = {};
  const oPaymentRequest = await asyncLightningPayReq(oPaymentRequestData);
  console.log("qwerty oPaymentRequest: "+JSON.stringify(oPaymentRequest,null,4))
  /*
  const e = document.getElementById("");
  if (e) {
    e.innerHTML = signed;
  }
  return signed.paymentRequest;
  */
}

const InvoiceQrCode = ({event}) => {
  const pubkey = event.pubkey;
  // let value = "LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHH2MN4WDJKGANFDAKXZWPKY4NTAH";
  let value = "LNBC100N1PJDH8LPPP5W5YCT47CGXEJ8X6PN8JXCEYW6YMG2NXCMDNY39MM2HCRMYYFLUFSHP59XF7GYCR4AUQMALRHXQDNS2T92MHQEJ3Y5N5D24AYE7KADH0UPTSCQZZSXQYZ5VQSP5SRK00PLUZPFX77FGZXLCK4S9RRCC5E0G33QV5UDKHVRKVA548FPS9QYYSSQ22TAC8PCXSG5RFPJ6YZ8K3LQC3E9FLCW5KJRU2SKVWNQTYS92ZQ8CX6HTMJG7TWWXZXL5685RCMF5L4LNA3AXP607LVYMWGR8JAFSHGPJKCTKQ";

  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let oProfileContent = {};
  if (nostrProfiles.hasOwnProperty(event.pubkey)) {
    oProfileContent = JSON.parse(nostrProfiles[event.pubkey].content);
    if (oProfileContent.lud16) {
      // value = oProfileContent.lud16;
      mockCreateInvoice();
    }
  }
  return (
    <>
      <div style={{display: 'block'}}>
        {JSON.stringify(oProfileContent,null,4)}
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div>{JSON.stringify(foo,null,4)}</div>
        <div style={{border: '5px solid red'}}>
          x
        </div>
      </div>
    </>
  )
}
export default InvoiceQrCode;
