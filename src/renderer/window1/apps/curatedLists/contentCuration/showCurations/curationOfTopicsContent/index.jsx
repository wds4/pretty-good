import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/contentCuration/showCurations';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import CurationOfTopicsContent from './curationOfTopicsContent';

export default class CurationOfTopicsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Curation of Content for Each Topic';
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
            <CurationOfTopicsContent />
          </div>
        </div>
      </>
    );
  }
}
