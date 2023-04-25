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
        For the sake of this essay, a <i>distributed system</i> is defined as a
        set of entities which will from time to time assemble into{' '}
        <i>networks</i> (a subset of the system's entities; e.g; a social media
        network) that engage in peer-to-peer communication, requiring
        network-wide (not necessarily system-wide) consensus on rules and
        symbols of communication, i.e. a <i>language</i>. The system is said to
        be <i>decentralized</i> if there is no entity with a presumed,
        guaranteed or prespecified authority to define, maintain, update, assert
        any such language over the entire network.
      </div>
    </>
  );
};
export default Content;
