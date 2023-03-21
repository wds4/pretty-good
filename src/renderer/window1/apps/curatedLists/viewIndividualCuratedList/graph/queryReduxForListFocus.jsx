import { useSelector } from 'react-redux';
// import QueryDbForList from './queryDbForList';
import GrapevineVisualization from './grapevineVisualization';

const QueryReduxForListFocus = () => {
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  /*
      <QueryDbForList
        curatedListFocusID={curatedListFocusID}
        controlPanelSettings={controlPanelSettings}
      />


  */
  return (
    <>
      <GrapevineVisualization
        curatedListFocusID={curatedListFocusID}
        controlPanelSettings={controlPanelSettings}
      />
    </>
  );
}

export default QueryReduxForListFocus;
