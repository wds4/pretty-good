import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import ListRedo from './listRedo';

const ListPre = ({
  controlPanelSettings,
  oMyNostrProfileData,
  oNostrProfilesData,

  curatedListEventId,
  oCuratedListData,
  oCuratedLists,
}) => {
  const dispatch = useDispatch();
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );

  let displayList = false;
  if (curatedListFocusID == curatedListEventId) {
    displayList = true;
  }

  if (displayList) {
    return (
      <>
        <ListRedo
          controlPanelSettings={controlPanelSettings}
          curatedListEventId={curatedListEventId}

          oMyNostrProfileData={oMyNostrProfileData}
          oNostrProfilesData={oNostrProfilesData}
          oCuratedListData={oCuratedListData}
          oCuratedLists={oCuratedLists}
        />
      </>
    );
  }
  return (
    <>
      <div />
    </>
  );
};

export default ListPre;

/*

*/
