import React from 'react';
import Masthead from '../../mastheads/curatedListsMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/curatedListsNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/curatedLists/home';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class ConceptGraphHome extends React.Component {
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
            <div className="h3">Nostr: Curated Lists</div>

            <p>Use your Grapevine to curate lists!</p>

            <p>
              Anyone can create a new list and sumbit it to the network.
              Examples: Hardware Wallets, Paid Nostr Relays, Movies about the
              Financial System, etc.
            </p>

            <p>
              Once a list is created, anyone can submit instances of that list.
              Examples: Coldcard, The Big Short, etc.
            </p>

            <p>
              Once a list is created, two ratingTemplates exist automatically:
              <li>
                Alice endorses an instance (without specifying what the endorsement means).
              </li>
              <li>
                Alice endorses Bob's trustworthiness to rate instances of this list. (TRANSITIVE)
                (Hardware Wallets).
              </li>
            </p>

            <p>
              Once instances are created, anyone can submit a ratingTemplate.
              Examples for Hardware wallets:
              <li>Security</li>
              <li>Ease of use</li>
              Examples for Movies:
              <li>Entertaining</li>
              <li>Historical Accuracy</li>
              Rating Templates are always 0-100 and include Certainty. Future
              classifications: 5 stars; comparison ratings (instance A better
              than instance B)
            </p>

            <p>
              For each new ratingTemplate, two more types of ratings exist:
              <li>
                Alice endorses an instance *using one of the ratingTemplates*.
                "Alice endorses Trezor as being easy to use." (NOT TRANSITIVE)
              </li>
              <li>
                Alice endorses Bob's trustworthiness to rate a given list
                (Hardware Wallets) using that ratingTemplate (ease of use).
                "Alice endorse's Bob's ability to rate other people's ability to rate Hardware Wallets." (TRANSITIVE)
              </li>
            </p>


          </div>
        </div>
      </>
    );
  }
}
