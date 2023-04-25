import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToPreviousTopic } from 'renderer/window1/redux/features/eBooks/slice';

const PreviousTopicButton = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const aPreviousTopics = oCurrentFocus.previousTopics;

  const oItems = oEBooks[eBookSlug].items;
  const aItems = Object.keys(oItems);

  let buttonClassName = "block_hide";
  if (aPreviousTopics.length > 0) {
    buttonClassName = "block_show";
  }

  return (
    <>
      <button
        type="button"
        className = {buttonClassName}
        onClick={() => {
          dispatch(goToPreviousTopic('knowledgeRepresentation'));
        }}
      >
        Previous Topic
      </button>
    </>
  );
};
export default PreviousTopicButton;
