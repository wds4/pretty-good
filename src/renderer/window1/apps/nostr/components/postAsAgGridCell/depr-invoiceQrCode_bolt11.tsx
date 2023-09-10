import React from 'react';
import QRCode from "react-qr-code";
import { useSelector } from 'react-redux';
import { asyncLightningPayReq } from 'renderer/window1/lib/pg/asyncLightningPayReq';
// import lightningPayReq from 'bolt11';
// require('light-bolt11-decoder')
const foo = require('light-bolt11-decoder').decode("LNBC100N1PJDH8LPPP5W5YCT47CGXEJ8X6PN8JXCEYW6YMG2NXCMDNY39MM2HCRMYYFLUFSHP59XF7GYCR4AUQMALRHXQDNS2T92MHQEJ3Y5N5D24AYE7KADH0UPTSCQZZSXQYZ5VQSP5SRK00PLUZPFX77FGZXLCK4S9RRCC5E0G33QV5UDKHVRKVA548FPS9QYYSSQ22TAC8PCXSG5RFPJ6YZ8K3LQC3E9FLCW5KJRU2SKVWNQTYS92ZQ8CX6HTMJG7TWWXZXL5685RCMF5L4LNA3AXP607LVYMWGR8JAFSHGPJKCTKQ")


const createInvoice = async (recipient, myPrivkey) => {
  const privateKeyHex = 'e126f68f7eafcc8b74f54d269fe206be715000f94dac067d1c04a8ca3b2db734'
  const oPaymentRequestData = {
    sats: 2,
    description: "here are some sats for you!",
    recipient: recipient,
    privateKeyHex: myPrivkey,
  };
  const signed = await asyncLightningPayReq(oPaymentRequestData);
  // console.log("qwerty signed.paymentRequest: "+signed.paymentRequest);
  return signed.paymentRequest;
}

export default class InvoiceQrCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      oProfileContent: {},
      paymentRequest: "?",
      lnbc: "LNBC100N1PJDH8LPPP5W5YCT47CGXEJ8X6PN8JXCEYW6YMG2NXCMDNY39MM2HCRMYYFLUFSHP59XF7GYCR4AUQMALRHXQDNS2T92MHQEJ3Y5N5D24AYE7KADH0UPTSCQZZSXQYZ5VQSP5SRK00PLUZPFX77FGZXLCK4S9RRCC5E0G33QV5UDKHVRKVA548FPS9QYYSSQ22TAC8PCXSG5RFPJ6YZ8K3LQC3E9FLCW5KJRU2SKVWNQTYS92ZQ8CX6HTMJG7TWWXZXL5685RCMF5L4LNA3AXP607LVYMWGR8JAFSHGPJKCTKQ",
    };
  }

  async componentDidMount() {
    this.setState({ event: this.props.event });

    let oProfileContent = {};
    if (this.props.nostrProfiles.hasOwnProperty(this.props.event?.pubkey)) {
      oProfileContent = JSON.parse(this.props.nostrProfiles[this.props.event?.pubkey].content);
      this.setState({ oProfileContent });
      if (oProfileContent.lud06) {
        const lnurl = oProfileContent.lud06;
        const paymentRequest = await createInvoice(lnurl, this.props.myPrivkey);
        this.setState({ paymentRequest });
      }
      if (oProfileContent.lud16) {
        const lud16 = oProfileContent.lud16;
        const paymentRequest = await createInvoice(lud16, this.props.myPrivkey);
        this.setState({ paymentRequest });
      }
    }
  }

  render() {
    return (
      <>
        <div style={{display: 'block'}}>
          <div style={{border: '5px solid red'}}>
            {this.state.paymentRequest}
          </div>
          {JSON.stringify(this.state.oProfileContent,null,4)}
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={this.state.paymentRequest}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </>
    );
  }
}
