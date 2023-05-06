import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        There are two very distinct ways of storing data in the concept graph:
        within individual nodes{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('chunk'));
          }}
        >
          ("chunks")
        </div>
        , and into the topology of the graph itself. In many cases, the same
        data will be stored redundantly using both methods, for reasons outlined
        below.
      </div>
      <div className="h3">data storage within nodes</div>
      <p>
        The threaded tapestry model is agnostic regarding the way that data is
        encoded within a node (chunk). Indeed, data is not necessarily even
        digital; a node could represent, for instance, a book. Within any given
        concept graph and within any individual concept, the class node will
        usually (always?) contain a (not necessarily complete) specification of
        the data that is to be expected in instances of the concept and how to
        extract that data (e.g, how that data is formatted). In{' '}
        <i>Pretty Good Apps</i>, most nodes are digital data files with one JSON
        object per node. As Pretty Good Apps matures, other types of nodes
        (images, other types of data files, etc) may be utilized.
      </p>
      <div className="h3">data storage within topology</div>
      <p>
        The primary method of topological data storage within the graph
        (<i>topoligical data encoding</i>)
         relies
        directly on the structure of a class thread. Given the concept of Dog
        (see example image), a list of all dogs who live in Nashville would be
        extracted by looking for all class threads emanating from the class node
        corresponding to dog, and that pass through the particular set in
        question. This would require a path search, which is computationally
        expensive. Other methods of data extraction from the graph itself will
        also be utilized; for example, construction and utilization of{' '}
        <i>analogies</i>, which typically require pattern searches that are even
        more complex than path searches looking for class threads.
      </p>
      <div className="h3">an example</div>
      <p>
        (image) Consider the concept: dog with instances: Fido, Spot, etc, as
        depicted in the image.
      </p>
      <div className="h3">why data duality?</div>
      <p>
        The purpose of data duality is to get the best of both worlds, mixing
        the advantages of topological data storage with the advantages of
        file-based data storage (within nodes / "chunks").
      </p>
      <p>
        Data storage in the concept graph has several advantages. Primary
        advantage: data normalization is straightforward. If you are adding an
        instance to a concept, rearranging the subset tree, adding a
        relationship between one concept and another, the graph only needs to be
        updated in one location. One (the primary?) disadvantage of topological
        data storage is that searches through a graph are resource intensive
        from a computational standpoint, and increase rapidly with the
        complexity of the search and the size of the graph.
      </p>
      <p>
        Data storage within nodes has the advantage that data lookup is rapid.
        However, the disadvantage is that it is not clear how to approach the
        issue of data normalization, nor that it is even achievable at all.
        Example: in the Dog example above, multiple individusl nodes need to be
        updated with the name Fido.
      </p>
      <div className="h3">data processing</div>
      <p>
        In general, data will be added first to the graph itself, and at some
        later point, individual files will be updated. This is expected to be
        computationally resource intensive; indeed, the size and complexity of
        the concept graph may be limited by available resources. Therefore, the
        process of transferring data from the topology into the nodes would best
        be performed as a background task, when resources are available. Indeed,
        it is tempting to speculate within the context of the neuronal tapestry
        that one of the purposes of non REM sleep may be this type of background
        data processing / upkeep of the concept graph, with the purpose of REM
        sleep being background, resource intensive processing / upkeep of the
        value-rich calculations of the grapevine.
      </p>
    </>
  );
};
export default Content;
