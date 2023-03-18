import { useSelector, useDispatch } from 'react-redux';
import GrapevineVisualizationMainPage from './grapevineVisualizationMainPage';

const ReduxInterfaceComponent = () => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  return (
    <>
      <GrapevineVisualizationMainPage
        controlPanelSettings={controlPanelSettings}
      />
    </>
  );
};
export default ReduxInterfaceComponent;
