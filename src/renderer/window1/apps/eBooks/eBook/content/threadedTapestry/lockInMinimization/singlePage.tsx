import { useSelector } from 'react-redux';

const Content = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        Goal: for Alice and Bob to be able to communicate peer to peer in a
        meaingful manner. Hypothesis: the threaded tapestry method is the best
        way to do this. The threaded tapestry method requires that data be
        broken down and represented as nodes in a graph, with topological data
        storage achieved using the class thread method. (Also: basic principles
        of the grapevine?) No other lock-in is required. In particular, it
        should not be necessary for ALice and Bob to use the same client, or the
        same platform, or for the nodes in their graphs to use the same data
        structures (e.g. JSON objects), or for them both to use JSON Schemas
        with the property tree method of topological data encoding.
      </div>
      <p>
        In many cases, minimization can be achieved by removing all but the
        minimum required features from the base layer, and pushing them to
        higher layers so that different users can employ distinct solutions to
        any given problem / achieve a given feature.
      </p>
      <div className="h3">examples of lock-in</div>
      <li>
        For Alice and Bob to communicate via Twitter, they are "locked-in" to
        the Twitter platform which is controlled by the company, Twitter. This
        is a large footprint, encopasing an unknown number of lines of code
        (unknown since it is proprietary).
      </li>
      <li>
        For Alice and Bob to communicate via bluesky, they are locked-in to the
        bluesky platform. (Is this true?) The footprint includes (how many lines
        of code? how many libraries?)
      </li>
      <li>
        For Alice and Bob to communicate via nostr, they are locked-in to the
        nostr protocol. They do not necessarily need to use the same client or
        even the same implemnation of the protocol. This is a significantly
        reduced footprint as compared to Twitter lock-in. Arguably, nostr
        protocol has the smallest footprint of any other attempt at
        decentralized social media, which may be the reason for its success.
        Nevertheless, the protocol requires lock-in (for now) to a single
        cryptographic protocol (?).
      </li>
      <li>
        For Alice and Bob to transmit value using bitcoin, they are locked-in to
        the bitcoin consensus rules.
      </li>
    </>
  );
};
export default Content;
