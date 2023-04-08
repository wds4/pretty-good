import React from 'react';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/helloWorld';
import {
  getMyPeerID,
  getVersion,
  getIpfsNodeID,
} from 'renderer/window1/lib/ipfs';

export default class IpfsCoreHelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'IPFS Core: Hello World';
    updateMastheadCenter(mastheadDescriptor);

    const myPeerID = await getMyPeerID();
    document.getElementById('myPeerIdContainer').innerHTML = myPeerID;

    const versionInfo = await getVersion();
    document.getElementById('versionInfoContainer').innerHTML = JSON.stringify(
      versionInfo,
      null,
      4
    );

    const ipfsNodeInfo = await getIpfsNodeID();
    document.getElementById('ipfsNodeIdContainer').innerHTML = JSON.stringify(
      ipfsNodeInfo,
      null,
      4
    );
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel" />

          <div id="nodeRunning">
            <div>
              <div className="leftCol">my peerID:</div>
              <div className="rightCol" id="myPeerIdContainer" />
            </div>

            <br />

            <div>version info:</div>
            <pre id="versionInfoContainer" />

            <br />

            <div>id info:</div>
            <pre id="ipfsNodeIdContainer" />
          </div>
        </div>
      </>
    );
  }
}
