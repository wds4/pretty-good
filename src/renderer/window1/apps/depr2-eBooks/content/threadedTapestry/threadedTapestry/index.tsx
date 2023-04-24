import { useSelector } from 'react-redux';

const SectionContent = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      SectionContent
    </>
  );

};
export default SectionContent;
