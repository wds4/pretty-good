import { useSelector } from 'react-redux';
import PreviousTopicButton from './previousTopicButton';

const EBookHeader = () => {
  const currentFocus = useSelector((state) => state.eBooks.currentFocus);
  const eBooks = useSelector((state) => state.eBooks.eBooks);
  return (
    <>
      <div style={{position: 'relative', marginBottom: '10px'}}>
        <div style={{position: 'absolute', top: '0px', left: '0px'}}>
          <PreviousTopicButton />
        </div>
        <div className="h2">{eBooks[currentFocus.eBook].title}</div>
      </div>
    </>
  );
};
export default EBookHeader;
