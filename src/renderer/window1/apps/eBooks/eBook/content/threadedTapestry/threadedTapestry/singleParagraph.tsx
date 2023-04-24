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
        The Threaded Tapestry model is a proposed model of knowledge
        representation and curation for network subsets of a distributed,
        decentralized system, such as the decentralized web. It is designed to
        solve the chief problem faced by such networks: how to develop and
        manage a common language, without which no network can properly
        function.
      </div>
    </>
  );
};
export default Content;
