import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementRelayDisconnectCount } from 'renderer/window1/redux/features/nostr/settings/slice';
import DirectMessageListener from 'renderer/window1/apps/nostr/listeners/dmListener';
import MyProfileListener from 'renderer/window1/apps/nostr/listeners/myProfileListener';
import NostrProfilesListener from 'renderer/window1/apps/nostr/listeners/profilesListener';
// package dep:
// "nostr-react": "github:wds4/nostr-react#autoReconnect",

// Routes
/*
LandingPage redirects to NostrLandingPage which redirects to NostrMainFeed
Previously these landing pages were used for startup functions
*/
import { useNostr } from 'nostr-react';
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
import PrettyGoodRedux from './apps/prettyGood/settings/redux';
import VisjsHelloWorld from './apps/prettyGood/settings/helloWorld/visjs';

// import NostrHome from './apps/nostr'
import NostrHome from './apps/nostr';
import NostrLandingPage from './apps/nostr/landingPage';
import NostrMainFeed from './apps/nostr/mainFeed';
import NostrViewMyProfile from './apps/nostr/viewMyProfile';
import NostrEditMyProfile from './apps/nostr/editMyProfile';
import NostrCreatePost from './apps/nostr/createPost';
import NostrDirectMessageConvo from './apps/nostr/directMessageConversation';
import NostrViewProfile from './apps/nostr/profile';
import NostrFollowingList from './apps/nostr/followingList';
import NostrMyFollowingList from './apps/nostr/myFollowingList';
import NostrUserRelaysList from './apps/nostr/userRelaysList';
import NostrSearchForUser from './apps/nostr/searchForUser';
import NostrThread from './apps/nostr/thread';
import NostrDirectMessages from './apps/nostr/directMessages';

import NostrSettings from './apps/nostr/settings';
import NostrProfiles from './apps/nostr/settings/profiles';
import NostrRelays from './apps/nostr/settings/relays';
import NostrSql from './apps/nostr/settings/sql';
import NostrSettingsGrapevine from './apps/nostr/settings/grapevine';
import NostrSettingsExtendedFollowing from './apps/nostr/settings/extendedFollowing';

import GrapevineHome from './apps/grapevine';
import GrapevineProfile from './apps/grapevine/profile';
import GrapevineSettings from './apps/grapevine/settings';

import ConceptGraphHome from './apps/conceptGraph';
import ConceptGraphProfile from './apps/conceptGraph/profile';
import ConceptGraphSettings from './apps/conceptGraph/settings';

const AppRoutes = () => {
  const { onDisconnect } = useNostr();
  const dispatch = useDispatch();
  const onDisconnectCallback = (relay) => {
    console.log(
      `onDisconnectCallback, AppRoutes component; relay.url: ${relay.url}`
    );
    dispatch(incrementRelayDisconnectCount(relay.url))
    setTimeout(() => {
      relay
        .connect()
        .then(() => console.log(`AppRoutes reconnected: ${relay.url}`))
        .catch(() =>
          console.log(`AppRoutes unable to reconnect: ${relay.url}`)
        );
    }, 30000);
  };
  onDisconnect(onDisconnectCallback);
  return (
    <>
      <NostrProfilesListener />
      <DirectMessageListener />
      <MyProfileListener />
      <fieldset id="app">
        <Router>
          <Routes>
            <Route path="/" element={<NostrMainFeed />} />

            <Route path="/PrettyGoodHome" element={<PrettyGoodHome />} />
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
              path="/PrettyGoodHome/PrettyGoodRedux"
              element={<PrettyGoodRedux />}
            />
            <Route
              path="/PrettyGoodHome/VisjsHelloWorld"
              element={<VisjsHelloWorld />}
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
            <Route path="/NostrHome/NostrThread" element={<NostrThread />} />
            <Route
              path="/NostrHome/NostrDirectMessages"
              element={<NostrDirectMessages />}
            />
            <Route
              path="/NostrHome/NostrProfiles"
              element={<NostrProfiles />}
            />
            <Route path="/NostrHome/NostrRelays" element={<NostrRelays />} />
            <Route path="/NostrHome/NostrSql" element={<NostrSql />} />
            <Route
              path="/NostrHome/NostrSettingsGrapevine"
              element={<NostrSettingsGrapevine />}
            />
            <Route
              path="/NostrHome/NostrSettingsExtendedFollowing"
              element={<NostrSettingsExtendedFollowing />}
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

            <Route path="/ConceptGraphHome" element={<ConceptGraphHome />} />
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
    </>
  );
};

export default AppRoutes;
