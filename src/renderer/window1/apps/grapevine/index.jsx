import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from '../../mastheads/grapevineMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/grapevine/home';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class GrapevineHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Grapevine: Home';
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
            <div className="h3">What is the Grapevine?</div>
            <p>
              The Grapevine is a web of trust. Its purpose, broadly speaking, is
              to collect and feed information of interest about the world to
              you. Instead of going to google or asking an AI about some topic
              of interest, you will one day ask: what does my Grapevine tell me
              about that? Note: you will not be asking <i>the</i> grapevine; you
              will be asking <i>your</i> grapevine. Although you may be a node
              in someone else's grapevine, and although your grapevine may
              overlap considerably with someone else's, you are always at the
              center of your Grapevine, and have the ultimate authority in its
              design and function.
            </p>
            <p>
              What sets the Grapevine apart from all previous attempts at
              building a web of trust is that the Grapevine was designed
              specifically with the Concept Graph in mind. Together, the primary
              purpose of the Concept Graph and the Grapevine is to generate
              context-specific consensus on a means of communication -- a
              language -- without the need for any centralized entity like a
              tech company or a standards body, and to do so quickly,
              efficiently and effectively.
            </p>
            <p>
              Once a consensus on the means of communication has been
              established, the Grapevine and the Concept Graph can be used,
              sometimes separately and sometimes together, for a wide variety of
              purposes that go beyond language building. When they are working
              in tandem, you can think of the Concept Graph as a way to ask a
              question in a way that compares apples to apples, and the
              Grapevine as a way for your web of trust to answer it. For an
              overview of the Concept Graph, follow{' '}
              <NavLink to="/ConceptGraphHome">this link</NavLink>.
            </p>
            <p>
              The best way to understand the Grapevine will be to use it, so to
              that end, a Pretty Good grapevine app is being built for use with
              the Pretty Good nostr client. As an initial foray, with a few
              button clicks you will soon be able to build your nostr web of
              trust and use it to manage your nostr relay list. That way, if a
              few individuals within the nostr community take the time to curate
              a list of decent nostr relays, we will all benefit from their
              work. Your grapevine will determine who does and does not have
              influence over your relay list, and how much. They may be close to
              you in the web of trust, or they may be many hops away. You may or
              may not even know who those individuals are. If the identities of
              those individuals change when you're not paying attention, it
              won't matter -- your grapevine will pay attention so you won't
              have to.
            </p>
            <p>
              Once this is functional, and it is hopefully evident how the
              grapevine works, the ability to delegate more tasks (to curate
              more lists) will be added. What lists will depend on user
              feedback. You will discover that different individuals will have
              different amounts of influence over your grapevine, and that
              influence is context-specific. Alice may influence nostr relay
              list curation but not book recommendations, whereas Bob may be the
              other way around. Influence over generic contexts (movies) will be
              inherited by more specific contexts (dramas), although more
              specific data (Bob is an expert on westerns of a specific era)
              will always override the more generic (Bob doesn't know squat
              about movies in general). Who will keep track of all these
              different contexts, including the relation between dramas and
              movies in general? Your grapevine, of course! Unless you want to
              attend to any of these tasks (like adding nodes to the context
              tree) yourself. Then others will be able benefit from your work,
              using their own grapevines!
            </p>
            <p>
              For now, any contributions you make to the grapevine at large will be
              gratis. Eventually, you will be able to sell data for sats, like
              your up-to-the-minute list of the best nostr relays. If you do
              good work, your influence in the grapevine on this topic will
              rise, and you may be able to charge some real money!
            </p>
            <p>Further explanations will be forthcoming.</p>
          </div>
        </div>
      </>
    );
  }
}
