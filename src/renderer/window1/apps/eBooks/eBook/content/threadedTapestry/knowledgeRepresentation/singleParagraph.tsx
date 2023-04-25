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
        <i>Knowledge representation</i> refers to the technical problem of
        encoding knowledge into a symbolic language that is useful for the task
        at hand. In the threaded tapestry model of knowledge representation,
        information is broken into chunks which are represented as nodes in a
        graph, with edges in the graph representing relationships between the
        nodes. Any contiguous series of edges is called a thread. Although the
        number of distinct types of nodes, edges, and threads is unlimited, we
        will discover that a small handful of specialized node, relationship,
        and thread types is sufficient to flesh out the full model.
      </div>
    </>
  );
};
export default Content;
