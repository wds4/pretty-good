import { useSelector } from 'react-redux';
// import QueryDbForList from './queryDbForList';
import GrapevineVisualization from './grapevineVisualization';

const QueryReduxForLists = () => {
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const oCuratedLists = useSelector((state) => state.curatedLists.curatedLists);
  let aCuratedListIDs = Object.keys(oCuratedLists);
  if (!aCuratedListIDs) { aCuratedListIDs = []; }
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );

  return (
    /*
      <GrapevineVisualization
        curatedListFocusID={curatedListID}
        controlPanelSettings={controlPanelSettings}
      />
    */
    <>
      {aCuratedListIDs.map((curatedListID)=>{
        return (
          <>
            <GrapevineVisualization
              curatedListFocusID={curatedListID}
              controlPanelSettings={controlPanelSettings}
            />
          </>
        )
      })}
    </>
  );
}

export default QueryReduxForLists;
