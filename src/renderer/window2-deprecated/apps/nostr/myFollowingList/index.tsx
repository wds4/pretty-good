import React from 'react';
import Masthead from '../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import MyFollowingList from './myFollowingList';

export default class NostrFollowingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'nostr: view my following list';
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
          <div id="mastheadElem">
            <Masthead />
          </div>
          <div id="mainPanel">
            <MyFollowingList />
          </div>
        </div>
      </>
    );
  }
}
