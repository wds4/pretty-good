import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/curatedListsNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/viewLists';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import { useSelector } from 'react-redux';

const Listeners = () => {
  const devMode2 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode2
  );
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShow"; }
  return (
    <div className={devElemClass} style={{margin: '20px 50px 0px 50px'}}>
      <CuratedListsListeners />
    </div>
  )
}

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
            <div style={{margin: '20px 50px 0px 50px'}}>
              <div>You can:</div>
              <li>create a new list</li>
              <li>add an item to any list</li>
              <li>endorse an item (thumbs up or down)</li>
              <li>endorse other users as <i>list curators</i></li>

              <br /><br />

              <div>
                Nostr list curation is in alpha, and all ratings are submitted
                to the grapevine testnet. You are encouraged to play around!
              </div>
              <Listeners />
            </div>
          </div>
        </div>
      </>
    );
  }
}
