import React, { StrictMode } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { NostrProvider } from 'nostr-react';
import { Provider, useDispatch } from 'react-redux';
import { initNostrRelays } from 'renderer/window1/redux/features/nostrGlobalState/slice';
import ErrorBoundary from './errorBoundary';
import store from './redux/store/store';
import { updateMainColWidth } from './lib/pg/ui';

// package dep:
// "nostr-react": "github:wds4/nostr-react#autoReconnect",

// Routes
import LandingPage from './landingPage';

import PrettyGoodHome from './apps/prettyGood';
import PrettyGoodProfile from './apps/prettyGood/profile';
import PrettyGoodSettings from './apps/prettyGood/settings';
import PrettyGoodIPFSLightweight from './apps/prettyGood/settings/networksAndDatabases/ipfsLightweight';
import PrettyGoodIPFSHeavyweight from './apps/prettyGood/settings/networksAndDatabases/ipfsHeavyweight';
import PrettyGoodNostr from './apps/prettyGood/settings/networksAndDatabases/nostr';
import PrettyGoodSql from './apps/prettyGood/settings/networksAndDatabases/sql';
import PrettyGoodApps from './apps/prettyGood/apps';
import PrettyGoodHelloWorld from './apps/prettyGood/settings/helloWorld';
import HelloWorldRedux from './apps/prettyGood/settings/helloWorld/redux';

// import NostrHome from './apps/nostr';
import NostrHome from './apps/nostr';
import NostrLandingPage from './apps/nostr/landingPage';
import NostrMainFeed from './apps/nostr/mainFeed';
import NostrViewMyProfile from './apps/nostr/viewMyProfile';
import NostrEditMyProfile from './apps/nostr/editMyProfile';
import NostrSettings from './apps/nostr/settings';
import NostrCreatePost from './apps/nostr/createPost';
import NostrDirectMessageConvo from './apps/nostr/directMessageConversation';
import NostrViewProfile from './apps/nostr/profile';
import NostrFollowingList from './apps/nostr/followingList';
import NostrMyFollowingList from './apps/nostr/myFollowingList';
import NostrUserRelaysList from './apps/nostr/userRelaysList';
import NostrSearchForUser from './apps/nostr/searchForUser';
import NostrThread from './apps/nostr/thread';

import NostrProfiles from './apps/nostr/settings/profiles';
import NostrRelays from './apps/nostr/settings/relays';
import NostrSql from './apps/nostr/settings/sql';
import NostrSettingsGrapevine from './apps/nostr/settings/grapevine';

import GrapevineHome from './apps/grapevine';
import GrapevineProfile from './apps/grapevine/profile';
import GrapevineSettings from './apps/grapevine/settings';

import ConceptGraphHome from './apps/conceptGraph';
import ConceptGraphProfile from './apps/conceptGraph/profile';
import ConceptGraphSettings from './apps/conceptGraph/settings';

// css
import './css/app.css';
import './css/navbars.css';
import './css/mastheads.css';

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
import './css/nostr/misc.css';
import './css/nostr/newPost.css';
import './css/nostr/nfgGraphic.css';
import './css/nostr/profileKeys.css';
import './css/nostr/settings.css';
// import './css/nostr/toggleSwitch1.css';
import './css/nostr/userList.css';
import './css/nostr/youTubeEmbed.css';

/*
function fooFxn() {
  window.electron.ipcRenderer.once('ipc-show-userDataPaths', (arg) => {});
  window.electron.ipcRenderer.sendMessage('ipc-show-userDataPaths');
}
*/

// an inelegant way to initialize the relay list into the redux store
const InitRelayStore = ({ aRelaysData }) => {
  const dispatch = useDispatch();
  dispatch(initNostrRelays(aRelaysData));
  return <></>;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relayUrls: [],
    };
  }

  async componentDidMount() {
    window.addEventListener('resize', updateMainColWidth);
    // console.log("App relayUrls: "+JSON.stringify(this.props.relayUrls))
    // now add relayUrls to redux store
  }

  render() {
    return (
      <StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <NostrProvider relayUrls={this.props.relayUrls} debug autoReconnect>
              <InitRelayStore aRelaysData={this.props.aRelaysData} />
              <fieldset id="app">
                <Router>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route
                      path="/PrettyGoodHome"
                      element={<PrettyGoodHome />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodProfile"
                      element={<PrettyGoodProfile />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodSettings"
                      element={<PrettyGoodSettings />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodIPFSLightweight"
                      element={<PrettyGoodIPFSLightweight />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodIPFSHeavyweight"
                      element={<PrettyGoodIPFSHeavyweight />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodNostr"
                      element={<PrettyGoodNostr />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodSql"
                      element={<PrettyGoodSql />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodApps"
                      element={<PrettyGoodApps />}
                    />
                    <Route
                      path="/PrettyGoodHome/PrettyGoodHelloWorld"
                      element={<PrettyGoodHelloWorld />}
                    />
                    <Route
                      path="/PrettyGoodHome/HelloWorldRedux"
                      element={<HelloWorldRedux />}
                    />

                    <Route path="/NostrHome" element={<NostrHome />} />
                    <Route
                      path="/NostrHome/NostrLandingPage"
                      element={<NostrLandingPage />}
                    />
                    <Route
                      path="/NostrHome/NostrMainFeed"
                      element={<NostrMainFeed />}
                    />
                    <Route
                      path="/NostrHome/NostrViewMyProfile"
                      element={<NostrViewMyProfile />}
                    />
                    <Route
                      path="/NostrHome/NostrEditMyProfile"
                      element={<NostrEditMyProfile />}
                    />
                    <Route
                      path="/NostrHome/NostrSettings"
                      element={<NostrSettings />}
                    />
                    <Route
                      path="/NostrHome/NostrCreatePost"
                      element={<NostrCreatePost />}
                    />
                    <Route
                      path="/NostrHome/NostrDirectMessageConvo"
                      element={<NostrDirectMessageConvo />}
                    />
                    <Route
                      path="/NostrHome/NostrViewProfile"
                      element={<NostrViewProfile />}
                    />
                    <Route
                      path="/NostrHome/NostrFollowingList"
                      element={<NostrFollowingList />}
                    />
                    <Route
                      path="/NostrHome/NostrMyFollowingList"
                      element={<NostrMyFollowingList />}
                    />
                    <Route
                      path="/NostrHome/NostrUserRelaysList"
                      element={<NostrUserRelaysList />}
                    />
                    <Route
                      path="/NostrHome/NostrSearchForUser"
                      element={<NostrSearchForUser />}
                    />
                    <Route
                      path="/NostrHome/NostrThread"
                      element={<NostrThread />}
                    />
                    <Route
                      path="/NostrHome/NostrProfiles"
                      element={<NostrProfiles />}
                    />
                    <Route
                      path="/NostrHome/NostrRelays"
                      element={<NostrRelays />}
                    />
                    <Route path="/NostrHome/NostrSql" element={<NostrSql />} />
                    <Route
                      path="/NostrHome/NostrSettingsGrapevine"
                      element={<NostrSettingsGrapevine />}
                    />

                    <Route path="/GrapevineHome" element={<GrapevineHome />} />
                    <Route
                      path="/GrapevineHome/GrapevineProfile"
                      element={<GrapevineProfile />}
                    />
                    <Route
                      path="/GrapevineHome/GrapevineSettings"
                      element={<GrapevineSettings />}
                    />

                    <Route
                      path="/ConceptGraphHome"
                      element={<ConceptGraphHome />}
                    />
                    <Route
                      path="/ConceptGraphHome/ConceptGraphProfile"
                      element={<ConceptGraphProfile />}
                    />
                    <Route
                      path="/ConceptGraphHome/ConceptGraphSettings"
                      element={<ConceptGraphSettings />}
                    />
                  </Routes>
                </Router>
              </fieldset>
            </NostrProvider>
          </Provider>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}
