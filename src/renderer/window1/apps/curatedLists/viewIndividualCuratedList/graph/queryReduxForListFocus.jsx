import { useSelector } from 'react-redux';
import GrapevineVisualization from './grapevineVisualization';

const QueryReduxForListFocus = () => {
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
