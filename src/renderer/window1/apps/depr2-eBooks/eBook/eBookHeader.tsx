import { useSelector } from 'react-redux';

const EBookHeader = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  return (
    <>
      <div className="h3">{eBooks[currentFocus.eBook].title}</div>
    </>
  );
};
export default EBookHeader;
