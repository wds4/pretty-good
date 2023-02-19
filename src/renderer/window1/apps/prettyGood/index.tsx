import React from 'react';
import Masthead from '../../mastheads/pgMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class PrettyGoodHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'home';
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
            <div className="h2">Welcome to Pretty Good</div>
            <p>Choose an app on the left.</p>
          </div>
        </div>
      </>
    );
  }
}
