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
      <p>
        <i>Knowledge curation</i> refers to the technical problem of ranking or
        choosing among alternatives, often in a context-specific manner and
        according to some system of values. Knowledge cannot be curated without
        first being encoded in some manner. Therefore, to solve the problem of
        knowledge curation, the problem of knowledge representation must also be
        solved.
      </p>
    </>
  );
};
export default Content;
