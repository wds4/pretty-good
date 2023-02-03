import React from 'react';
import { timeout } from 'renderer/window1/lib/pg';
import Masthead from '../../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../../lib/pg/ui';
import DirectMessages from './messages';
import SendDirectMessage from './sendDirectMessage';

export default class NostrDirectMessageConvo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: null,
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'nostr: DM Convo';
    updateMastheadCenter(mastheadDescriptor);

    /*
    await timeout(1000);
    const foo = 'bar';
    this.setState({ foo });
    */
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
            <DirectMessages foo={this.state.foo} />
            <SendDirectMessage />
          </div>
        </div>
      </>
    );
  }
}
