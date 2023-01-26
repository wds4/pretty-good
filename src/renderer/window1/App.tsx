import React, { StrictMode } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { NostrProvider } from 'nostr-react';
import { Provider } from 'react-redux';

import store from './redux/store/store';
import { updateMainColWidth } from './lib/pg/ui';

// Routes
import PrettyGoodHome from './apps/prettyGood/index';
import PrettyGoodProfile from './apps/prettyGood/profile/index';
import PrettyGoodSettings from './apps/prettyGood/settings/index';
import PrettyGoodIPFSLightweight from './apps/prettyGood/settings/networksAndDatabases/ipfsLightweight';
import PrettyGoodIPFSHeavyweight from './apps/prettyGood/settings/networksAndDatabases/ipfsHeavyweight';
import PrettyGoodNostr from './apps/prettyGood/settings/networksAndDatabases/nostr';
import PrettyGoodSql from './apps/prettyGood/settings/networksAndDatabases/sql';
import PrettyGoodApps from './apps/prettyGood/apps';
import PrettyGoodHelloWorld from './apps/prettyGood/settings/helloWorld/index';

import NostrHome from './apps/nostr/index';
import NostrProfile from './apps/nostr/profile/index';
import NostrSettings from './apps/nostr/settings/index';

import NostrProfiles from './apps/nostr/settings/profiles/index';
import NostrRelays from './apps/nostr/settings/relays/index';
import NostrSql from './apps/nostr/settings/sql/index';

import GrapevineHome from './apps/grapevine/index';
import GrapevineProfile from './apps/grapevine/profile/index';
import GrapevineSettings from './apps/grapevine/settings/index';

import ConceptGraphHome from './apps/conceptGraph/index';
import ConceptGraphProfile from './apps/conceptGraph/profile/index';
import ConceptGraphSettings from './apps/conceptGraph/settings/index';

// css
import './css/app.css';
import './css/navbars.css';
import './css/mastheads.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    window.addEventListener('resize', updateMainColWidth);
  }

  render() {
    return (
      <StrictMode>
        <Provider store={store}>
          <fieldset id="app">
            <Router>
              <Routes>
                <Route path="/" element={<PrettyGoodHome />} />

                <Route path="/PrettyGoodHome" element={<PrettyGoodHome />} />
                <Route path="/PrettyGoodHome/PrettyGoodProfile" element={<PrettyGoodProfile />} />
                <Route path="/PrettyGoodHome/PrettyGoodSettings" element={<PrettyGoodSettings />} />
                <Route path="/PrettyGoodHome/PrettyGoodIPFSLightweight" element={<PrettyGoodIPFSLightweight />} />
                <Route path="/PrettyGoodHome/PrettyGoodIPFSHeavyweight" element={<PrettyGoodIPFSHeavyweight />} />
                <Route path="/PrettyGoodHome/PrettyGoodNostr" element={<PrettyGoodNostr />} />
                <Route path="/PrettyGoodHome/PrettyGoodSql" element={<PrettyGoodSql />} />
                <Route path="/PrettyGoodHome/PrettyGoodApps" element={<PrettyGoodApps />} />
                <Route path="/PrettyGoodHome/PrettyGoodHelloWorld" element={<PrettyGoodHelloWorld />} />


                <Route path="/NostrHome" element={<NostrHome />} />
                <Route path="/NostrHome/NostrProfile" element={<NostrProfile />} />
                <Route path="/NostrHome/NostrSettings" element={<NostrSettings />} />

                <Route path="/NostrHome/NostrProfiles" element={<NostrProfiles />} />
                <Route path="/NostrHome/NostrRelays" element={<NostrRelays />} />
                <Route path="/NostrHome/NostrSql" element={<NostrSql />} />


                <Route path="/GrapevineHome" element={<GrapevineHome />} />
                <Route path="/GrapevineHome/GrapevineProfile" element={<GrapevineProfile />} />
                <Route path="/GrapevineHome/GrapevineSettings" element={<GrapevineSettings />} />


                <Route path="/ConceptGraphHome" element={<ConceptGraphHome />} />
                <Route path="/ConceptGraphHome/ConceptGraphProfile" element={<ConceptGraphProfile />} />
                <Route path="/ConceptGraphHome/ConceptGraphSettings" element={<ConceptGraphSettings />} />
              </Routes>
            </Router>
          </fieldset>
        </Provider>
      </StrictMode>
    );
  }
}
