import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementRelayDisconnectCount } from 'renderer/window1/redux/features/nostr/settings/slice';
import DirectMessageListener from 'renderer/window1/apps/nostr/listeners/dmListener';
import MyProfileListener from 'renderer/window1/apps/nostr/listeners/myProfileListener';
import NostrProfilesListener from 'renderer/window1/apps/nostr/listeners/profilesListener';
import GrapevineListener from 'renderer/window1/apps/nostr/listeners/grapevineListener';
// package dep:
// "nostr-react": "github:wds4/nostr-react#autoReconnect",

// Routes
/*
LandingPage redirects to NostrLandingPage which redirects to NostrMainFeed
Previously these landing pages were used for startup functions
*/
import { useNostr } from 'nostr-react';
import LandingPage from './landingPage';

import NIP51Home from './apps/nip51/landingPage';
import NIP51Settings from './apps/nip51/settings';
import NIP51ViewLists from './apps/nip51/viewLists';
import NIP51TableOfLists from './apps/nip51/tableOfLists';
import NIP51LoadLists from './apps/nip51/loadLists';
import NIP51List from './apps/nip51/list';
import NIP32Explorer from './apps/nip51/nip32Explorer';
import NIP51ListAuthors from './apps/nip51/listAuthors';
import NIP51MakeNewList from './apps/nip51/makeNewList';
import NIP51Kind10000Lists from './apps/nip51/kind10000Lists';
import NIP51Kind10001Lists from './apps/nip51/kind10001Lists';
import NIP51Kind30000Lists from './apps/nip51/kind30000Lists';
import NIP51Kind30001Lists from './apps/nip51/kind30001Lists';

import PrettyGoodHome from './apps/prettyGood';
import PrettyGoodAbout from './apps/prettyGood/about';
import ThreadedTapestry from './apps/prettyGood/about/threadedTapestry';
import PrettyGoodFaq from './apps/prettyGood/faq';
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
import VisjsHelloWorldMultiGraph from './apps/prettyGood/settings/helloWorld/visjsMultiGraph';
import DataTablesHelloWorld from './apps/prettyGood/settings/helloWorld/dataTables';
import ReactDataTableComponentHelloWorld from './apps/prettyGood/settings/helloWorld/reactDataTableComponent';
import AgGridTableHelloWorld from './apps/prettyGood/settings/helloWorld/agGridTable';
import ExploreNostrNotesByKind from './apps/prettyGood/settings/helloWorld/exploreNotesByKind.tsx';
import HTTPGetRequests from './apps/prettyGood/settings/helloWorld/getRequests';

import Sandbox1 from './apps/prettyGood/settings/helloWorld/sandbox1';
import Sandbox2 from './apps/prettyGood/settings/helloWorld/sandbox2';
import Sandbox3 from './apps/prettyGood/settings/helloWorld/sandbox3';

import PrettyGoodAppsLandingPage from './apps/nostr/landingPage'; // if want start page to be nostr main feed
// import PrettyGoodAppsLandingPage from './apps/curatedLists/listsWithScoresV8'; // if want start page to be cuarated list summary page
import CuratedListsLandingPage from './apps/curatedLists/listsWithScoresV8';

// import NostrHome from './apps/nostr'
import NostrHome from './apps/nostr';
import NostrLandingPage from './apps/nostr/landingPage';
// import NostrLandingPage from './apps/curatedLists/listsWithScoresV8'; // deprecating this usage
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
import NostrApp from './apps/nostr/settings/nostrapp';
import NostrProfiles from './apps/nostr/settings/profiles';
import NostrRelays from './apps/nostr/settings/relays';
import NostrRelaysV2 from './apps/nostr/settings/relaysV2';
import NostrSql from './apps/nostr/settings/sql';
import NostrSettingsGrapevine from './apps/nostr/settings/grapevine';
import NostrSettingsExtendedFollowing from './apps/nostr/settings/extendedFollowing';
import NostrMainFeedSettings from './apps/nostr/settings/mainFeed';
import ProfileManagement from './apps/nostr/settings/profileManagement';
import ChannelManagement from './apps/nostr/settings/channelManagement';

import GrapevineHome from './apps/grapevine';
import GrapevineProfile from './apps/grapevine/profile';
import GrapevineSettings from './apps/grapevine/settings';
import GrapevineGraphViewFollowing from './apps/grapevine/graphViews/following';
import GrapevineGraphViewExtendedFollowing from './apps/grapevine/graphViews/extendedFollowing';
import GrapevineListCuration from './apps/grapevine/listCuration';
import GrapevineRecommendedRelays from './apps/grapevine/listCuration/relaysCuration';
import GrapevineVisualizationMainPage from './apps/grapevine/visualization';

import ConceptGraphHome from './apps/conceptGraph';
import ConceptGraphProfile from './apps/conceptGraph/profile';
import ConceptGraphSettings from './apps/conceptGraph/settings';
import ConceptGraphViewWords from './apps/conceptGraph/words/viewWords';
import ConceptGraphCreateWord from './apps/conceptGraph/words/createWord';

import CuratedListsHome from './apps/curatedLists';
import CuratedListsLandingPageRedirect from './apps/curatedLists/landingPageRedirect';
import AboutCuratedLists from './apps/curatedLists/about';
import CuratedListsFaq from './apps/curatedLists/faq';
import ViewListOfCuratedLists from './apps/curatedLists/viewListOfCuratedLists';
import ViewAllLists from './apps/curatedLists/viewListOfCuratedLists/allLists';

import ViewAllListsFromNostrLive from './apps/curatedLists/viewListOfCuratedLists/allListsFromNostrLive';
import ViewAllListsFromSql from './apps/curatedLists/viewListOfCuratedLists/allListsFromSql';

import ViewMyLists from './apps/curatedLists/viewListOfCuratedLists/myLists';
import CreateNewCuratedList from './apps/curatedLists/createNewCuratedList';
import ViewIndividualCuratedList from './apps/curatedLists/viewIndividualCuratedList/overview';
import ViewIndividualCuratedListTechOverview from './apps/curatedLists/viewIndividualCuratedList/techOverview';
import SingleListGraphOfInstances from './apps/curatedLists/viewIndividualCuratedList/graph';
import CuratedListAllItemsNostrLive from './apps/curatedLists/viewIndividualCuratedList/viewInstancesNostrLive';
import CuratedListAllItemsSql from './apps/curatedLists/viewIndividualCuratedList/viewInstancesSql';
import CuratedListAllRatingsNostrLive from './apps/curatedLists/viewIndividualCuratedList/tableOfRatingsNostrLive';
import CuratedListAllRatingsSql from './apps/curatedLists/viewIndividualCuratedList/tableOfRatingsSql';
import CuratorsOfIndividualList from './apps/curatedLists/viewIndividualCuratedList/curators';
import InstancesOfIndividualList from './apps/curatedLists/viewIndividualCuratedList/instances';
import CuratedListEndorsementsOfCuratorsNostrLive from './apps/curatedLists/viewIndividualCuratedList/curatorEndorsementsNostrLive';
import CuratedListEndorsementsOfCuratorsSql from './apps/curatedLists/viewIndividualCuratedList/curatorEndorsementsSql';
import SelectListCurators from './apps/curatedLists/viewIndividualCuratedList/selectCurators';
import CreateNewCuratedListInstance from './apps/curatedLists/createNewCuratedListInstance';
import CuratedListsSettings from './apps/curatedLists/settings';
import CuratedListSpecificInstance from './apps/curatedLists/viewInstance/overview';
import SpecificInstanceTechOverview from './apps/curatedLists/viewInstance/techOverview';
import SpecificInstanceViewRatings from './apps/curatedLists/viewInstance/viewRatings';
import SpecificInstanceLeaveRating from './apps/curatedLists/viewInstance/leaveRating';
import MultiListSummariesOfItemScores from './apps/curatedLists/multiListSummariesOfItemScores';
import CuratedListsWithScores from './apps/curatedLists/listsWithScores';
import CuratedListsWithScoresV4 from './apps/curatedLists/listsWithScoresV4';
import CuratedListsWithScoresV5 from './apps/curatedLists/listsWithScoresV5';
import CuratedListsWithScoresV6 from './apps/curatedLists/listsWithScoresV6';
import CuratedListsWithScoresV7 from './apps/curatedLists/listsWithScoresV7';
import CuratedListsWithScoresV8 from './apps/curatedLists/listsWithScoresV8';

import ContentCurationHome from './apps/curatedLists/contentCuration';
import ContextualFeed from './apps/curatedLists/contentCuration/contextualFeed';
import TopicsHome from './apps/curatedLists/contentCuration/topics';
import TopicsRedux from './apps/curatedLists/contentCuration/topics/tableOfTopicsRedux';
import TopicsNostrLive from './apps/curatedLists/contentCuration/topics/tableOfTopicsNostrLive';
import CreateATopic from './apps/curatedLists/contentCuration/topics/createATopic';
import CreateATopicRelationship from './apps/curatedLists/contentCuration/relationships/createARelationship';
import TopicRelationshipsNostrLive from './apps/curatedLists/contentCuration/relationships/tableOfRelationshipsNostrLive';
import TopicRelationshipsSql from './apps/curatedLists/contentCuration/relationships/tableOfRelationshipsRedux';
import ContentCreators from './apps/curatedLists/contentCuration/contentCreators';
import ContentCreatorsEndorsementsNostrLive from './apps/curatedLists/contentCuration/contentCreators/creatorEndorsementsNostrLive';
import ContentCreatorsEndorsementsSql from './apps/curatedLists/contentCuration/contentCreators/creatorEndorsementsSql';
import ContentCreatorsNostrLive from './apps/curatedLists/contentCuration/contentCreators/creatorsNostrLive';
import ContentCreatorsSql from './apps/curatedLists/contentCuration/contentCreators/creatorsSql';
import ContentCurators from './apps/curatedLists/contentCuration/contentCurators';
import ContentCuratorsEndorsementsNostrLive from './apps/curatedLists/contentCuration/contentCurators/curatorEndorsementsNostrLive';
import ContentCuratorsEndorsementsSql from './apps/curatedLists/contentCuration/contentCurators/curatorEndorsementsSql';
import ContentCuratorsNostrLive from './apps/curatedLists/contentCuration/contentCurators/curatorsNostrLive';
import ContentCuratorsSql from './apps/curatedLists/contentCuration/contentCurators/curatorsSql';
import ContentCurationGraphs from './apps/curatedLists/contentCuration/graphs';
import ContentCurationContextTreeGraph from './apps/curatedLists/contentCuration/graphs/contextTree';
import ContentCurationGrapevineGraph from './apps/curatedLists/contentCuration/graphs/grapevine';
import ContentCurationSettingsSql from './apps/curatedLists/contentCuration/settings/sql';
import ContentCurationSettingsRedux from './apps/curatedLists/contentCuration/settings/redux';
import ContentCurationSingleTopicHome from './apps/curatedLists/contentCuration/topic';
import ContentCurationShowCurations from './apps/curatedLists/contentCuration/showCurations';
import ContentCurationShowCurationsOfRels from './apps/curatedLists/contentCuration/showCurations/curationOfRelationships';
import ContentCurationShowCurationsOfTopics from './apps/curatedLists/contentCuration/showCurations/curationOfTopics';
import ContentCurationShowCurationsOfTopicsContent from './apps/curatedLists/contentCuration/showCurations/curationOfTopicsContent';

import AskNostrHome from './apps/askNostr';
import AskNostrSettings from './apps/askNostr/settings';
import AskNostrQuestionsList from './apps/askNostr/questions';
import AskNostrCreateNewQuestion from './apps/askNostr/createNewQuestion';

import EBooksHome from './apps/eBooks';
import EBooksSettings from './apps/eBooks/settings';
import EBook from './apps/eBooks/eBook';
import EBookIndex from './apps/eBooks/eBook/bookIndex';

const AppRoutes = () => {
  const { onDisconnect } = useNostr();
  const dispatch = useDispatch();
  const onDisconnectCallback = (relay) => {
    console.log(
      `onDisconnectCallback, AppRoutes component; relay.url: ${relay.url}`
    );
    dispatch(incrementRelayDisconnectCount(relay.url));
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
      <fieldset id="app">
        <Router>
          <Routes>
            <Route path="/" element={<NIP51Home />} />

            <Route path="/NIP51Home" element={<NIP51Home />} />
            <Route
              path="/NIP51Home/NIP51Settings"
              element={<NIP51Settings />}
            />
            <Route
              path="/NIP51Home/NIP51LoadLists"
              element={<NIP51LoadLists />}
            />
            <Route
              path="/NIP51Home/NIP51ViewLists"
              element={<NIP51ViewLists />}
            />
            <Route
              path="/NIP51Home/NIP51TableOfLists"
              element={<NIP51TableOfLists />}
            />
            <Route
              path="/NIP51Home/NIP51List"
              element={<NIP51List />}
            />
            <Route
              path="/NIP51Home/NIP32Explorer"
              element={<NIP32Explorer />}
            />
            <Route
              path="/NIP51Home/NIP51ListAuthors"
              element={<NIP51ListAuthors />}
            />
            <Route
              path="/NIP51Home/NIP51MakeNewList"
              element={<NIP51MakeNewList />}
            />
            <Route
              path="/NIP51Home/NIP51Kind10000Lists"
              element={<NIP51Kind10000Lists />}
            />
            <Route
              path="/NIP51Home/NIP51Kind10001Lists"
              element={<NIP51Kind10001Lists />}
            />
            <Route
              path="/NIP51Home/NIP51Kind30000Lists"
              element={<NIP51Kind30000Lists />}
            />
            <Route
              path="/NIP51Home/NIP51Kind30001Lists"
              element={<NIP51Kind30001Lists />}
            />

            <Route path="/PrettyGoodHome" element={<PrettyGoodHome />} />
            <Route
              path="/PrettyGoodHome/PrettyGoodProfile"
              element={<PrettyGoodProfile />}
            />
            <Route
              path="/PrettyGoodHome/PrettyGoodAbout"
              element={<PrettyGoodAbout />}
            />
            <Route
              path="/PrettyGoodHome/PrettyGoodFaq"
              element={<PrettyGoodFaq />}
            />
            <Route
              path="/PrettyGoodHome/ThreadedTapestry"
              element={<ThreadedTapestry />}
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
            <Route
              path="/PrettyGoodHome/VisjsHelloWorldMultiGraph"
              element={<VisjsHelloWorldMultiGraph />}
            />
            <Route
              path="/PrettyGoodHome/DataTablesHelloWorld"
              element={<DataTablesHelloWorld />}
            />
            <Route
              path="/PrettyGoodHome/ReactDataTableComponentHelloWorld"
              element={<ReactDataTableComponentHelloWorld />}
            />
            <Route
              path="/PrettyGoodHome/AgGridTableHelloWorld"
              element={<AgGridTableHelloWorld />}
            />
            <Route
              path="/PrettyGoodHome/ExploreNostrNotesByKind"
              element={<ExploreNostrNotesByKind />}
            />
            <Route
              path="/PrettyGoodHome/HTTPGetRequests"
              element={<HTTPGetRequests />}
            />

            <Route
              path="/PrettyGoodHome/Sandbox1"
              element={<Sandbox1 />}
            />
            <Route
              path="/PrettyGoodHome/Sandbox2"
              element={<Sandbox2 />}
            />
            <Route
              path="/PrettyGoodHome/Sandbox3"
              element={<Sandbox3 />}
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
              path="/NostrHome/NostrApp"
              element={<NostrApp />}
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
            <Route path="/NostrHome/NostrRelaysV2" element={<NostrRelaysV2 />} />
            <Route path="/NostrHome/NostrSql" element={<NostrSql />} />
            <Route
              path="/NostrHome/NostrSettingsGrapevine"
              element={<NostrSettingsGrapevine />}
            />
            <Route
              path="/NostrHome/NostrSettingsExtendedFollowing"
              element={<NostrSettingsExtendedFollowing />}
            />
            <Route
              path="/NostrHome/NostrMainFeedSettings"
              element={<NostrMainFeedSettings />}
            />
            <Route
              path="/NostrHome/ProfileManagement"
              element={<ProfileManagement />}
            />
            <Route
              path="/NostrHome/ChannelManagement"
              element={<ChannelManagement />}
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
              path="/GrapevineHome/GrapevineGraphViewFollowing"
              element={<GrapevineGraphViewFollowing />}
            />
            <Route
              path="/GrapevineHome/GrapevineGraphViewExtendedFollowing"
              element={<GrapevineGraphViewExtendedFollowing />}
            />
            <Route
              path="/GrapevineHome/GrapevineListCuration"
              element={<GrapevineListCuration />}
            />
            <Route
              path="/GrapevineHome/GrapevineRecommendedRelays"
              element={<GrapevineRecommendedRelays />}
            />
            <Route
              path="/GrapevineHome/GrapevineVisualizationMainPage"
              element={<GrapevineVisualizationMainPage />}
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
            <Route
              path="/ConceptGraphHome/ConceptGraphViewWords"
              element={<ConceptGraphViewWords />}
            />
            <Route
              path="/ConceptGraphHome/ConceptGraphCreateWord"
              element={<ConceptGraphCreateWord />}
            />
            <Route path="/CuratedListsHome" element={<CuratedListsHome />} />
            <Route
              path="/CuratedListsHome/CuratedListsLandingPage"
              element={<CuratedListsLandingPage />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsLandingPageRedirect"
              element={<CuratedListsLandingPageRedirect />}
            />
            <Route
              path="/CuratedListsHome/AboutCuratedLists"
              element={<AboutCuratedLists />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsFaq"
              element={<CuratedListsFaq />}
            />
            <Route
              path="/CuratedListsHome/ViewListOfCuratedLists"
              element={<ViewListOfCuratedLists />}
            />
            <Route
              path="/CuratedListsHome/ViewAllLists"
              element={<ViewAllLists />}
            />
            <Route
              path="/CuratedListsHome/ViewAllListsFromNostrLive"
              element={<ViewAllListsFromNostrLive />}
            />
            <Route
              path="/CuratedListsHome/ViewAllListsFromSql"
              element={<ViewAllListsFromSql />}
            />
            <Route
              path="/CuratedListsHome/ViewMyLists"
              element={<ViewMyLists />}
            />
            <Route
              path="/CuratedListsHome/CreateNewCuratedList"
              element={<CreateNewCuratedList />}
            />
            <Route
              path="/CuratedListsHome/ViewIndividualCuratedList"
              element={<ViewIndividualCuratedList />}
            />
            <Route
              path="/CuratedListsHome/ViewIndividualCuratedListTechOverview"
              element={<ViewIndividualCuratedListTechOverview />}
            />
            <Route
              path="/CuratedListsHome/SingleListGraphOfInstances"
              element={<SingleListGraphOfInstances />}
            />
            <Route
              path="/CuratedListsHome/CuratedListAllItemsNostrLive"
              element={<CuratedListAllItemsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/CuratedListAllItemsSql"
              element={<CuratedListAllItemsSql />}
            />
            <Route
              path="/CuratedListsHome/CuratedListAllRatingsNostrLive"
              element={<CuratedListAllRatingsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/CuratedListAllRatingsSql"
              element={<CuratedListAllRatingsSql />}
            />
            <Route
              path="/CuratedListsHome/CuratorsOfIndividualList"
              element={<CuratorsOfIndividualList />}
            />
            <Route
              path="/CuratedListsHome/InstancesOfIndividualList"
              element={<InstancesOfIndividualList />}
            />
            <Route
              path="/CuratedListsHome/CuratedListEndorsementsOfCuratorsNostrLive"
              element={<CuratedListEndorsementsOfCuratorsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/CuratedListEndorsementsOfCuratorsSql"
              element={<CuratedListEndorsementsOfCuratorsSql />}
            />
            <Route
              path="/CuratedListsHome/SelectListCurators"
              element={<SelectListCurators />}
            />
            <Route
              path="/CuratedListsHome/CreateNewCuratedListInstance"
              element={<CreateNewCuratedListInstance />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsSettings"
              element={<CuratedListsSettings />}
            />
            <Route
              path="/CuratedListsHome/CuratedListSpecificInstance"
              element={<CuratedListSpecificInstance />}
            />
            <Route
              path="/CuratedListsHome/SpecificInstanceTechOverview"
              element={<SpecificInstanceTechOverview />}
            />
            <Route
              path="/CuratedListsHome/SpecificInstanceViewRatings"
              element={<SpecificInstanceViewRatings />}
            />
            <Route
              path="/CuratedListsHome/SpecificInstanceLeaveRating"
              element={<SpecificInstanceLeaveRating />}
            />
            <Route
              path="/CuratedListsHome/MultiListSummariesOfItemScores"
              element={<MultiListSummariesOfItemScores />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScores"
              element={<CuratedListsWithScores />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScoresV4"
              element={<CuratedListsWithScoresV4 />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScoresV5"
              element={<CuratedListsWithScoresV5 />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScoresV6"
              element={<CuratedListsWithScoresV6 />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScoresV7"
              element={<CuratedListsWithScoresV7 />}
            />
            <Route
              path="/CuratedListsHome/CuratedListsWithScoresV8"
              element={<CuratedListsWithScoresV8 />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationHome"
              element={<ContentCurationHome />}
            />
            <Route
              path="/CuratedListsHome/ContextualFeed"
              element={<ContextualFeed />}
            />
            <Route
              path="/CuratedListsHome/ContentCreators"
              element={<ContentCreators />}
            />
            <Route
              path="/CuratedListsHome/ContentCurators"
              element={<ContentCurators />}
            />
            <Route
              path="/CuratedListsHome/TopicsHome"
              element={<TopicsHome />}
            />
            <Route
              path="/CuratedListsHome/TopicsNostrLive"
              element={<TopicsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/TopicsRedux"
              element={<TopicsRedux />}
            />
            <Route
              path="/CuratedListsHome/CreateATopic"
              element={<CreateATopic />}
            />
            <Route
              path="/CuratedListsHome/CreateATopicRelationship"
              element={<CreateATopicRelationship />}
            />
            <Route
              path="/CuratedListsHome/TopicRelationshipsNostrLive"
              element={<TopicRelationshipsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/TopicRelationshipsSql"
              element={<TopicRelationshipsSql />}
            />

            <Route
              path="/CuratedListsHome/ContentCreatorsEndorsementsNostrLive"
              element={<ContentCreatorsEndorsementsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/ContentCreatorsEndorsementsSql"
              element={<ContentCreatorsEndorsementsSql />}
            />
            <Route
              path="/CuratedListsHome/ContentCreatorsNostrLive"
              element={<ContentCreatorsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/ContentCreatorsSql"
              element={<ContentCreatorsSql />}
            />

            <Route
              path="/CuratedListsHome/ContentCuratorsEndorsementsNostrLive"
              element={<ContentCuratorsEndorsementsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/ContentCuratorsEndorsementsSql"
              element={<ContentCuratorsEndorsementsSql />}
            />
            <Route
              path="/CuratedListsHome/ContentCuratorsNostrLive"
              element={<ContentCuratorsNostrLive />}
            />
            <Route
              path="/CuratedListsHome/ContentCuratorsSql"
              element={<ContentCuratorsSql />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationGraphs"
              element={<ContentCurationGraphs />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationContextTreeGraph"
              element={<ContentCurationContextTreeGraph />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationGrapevineGraph"
              element={<ContentCurationGrapevineGraph />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationSettingsSql"
              element={<ContentCurationSettingsSql />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationSettingsRedux"
              element={<ContentCurationSettingsRedux />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationSingleTopicHome"
              element={<ContentCurationSingleTopicHome />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationShowCurations"
              element={<ContentCurationShowCurations />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationShowCurationsOfRels"
              element={<ContentCurationShowCurationsOfRels />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationShowCurationsOfTopics"
              element={<ContentCurationShowCurationsOfTopics />}
            />
            <Route
              path="/CuratedListsHome/ContentCurationShowCurationsOfTopicsContent"
              element={<ContentCurationShowCurationsOfTopicsContent />}
            />

            <Route
              path="/AskNostrHome"
              element={<AskNostrHome />}
            />
            <Route
              path="/AskNostrHome/AskNostrSettings"
              element={<AskNostrSettings />}
            />
            <Route
              path="/AskNostrHome/AskNostrQuestionsList"
              element={<AskNostrQuestionsList />}
            />
            <Route
              path="/AskNostrHome/AskNostrCreateNewQuestion"
              element={<AskNostrCreateNewQuestion />}
            />

            <Route
              path="/EBooksHome"
              element={<EBooksHome />}
            />
            <Route
              path="/EBooksHome/EBooksSettings"
              element={<EBooksSettings />}
            />
            <Route
              path="/EBooksHome/EBook"
              element={<EBook />}
            />
            <Route
              path="/EBooksHome/EBookIndex"
              element={<EBookIndex />}
            />
          </Routes>
        </Router>
      </fieldset>
    </>
  );
};

export default AppRoutes;

/*
// LISTENERS: place at bottom of this page; or might move some to other specific pages
    <NostrProfilesListener />
    <DirectMessageListener /> // move to direct message page?
    <GrapevineListener /> // move to grapevine header?
    <MyProfileListener /> // moved to my profile page
*/
