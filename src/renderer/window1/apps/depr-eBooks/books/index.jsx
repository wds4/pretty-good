import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from 'renderer/window1/mastheads/eBooksMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/eBooksNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/eBooks/book';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import EBook from './eBook';

export default class EBooksHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'eBook';
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
            <div className="h3">eBook</div>
            <EBook />
          </div>
        </div>
      </>
    );
  }
}
