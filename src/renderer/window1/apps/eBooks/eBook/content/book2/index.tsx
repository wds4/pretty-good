import { useSelector } from 'react-redux';

const Section = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  switch (itemSlug) {
    default:
      return (
        <>
          <div>Secton / Item: {itemSlug}</div>
        </>
      );
  }
};
export default Section;
