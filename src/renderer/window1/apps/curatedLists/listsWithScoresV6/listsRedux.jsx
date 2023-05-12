import { useSelector } from 'react-redux';
import Lists from './lists';

const ListsRedux = () => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );

  const devMode2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShow"; }

  return (
    <>
      <Lists
        controlPanelSettings={controlPanelSettings}
      />
    </>
  );
}

export default ListsRedux;
