import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/settings';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import Counter from 'renderer/window1/redux/features/counter/helloWorld';
import NostrSettings from 'renderer/window1/redux/features/nostr/settings/helloWorld';
import NostrDirectMessages from 'renderer/window1/redux/features/nostr/directMessages/helloWorld';
import NostrProfiles from 'renderer/window1/redux/features/nostr/profiles/helloWorld';
import NostrNotes from 'renderer/window1/redux/features/nostr/notes/helloWorld';
import CuratedLists from 'renderer/window1/redux/features/curatedLists/lists/helloWorld';

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
            <br />
            <CuratedLists />
            <Counter />
            <NostrNotes />
            <NostrSettings />
            <NostrDirectMessages />
            <NostrProfiles />
          </div>
        </div>
      </>
    );
  }
}
