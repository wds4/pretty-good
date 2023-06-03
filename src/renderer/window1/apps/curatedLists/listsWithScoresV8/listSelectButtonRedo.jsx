import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const ListSelectButton = ({ searchString, oCuratedLists, curatedListEventId }) => {
  const dispatch = useDispatch();
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const oCuratedListData = oCuratedLists[curatedListEventId];

  let buttonClassName = 'listSelectButton';
  if (curatedListFocusID == curatedListEventId) {
    buttonClassName += ' listSelectedButton';
  }

  let listName = "listName";
  if (oCuratedListData) {
    listName = oCuratedListData.name.plural;
  }
  let display="block";
  if (searchString) {
    display = "none";
    if (name_singular && name_singular.includes(searchString)) {
      display = "block";
    }
    if (name_plural && name_plural.includes(searchString)) {
      display = "block";
    }
    if (description && description.includes(searchString)) {
      display = "block";
    }
    if (event_id && event_id.includes(searchString)) {
      display = "block";
    }
  }

  return (
    <>
      <div
        onClick={() => {
          dispatch(updateCuratedListFocus(curatedListEventId));
        }}
        className={buttonClassName}
        style={{display}}
      >
        {listName}
      </div>
    </>
  );
};

export default ListSelectButton;
