import React from 'react';
import Masthead from '../../mastheads/pgMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class PrettyGoodApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'the Pretty Good family of decentralized apps';
    updateMastheadCenter(mastheadDescriptor);
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
          <div id="mainPanel">
            <div className="h4">the Pretty Good family of decentralized apps</div>
          </div>
        </div>
      </>
    );
  }
}
