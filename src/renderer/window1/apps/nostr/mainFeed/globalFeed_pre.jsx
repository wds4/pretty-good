import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTwoBackSteps,
  setCurrentPage,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';
import MainFeedTypeSelector from './mainFeedTypeSelector';
// import MainFeedTypeSelector from './mainFeedTypeSelectorMinusLists';
import WelcomeBox from './welcomeBox';
import GlobalFeed from './globalFeed';
import SourceToggleSwitch from './components/sourceToggleSwitch';

// For starters, this downloads wds4 lists only.
// Future: will check and download any Channel-associated list as required.
const DownloadChannelLists = ({aNostrDevs, aFedWatchers}) => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );
  let downloadLists = false;
  if ((aNostrDevs.length == 0) || (aFedWatchers.length == 0)) {
    downloadLists = true;
  }

  const wds4pubkey = "e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f";

  const filter = {
    kinds: [30000],
    authors: [ wds4pubkey ],
  };
  const { events } = useNostrEvents({
    filter,
  });
  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      dispatch(addList(event));
    }
  }

  return <></>;

  /*
  if (downloadLists) {
    return (
      <><div>DownloadChannelLists: yes</div></>
    )
  }
  return (<><div>DownloadChannelLists: no</div></>)
  */

}

const GlobalFeedPre = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const aExtendedFollowing = myNostrProfile.extendedFollowing;
  const dispatch = useDispatch();
  dispatch(setTwoBackSteps());
  dispatch(setCurrentPage('mainFeed'));

  const oNip51 = useSelector(
    (state) => state.nip51
  );
  const oLists = oNip51.lists;
  const oByAuthor = oNip51.byAuthor;
  const wds4pubkey = "e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f";
  const channelListName1 = "Nostr Devs";
  const channelListName2 = "Fed Watchers";
  let aNostrDevs = [];
  let aFedWatchers = [];
  // console.log("oByAuthor: "+JSON.stringify(oByAuthor,null,4))
  if (oByAuthor[wds4pubkey]) {
    // Channel 1: Nostr Devs
    if (oByAuthor[wds4pubkey].byListName[channelListName1]) {
      const channelList1EventID = oByAuthor[wds4pubkey].byListName[channelListName1];
      if (oLists[channelList1EventID]) {
        const oEvent = oLists[channelList1EventID].event;
        const aTags_p = oEvent.tags.filter(([k, v]) => k === 'p' && v && v !== '');
        if (aTags_p) {
          for (let x=0; x < aTags_p.length; x++) {
            const pk = aTags_p[x][1];
            if (pk && !aNostrDevs.includes(pk)) {
              aNostrDevs.push(pk);
            }
          }
        }
      }
    }
    // Channel 2: Fed Watchers
    if (oByAuthor[wds4pubkey].byListName[channelListName2]) {
      const channelList2EventID = oByAuthor[wds4pubkey].byListName[channelListName2];
      if (oLists[channelList2EventID]) {
        const oEvent = oLists[channelList2EventID].event;
        const aTags_p = oEvent.tags.filter(([k, v]) => k === 'p' && v && v !== '');
        if (aTags_p) {
          for (let x=0; x < aTags_p.length; x++) {
            const pk = aTags_p[x][1];
            if (pk && !aFedWatchers.includes(pk)) {
              aFedWatchers.push(pk);
            }
          }
        }
      }
    }
  }

  return (
    <>
      <DownloadChannelLists aNostrDevs={aNostrDevs} aFedWatchers={aFedWatchers} />
      <div style={{ position: 'relative', height: '40px' }}>
        <div className="mainFeedTypeSelector">
          <MainFeedTypeSelector
            aFollowing={aFollowing}
            aExtendedFollowing={aExtendedFollowing}
            aNostrDevs={aNostrDevs}
            aFedWatchers={aFedWatchers}
          />
        </div>
      </div>
      <WelcomeBox />
      <GlobalFeed
        aFollowing={aFollowing}
        aExtendedFollowing={aExtendedFollowing}
        aNostrDevs={aNostrDevs}
        aFedWatchers={aFedWatchers}
      />
    </>
  );
};

export default GlobalFeedPre;
