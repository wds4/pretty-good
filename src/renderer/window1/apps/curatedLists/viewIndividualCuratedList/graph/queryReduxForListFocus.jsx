import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';

import GrapevineVisualization from './grapevineVisualization';

const QueryReduxForListFocus = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentPage('CuratedListGraph'));
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  // console.log("qwerty QueryReduxForListFocus")
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
