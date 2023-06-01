import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/curatedLists/viewLists';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import Faq from './faq';

export default class CuratedListsFaq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Curated Lists: FAQ';
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
            <Faq />
          </div>
        </div>
      </>
    );
  }
}
