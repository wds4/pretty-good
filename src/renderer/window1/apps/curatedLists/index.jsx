import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/viewLists';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import { useSelector } from 'react-redux';

const Listeners = () => {
  const devMode2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  let devElemClass = 'devElemHide';
  if (devMode2) {
    devElemClass = 'devElemShow';
  }
  return (
    <div className={devElemClass} style={{ margin: '20px 50px 0px 50px' }}>
      <CuratedListsListeners />
    </div>
  );
};

export default class CuratedListsHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Curated Lists';
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
            <div style={{ margin: '20px 50px 0px 50px' }}>
              <center>
                <div
                  style={{
                    marginBottom: '20px',
                    textAlign: 'left',
                    width: '65%',
                    color: 'grey',
                    fontSize: '16px',
                    padding: '5px',
                    fontStyle: 'italic',
                    border: '1px solid grey',
                    borderRadius: '5px',
                  }}
                >
                  <span style={{ color: 'blue' }}>Decentralized curation</span>{' '}
                  of <span style={{ color: 'blue' }}>simple lists</span> (DCoSL)
                  is the atomic building block and the defining feature of the
                  decentralized web.
                </div>
              </center>

              <div>
                In this app, I demonstrate the DCoSL method. My hope is to
                convince developers of other p2p applications of the following:
                <li>DCoSL is well defined</li>
                <li>DCoSL is straightforward to implement</li>
                <li>DCoSL is versatile and powerful</li>
                <li>Without DCoSL or something similar, there is no truly decentralized web</li>
                <li>
                  Absolutely NO ONE is doing DCoSL, in any form, anywhere, as of
                  May 2023. Many are close, but no cigar. Of the teams that are close,
                  none would know how to check all of the above boxes.
                </li>
              </div>

              <br />

              <div>
                I have no protocol, no library, no token. But I want devs all
                over this space to copy (and improve upon) the <i>principles</i>{' '}
                and <i>methods</i> illustrated in this app.
              </div>

              <br />

              <div>... move the below to another page ...</div>

              <br />

              <div style={{ color: 'grey' }}>
                Nostr list curation is in alpha. But since all ratings are
                currently being submitted to the grapevine testnet, you are
                encouraged to play around!
              </div>

              <br />

              <div>
                Suppose you want to know:
                <li>what movies to watch tonight?</li>
                <li>best bitcoin hardware wallets?</li>
                <li>the best nostr profiles to follow for a given topic?</li>
                <li>
                  which journalists can be trusted to tell you what's happening
                  in a war zone?
                </li>
                <br />
                With curated lists, you can <i>ask your grapevine</i>!
              </div>

              <br />

              <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                Features:
              </div>

              <div>You can:</div>
              <li>create a new list</li>
              <li>add an item to any list</li>
              <li>endorse an item (thumbs up or down)</li>
              <li>
                endorse (up/down) other users as <i>list curators</i> *
              </li>

              <br />

              <div>
                The app will take the above inputs to calculate weighted
                averages:
              </div>
              <li>
                of users, to determine how much influence each one has over this
                list
              </li>
              <li>of items on the list</li>

              <br />

              <div>
                The web of trust for each list can be viewed as a graph, to give
                you an intuitive feel for how scores are calculated.
              </div>

              <br />

              <div style={{ fontSize: '10px' }}>
                *Endorsements for list curation are on the user profile page. If
                not visible, make sure the grapevine icon in the upper right is
                toggled on.
              </div>

              <Listeners />
            </div>
          </div>
        </div>
      </>
    );
  }
}
