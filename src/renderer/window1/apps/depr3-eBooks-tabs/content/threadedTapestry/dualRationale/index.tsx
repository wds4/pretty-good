import { useSelector } from 'react-redux';
import SingleSentence from '../singleSentence.js';
import SingleParagraph from '../singleParagraph.js';

const Description = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  const aEBooks = Object.keys(eBooks);

  return (
    <>
      <div>
        Dual rationale: the real motive vs the fake motive for any given action
        or behavior. The adept usage of dual rationale is an indicator of high
        emotional intelligence. See: plausible deniability.
      </div>
    </>
  );
};
export default Description;
