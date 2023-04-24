import { useSelector } from 'react-redux';
import SingleSentence from '../singleSentence.js';
import SingleParagraph from '../singleParagraph.js';

const Description = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <SingleSentence />
    </>
  );

};
export default Description;
