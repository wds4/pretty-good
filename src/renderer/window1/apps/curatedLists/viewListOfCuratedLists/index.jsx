import React from 'react';
import Masthead from '../../../mastheads/curatedListsMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/curatedListsNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/curatedLists/viewLists';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';

export default class ConceptGraphSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Curated Lists';
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
            <div className="h4">Curated Lists</div>
          </div>
        </div>
      </>
    );
  }
}
