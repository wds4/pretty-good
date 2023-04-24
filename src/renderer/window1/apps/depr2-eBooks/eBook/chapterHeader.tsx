import { useSelector } from 'react-redux';

const ItemHeader = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;

  const oItems = oEBooks[eBookSlug].items;
  const aItems = Object.keys(oItems);

  return (
    <>
      <div className="h3">{itemSlug}</div>
    </>
  );
};
export default ItemHeader;
