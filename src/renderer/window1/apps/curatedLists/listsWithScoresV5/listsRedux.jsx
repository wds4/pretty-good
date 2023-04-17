import { useSelector } from 'react-redux';
import Lists from './lists';

const ListsRedux = () => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  return (
    <>
      <Lists
        controlPanelSettings={controlPanelSettings}
      />
    </>
  );
}

export default ListsRedux;
