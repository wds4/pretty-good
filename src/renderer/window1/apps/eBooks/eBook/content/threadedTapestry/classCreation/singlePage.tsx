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
        <i>Class creation</i> refers to the threads that feed into the{' '}
        <i>class node</i> at the head of a <i>class thread</i> and which
        function to define the associated concept.
      </div>
      <p>
        The best way to illustrate class creation is by way of example. Let us
        assume that most or all of the nodes in the graph in question are JSON
        files, as is the case in Pretty Good Apps. Keep in mind that, in
        principle, the threaded tapestry method is agnostic regarding the data
        structures inside nodes (chunks). Graphs that emply data structures
        other than JSON files may have different methods of class creation.
        Indeed, it is to be assumed that even graphs that do rely upon JSON
        files may not make the same design decisions as have been made in Pretty
        Good Apps.
      </p>
      <p>
        In Pretty Good Apps, class creation is achieved through the use of JSON
        Schemas. Alternative data structures that do not use JSON Schemas could
        be used, as per the preferences of the developer. Through the principle
        of <i>lock-in minimization</i>, Alice and Bob will be able to interact
        even when their respective platforms use nonidentical choices regarding
        class creation.
      </p>
      <p>
        In Pretty Good Apps, clas creation is achieved using the{' '}
        <i>property tree</i>. The apex of the property tree is a node which is a
        JSON Schema, and which is connected directly to the <i>class node</i>.
        Individual properties are represented using individual{' '}
        <i>property nodes</i> and are connected in such a way that the entire
        JSON Schema can be reconstructed from scratch from the property tree.
        JSON Schema reconstruction relies heavily on <i>topological encoding</i>{' '}
        of data in the property tree, as well as some data that is encoded
        within individual property nodes.
      </p>
    </>
  );
};
export default Content;
