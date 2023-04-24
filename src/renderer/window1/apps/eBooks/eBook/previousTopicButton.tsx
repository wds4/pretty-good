import { useState } from 'react';
import { useSelector } from 'react-redux';

const PreviousTopicButton = () => {
  const [aPreviousTopics, setAPreviousTopics] = useState(oCurrentFocus.previousTopics);

  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  // setAPreviousTopics(JSON.parse(JSON.stringify(oCurrentFocus.previousTopics)));

  const oItems = oEBooks[eBookSlug].items;
  const aItems = Object.keys(oItems);

  const goToPreviousTopic = () => {
    // const topic = aPreviousTopics.shift();
    // console.log("goToPreviousTopic "+topic);
  }

  return (
    <>
      <button type="button" onClick={goToPreviousTopic}>Previous Topic</button>
      <div>{JSON.stringify(aPreviousTopics)}</div>
    </>
  );
};
export default PreviousTopicButton;
