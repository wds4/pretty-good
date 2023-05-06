import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div className="h3">
        Who should implement the threaded tapestry method?
      </div>
      <p>Developers of any peer-to-peer platform, project, library.</p>
      <div className="h3">Why?</div>
      <p>
        So that users of your code will benefit from the ability to coordinate
        common methods of communication with users of other p2p projects which
        are not your project, but which also use the threaded tapestry method.
      </p>
      <div className="h3">How?</div>
      <p>
        Any decisions where you would like to avoid lock-in; any decisiont that
        you would like to allow your users to make and/or to delegate to their
        web of trust; e.g., how to format messages, details of UI, methods of
        encryption, rating systems.
      </p>
      <p>
        Represent data as nodes on a graph. Employ class threads to organize
        nodes into concepts. Optional: property tree method, which requires
        nodes to be JSON objects and the use of JSON Schema to define class
        nodes. Other data models (other than JSON) may also be used.
      </p>
      <p>
        Emply the basic tenets of the grapevine. (Need to enumerate the
        minimumized tenets for this.)
      </p>
    </>
  );
};
export default Content;
