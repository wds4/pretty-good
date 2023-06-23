import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/contentCuration/home';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import ChannelsListener from 'renderer/window1/apps/nostr/listeners/channelsListener';

export default class ContentCurationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Content Curation';
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
            <div className="h4">Content Curation: Home</div>
            <p>under construction</p>
            <div>
              The ability to curate lists will be harnessed as a method to
              crowdsource the curation of nostr content.
            </div>
            <div>
              You select a topic from a list of topics, and your web of trust
              returns a list of pubkeys that produce high quality content on
              that topic. What could be easier than that!
            </div>
          </div>
          <ChannelsListener />
        </div>
      </>
    );
  }
}
