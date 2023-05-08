import React from 'react';
import Masthead from 'renderer/window1/mastheads/grapevineMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/grapevine/listCuration';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';

export default class ListCuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Grapevine: List Curation';
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
            <div className="h4">List Curation by the Grapevine</div>
          </div>
        </div>
      </>
    );
  }
}
