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
        <i>Lock-in minimization</i> refers to the principle that the{' '}
        <i>primaryChallenge</i>
        of a <i>decentralized, distributed network</i> requires any two members
        Alice and Bob to have prearranged consensus on methods of communication,
        and that the requisite consensus should be minimized.
        Lock-in minimization provides a Schelling point.
        We propose the threaded tapestry method as a candidate for this Schelling point.
      </div>
    </>
  );
};
export default Content;
