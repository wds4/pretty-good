import React, { StrictMode } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { initNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { initNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import { initNostrNotes } from 'renderer/window1/redux/features/nostr/notes/slice';
import { initNostrDirectMessages } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import { initMyActiveNostrProfile } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { initNostrTestnetListCurationRatings } from 'renderer/window1/redux/features/grapevine/listCuration/slice';
import { initCompositeTrustScores } from 'renderer/window1/redux/features/grapevine/compositeTrustScores/slice';
import { initNip51Lists } from 'renderer/window1/redux/features/nip51/lists/slice';
import {
  initCuratedLists,
  initCuratedListInstances,
  initRatingsOfCuratedListInstances,
  initEndorsementsOfCurators,
} from 'renderer/window1/redux/features/curatedLists/lists/slice';
import { oDefaultRelayUrls } from 'main/const/nostr';
import ErrorBoundary from './errorBoundary';
import store from './redux/store/store';
import { updateMainColWidth } from './lib/pg/ui';
import AppNostr from './AppNostr';

import './css/customDataTables.css';
import './css/dataTables/dataTables.css';
// import './css/dataTables/bulma.css';
import 'react-tooltip/dist/react-tooltip.css';
import './css/app.css';
import './css/navbars.css';
import './css/mastheads.css';
import './css/rangeSliders.css';
import './css/prettyGood/index.css';
import './css/nostr/index.css';
import './css/grapevine/index.css';
import './css/conceptGraph/index.css';

import './css/nostr/myProfile.css';
import './css/nostr/userProfile.css';
import './css/nostr/directMessaging.css';
import './css/nostr/editMyProfile.css';
import './css/nostr/feed.css';
import './css/nostr/follows.css';
import './css/nostr/grapevine.css';
import './css/nostr/grapevineSettings.css';
import './css/nostr/grapevineToggleSwitch.css';
import './css/nostr/grapevineToggleSwitchSmall.css';
import './css/nostr/misc.css';
import './css/nostr/newPost.css';
import './css/nostr/nfgGraphic.css';
import './css/nostr/profileKeys.css';
import './css/nostr/settings.css';
import './css/nostr/userList.css';
import './css/nostr/youTubeEmbed.css';
import 'react-tabs/style/react-tabs.css';
import './css/curatedLists/index.css';
import './css/curatedLists/endorsements.css';
import './css/curatedLists/acceptVsReject.css';
import './css/eBooks/index.css';
import './css/contentCuration/index.css';

// an inelegant way to initialize the redux store
const InitReduxStore = ({
  oMyActiveNostrProfileData,
  aMyNostrProfilesData,
  aNostrProfilesData,
  aNostrNotesData,
  aNostrDirectMessagesData,
  aNostrTestnetListCurationRatings,
  aCuratedListsData,
  aCuratedListInstancesData,
  aRatingsOfCuratedListInstancesData,
  aEndorsementsOfCuratorsData,
  aNip51ListsData,
}) => {
  const dispatch = useDispatch();

  dispatch(initMyActiveNostrProfile(oMyActiveNostrProfileData));
  let oRelaysData = {};
  if (oMyActiveNostrProfileData.relays) {
    oRelaysData = JSON.parse(oMyActiveNostrProfileData.relays);
  }
  if (oMyActiveNostrProfileData.relays === null) {
    oRelaysData = oDefaultRelayUrls;
  }
  dispatch(initNostrRelays(oRelaysData));
  dispatch(initNostrProfiles(aNostrProfilesData));
  dispatch(initNostrNotes(aNostrNotesData));
  dispatch(initNostrDirectMessages(aNostrDirectMessagesData));
  dispatch(
    initNostrTestnetListCurationRatings(aNostrTestnetListCurationRatings)
  );
  dispatch(
    initCompositeTrustScores({ oMyActiveNostrProfileData, aNostrProfilesData })
  );
  dispatch(initCuratedLists(aCuratedListsData));
  dispatch(initCuratedListInstances(aCuratedListInstancesData));
  dispatch(
    initRatingsOfCuratedListInstances(aRatingsOfCuratedListInstancesData)
  );
  dispatch(initEndorsementsOfCurators(aEndorsementsOfCuratorsData));
  dispatch(initNip51Lists(aNip51ListsData));
  return <></>;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    window.addEventListener('resize', updateMainColWidth);
  }

  // oRelaysData={this.props.oRelaysData}
  render() {
    return (
      <StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <InitReduxStore
              oMyActiveNostrProfileData={this.props.oMyActiveNostrProfileData}
              aMyNostrProfilesData={this.props.aMyNostrProfilesData}
              aNostrProfilesData={this.props.aNostrProfilesData}
              aNostrNotesData={this.props.aNostrNotesData}
              aNostrDirectMessagesData={this.props.aNostrDirectMessagesData}
              aNostrTestnetListCurationRatings={
                this.props.aNostrTestnetListCurationRatings
              }
              aCuratedListsData={this.props.aCuratedListsData}
              aCuratedListInstancesData={this.props.aCuratedListInstancesData}
              aRatingsOfCuratedListInstancesData={
                this.props.aRatingsOfCuratedListInstancesData
              }
              aEndorsementsOfCuratorsData={
                this.props.aEndorsementsOfCuratorsData
              }
              aNip51ListsData={this.props.aNip51ListsData}
            />
            <AppNostr />
          </Provider>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}
