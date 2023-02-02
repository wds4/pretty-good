import React from 'react';
import Masthead from '../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import CreatePost from './createPost';

export default class NostrCreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'nostr: create post';
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
            <CreatePost />
          </div>
        </div>
      </>
    );
  }
}
