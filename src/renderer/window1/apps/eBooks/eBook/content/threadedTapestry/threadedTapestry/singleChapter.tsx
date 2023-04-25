import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        <div>
          The <i>threaded tapestry</i> model is a proposed model of{' '}
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('knowledgeRepresentation'));
            }}
          >
            knowledge representation
          </div>{' '}
          and{' '}
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('knowledgeCuration'));
            }}
          >
            knowledge curation
          </div>{' '}
          for a
          <div
            className="eBookHyperlink"
            onClick={() => {
              dispatch(updateCurrentItemFocus('decentralizedDistributedSystem'));
            }}
          >
            decentralized, distributed system
          </div>{' '}
          such as the decentralized web. It is designed to solve the chief problem
          faced by such networks: how to develop and manage{' '}
          <i>common languages</i>, without which no network can properly function.
        </div>

        <p>
          You may want to play around with Curated Lists before reading about this
          model. Will probably be easier to follow.
        </p>

        <p>
          The reader may be forgiven for intermittently wondering whether the
          below considerations are intended to apply to a shared spoken language
          in the analog world or to online communities of the digital world. They
          obviously already do apply in the analog world. But applying them in the
          digital realm may seem impossible. We maintain that the proposed
          solutions will never be perfect; but we do contend that they will be
          pretty good.
        </p>

        <p>
          The proposed solution will rely crucially upon a key observation, which
          follows naturally from the discussion below:{' '}
          <i>
            Only a small fraction of a network's entities will desire to influence
            the language; the vast majority of entities will desire only to be on
            the same page as everyone else and will be happy to follow
            influencers.
          </i>{' '}
          Intuitively, that is a promising start; but it's not yet a full
          solution.
        </p>

        <div style={{ fontSize: '22px' }}>
          more precise statement of the problem
        </div>

        <p>
          Consider a system of entities (e.g. users), subsets of which will from
          time to time assemble into <i>networks</i> (e.g. social networks) that
          engage in peer-to-peer communication, requiring network-wide (not
          necessarily system-wide) consensus on rules and symbols of communication
          (they need to speak the same language). For online networks,{' '}
          <i>language</i> may refer to computer languages, standards,
          specifications, protocols, data models, data formats, consensus rules,
          etc. Indeed, a network may be <i>defined</i> as any subset of the larger
          system characterized by any shared, functioning linguistic consensus.
          The nostr community, for example, is a network characterized by common
          usage of the nostr protocol.
        </p>

        <p>Assumptions:</p>

        <li>
          Networks (subsets of the full set of entities) are often stable but in
          some cases may arise or dissolve quickly; may be highly dynamic, even
          fleeting. Networks can overlap and may have overlapping linguistic rules
          and vocabulary. They may also be divided into subnetworks requiring
          consensus on subsets of linguistic conventions.
        </li>
        <li>
          A bird's eye view of the system, or even any given network, may or may
          not not be available to any single entity.
        </li>
        <li>
          Any given language may require frequent, rapid, and detailed updates,
          even in the absence of any other changes to the system or network
          itself. Network function must be robust/resilient to minor changes or
          disagreements over linguistic rules.
        </li>
        <li>
          Decentralization: there is no entity with a presumed, guaranteed or
          prespecified authority to define, maintain, update, assert any such
          language.
        </li>
        <li>
          Specific entities may gain influence over the language by earning the
          respect (trust) of other entities. However, any influential entity today
          (e.g. standards or specifications committees, dev teams) may fall out of
          favor tomorrow, and network function must be resilient to this.
        </li>
        <li>
          Most linguistic rules and symbols are noncontroversial, but lack any
          obvious schelling point.
        </li>
        <li>
          Attention to language consensus rules requires (a probably small but
          nevertheless nontrivial amount of) cognitive / computational work. Not
          only the act of devising changes to the language, but also the effort
          required to gain influence over others in the network to implement those
          changes.
        </li>

        <br />

        <div style={{ fontSize: '22px' }}>proposed solution</div>

        <p>
          The proposed solution can be broken down into two components:
          decentralized knowledge representation and decentralized knowledge
          curation.
        </p>

        <p>prerequisites and definitions:</p>

        <p>Each entity independently implements the below model.</p>

        <p>
          Knowledge is divided into "chunks" and represented as nodes on a graph.
          Edges on the graph are directed arrows and represent relationships
          between individual chunks. Digitally, a chunk would often be an
          individual computer file.
        </p>

        <p>an edge between two nodes is called a hop</p>

        <p>any contiguous sequence of hops is called a thread</p>

        <p>
          The number of node types, relationship types, and thread types is
          theoretically unlimited and managed dynamically, although we will
          discover that a small handful of specialized node, relationship, and
          thread types is sufficient to flesh out the full model.
        </p>

        <p>
          There are therefor two distinct ways to store data: first, inside a
          chunk; second, inside the graph. The method of data storage (knowledge
          representation) inside the chunks is outside the purview of the threaded
          tapestry model, which is concerned solely on how knowledge is
          represented topologically in the graph.
        </p>

        <div style={{ fontSize: '22px' }}>
          decentralized knowledge representation (dKR)
        </div>

        <p>
          (exemplified by the concept graph. In Curated Lists, a list is a
          proto-concept.)
        </p>

        <p>
          dKR relies upon a specialized type of thread called a class thread. For
          reasons that should become clear, this name is in reference to a Class
          in javascript or any other object oriented language.
        </p>

        <p>(...)</p>

        <div style={{ fontSize: '22px' }}>decentralized knowledge curation</div>

        <p>
          (exemplified by the grapevine. See Curated Lists for demonstration.)
        </p>

        <p>(...)</p>
      </div>
    </>
  );
};
export default Content;
