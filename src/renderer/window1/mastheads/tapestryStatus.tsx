import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { NavLink } from 'react-router-dom';
import { setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const TapestryStatus = () => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const currentPage = useSelector((state) => state.prettyGoodGlobalState.currentPage);
  const {
    aThreadedTapestryEventIDs,
    aListEventIDs,
    aListItemEventIDs,
    aRatingsOfItemsEventIDs,
    aRatingsOfCuratorsEventIDs,
  } = useSelector((state) => state.curatedLists);
  const [numberOfBeginningTapestryEvents, setNumberOfTapestryEvents] = useState(aThreadedTapestryEventIDs.length);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const nostrSettings = useSelector((state) => state.nostrSettings);
  const aActiveRelayUrls = [];
  if (nostrSettings.nostrRelays) {
  const oRelays = nostrSettings.nostrRelays;
    const aRelays = Object.keys(oRelays)
    for (let x=0;x<aRelays.length;x++) {
      if (oRelays[aRelays[x]].read) {
        aActiveRelayUrls.push(aRelays[x])
      }
    }
  }
  let reloadButtonDisplay = 'none';
  if (currentPage == "curatedListsMainPage") {
    if (aThreadedTapestryEventIDs.length > numberOfBeginningTapestryEvents) {
      reloadButtonDisplay = 'inline-block';
    }
  }
  return (
    <div >
      <div style={{position: 'relative'}}>
        <button
          type="button"
          id="connectedRelaysButton"
          aria-expanded={height !== 0}
          aria-controls="example-panel"
          onClick={() => setHeight(height === 0 ? 'auto' : 0)}
          style={{
            margin: '0px',
            padding: '0px 10px 0px 10px',
            border: '0px',
            fontFamily: 'Arial Rounded MT Bold',
            fontSize: '12px',
          }}
        >
          DCoSL:{' '}
          <select>
            <option>testnet-1 (kinds: 9901, 39901)</option>
            <option disabled>testnet-2 (kinds: 9902, 39902)</option>
            <option disabled>mainnet</option>
          </select>{' '}
          <span>{aThreadedTapestryEventIDs.length} events detected live on nostr since startup ({numberOfBeginningTapestryEvents} when this page was loaded)</span>
        </button>
        <div style={{position: 'absolute', right: '10px', top: '2px', display: reloadButtonDisplay}}>
          <NavLink
            end
            to="/CuratedListsHome/CuratedListsLandingPageRedirect"
            style={{textDecoration: 'none'}}
            onClick={() => dispatch(setCurrentPage('foo'))}
          >
            reload this page
          </NavLink>
        </div>

        <AnimateHeight
          id="example-panel"
          duration={500}
          height={height} // see props documentation below
        >
          <div style={{ overflow: 'auto' }}>
            <div
              className="connectedRelaysVerboseContainer"
              id="connectedRelaysVerboseContainer"
              style={{ textAlign: 'left', display: 'block', height: 'auto', marginBottom: '10px' }}
            >
              <div
                style={{
                  textAlign: 'left',
                  padding: '5px',
                  fontSize: '12px',
                  color: 'grey',
                }}
              >
                <center>curated lists listener: status</center>
                <br />
                <div>number of events in redux store (includes events loaded from SQL): {aThreadedTapestryEventIDs.length}</div>
                <div style={{marginLeft: '20px'}}>
                  <div>lists: {aListEventIDs.length}</div>
                  <div>list items: {aListItemEventIDs.length}</div>
                  <div>item ratings: {aRatingsOfItemsEventIDs.length}</div>
                  <div>curator ratings: {aRatingsOfCuratorsEventIDs.length}</div>
                  <div>TOTAL: {aListEventIDs.length + aListItemEventIDs.length + aRatingsOfItemsEventIDs.length +aRatingsOfCuratorsEventIDs.length}</div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  If this app is using too much energy, once updates of lists, list
                  items, item ratings, and curator ratings appear to be finished (ought
                  to happen quickly if connection is good), turn off the Curated Lists
                  Listeners in the masthead.
                </div>
                <br />
                <div>currentPage: {currentPage}</div>
                <NavLink
                  end
                  to="/CuratedListsHome/CuratedListsLandingPageRedirect"
                  style={{textDecoration: 'none'}}
                >
                  reload this page
                </NavLink>
              </div>
            </div>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};
export default TapestryStatus
