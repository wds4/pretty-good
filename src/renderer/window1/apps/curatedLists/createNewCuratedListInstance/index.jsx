import React from 'react';
import Masthead from '../../../mastheads/curatedListsMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/curatedListsNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/curatedLists/home';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import QueryReduxForListFocus from './queryReduxForListFocus';

export default class ConceptGraphSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Create New Instance';
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
            <div className="h4">Curated Lists: Create New Instance</div>
            <QueryReduxForListFocus />
          </div>
        </div>
      </>
    );
  }
}
