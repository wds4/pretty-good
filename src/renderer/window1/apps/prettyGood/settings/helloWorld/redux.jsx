import React from 'react';
import Masthead from '../../../../mastheads/pgMasthead';
import LeftNavbar1 from '../../../../navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from '../../../../navbars/leftNavbar2/prettyGood/helloWorld';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from '../../../../lib/pg/ui';
import Counter from '../../../../redux/features/counter/Counter';

export default class PrettyGoodSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Redux: Hello World';
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
            <div className="h4">Redux: Hello World</div>
            <Counter />
          </div>
        </div>
      </>
    );
  }
}
