import React from 'react';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { NavLink } from 'react-router-dom';

export default class PrettyGoodHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'home';
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
            <div className="h2">Welcome to the Pretty Good family of apps</div>

            <p>
              The immediate motivation behind Pretty Good Apps is to convince
              other developers in this space that{' '}
              <i>
                <span style={{ color: 'red' }}>
                  decentralized curation of simple lists is the defining ability
                  of the decentralized web.
                </span>
              </i>{' '}
              It has power and versatility far beyond what is apparent at first
              glance. This does not require adoption of any particular
              blockchain, token, protocol or data structure. It does require
              adoption of a model, discussed below, that is somewhat abstract.
              In this app, rather than talk about this model in the abstract, I
              show it in action.
            </p>

            <p>
              I want developers to consider how they might build{' '}
              <i>decentralized curation of simple lists</i> into their apps.
              What does that mean? Consider some feature of your app that takes
              the form of a simple list. One example would be the list of user
              attributes or properties: username, handle, email, picture_url,
              location, etc. As another example, consider the list of ways to
              rate a product on an eCommerce app: product quality, delivery
              speed, etc. Now imagine giving your users power over that (or a
              small handful of) lists. Users can use your app's default list,
              edit it themselves, or{' '}
              <i>delegate curation of that list to their web of trust</i>. The
              purpose of Pretty Good Apps is to help you imagine how that might
              work.
            </p>

            <p>
              On the topic of versatility, consider that a graph can be
              specified in full using two simple lists: one list for nodes, and
              one list for edges. A data model (e.g. a verifiable credential),
              an ontology, a schema or a context tree: these can all be built
              out of simple lists, each one of which can be curated. Alice's WoT
              and Bob's WoT, though they are not identical, are very likely to
              have significant overlap. For any given list, although there is no
              guarantee, there is a good chance that Alice and Bob will end up
              using the exact same (or at least almost the same) list! This is a
              vitally important attribute, one that I call{' '}
              <i>loose consensus</i>. You'll want to think deeply about{' '}
              <i>loose consensus</i> before incorporating decentralized list
              curation to your app.
            </p>

            <p>
              At the more abstract level, the motivation behind Pretty Good Apps
              is to showcase the{' '}
              <NavLink to="/PrettyGoodHome/ThreadedTapestry">
                threaded tapestry
              </NavLink>{' '}
              model of <i>knowledge representation</i> and{' '}
              <i>knowledge curation</i> for distributed & decentralized
              networks. <NavLink to="/CuratedListsHome">Curated Lists</NavLink>{' '}
              will be the initial application to make use of this model. The
              long term goal is for all projects in the decentralized web to
              apply the basic principles of this model, in one form or another.
              A high level overview of these principles is forthcoming.
            </p>

            <p>
              You can activate Curated Lists app in{' '}
              <NavLink to="/PrettyGoodHome/PrettyGoodSettings">
                settings
              </NavLink>{' '}
              if it is not already visible.
            </p>

            <p>
              The baseline app is a desktop nostr client,{' '}
              <NavLink to="/NostrHome/NostrMainFeed">Pretty Good Nostr</NavLink>
              , with Twitter-like features similar to those of other nostr
              clients. As an added bonus to other devs, in{' '}
              <NavLink to="/PrettyGoodHome/PrettyGoodSettings">
                settings
              </NavLink>{' '}
              you can activate toggle buttons to look a little bit under the
              hood and explore things like raw JSON for nostr notes or raw JSON
              for ratings and endorsements employed by the Curated Lists app.
            </p>

            <div className="h2">May 2023 status: *** still in alpha ***</div>

            <p>
              Once this app matures sufficiently, I hope to attract the
              attention of other dev teams and motivate them to incorporate the
              threaded tapestry model into their projects.
            </p>

            <p>
              After that, I hope to shift focus to a higher level, abstract
              overview of the threaded tapestry model.
            </p>
          </div>
        </div>
      </>
    );
  }
}
