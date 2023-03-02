import React from 'react';
import Masthead from '../../../mastheads/cgMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/cgNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/conceptGraph/settings';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';

export default class ConceptGraphSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Concept Graph: Settings';
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
            <div className="h4">Concept Graph: Settings</div>
          </div>
        </div>
      </>
    );
  }
}
