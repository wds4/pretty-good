import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/contentCuration/topics';
import ChannelsListener from 'renderer/window1/apps/nostr/listeners/channelsListener';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import TableOfTopicsRedux from './tableOfTopicsRedux';

export default class ContentCurationTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Topics';
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
            <ChannelsListener />
            <TableOfTopicsRedux />
          </div>
        </div>
      </>
    );
  }
}