import { useSelector } from 'react-redux';
import CuratedListsListeners from 'renderer/window1/apps/nostr/listeners/curatedListsListeners';
import Lists from './lists';

const ListsRedux = () => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );

  const devMode2 = useSelector(
    (state) => state.prettyGoodGlobalState.devMode2
  );
  let devElemClass = "devElemHide";
  if (devMode2) { devElemClass = "devElemShow"; }

  return (
    <>
      <Lists
        controlPanelSettings={controlPanelSettings}
      />
      <div>curated lists listeners: running</div>
      <div className={devElemClass} style={{margin: '20px 50px 0px 50px'}}>
        <CuratedListsListeners />
      </div>
    </>
  );
}

export default ListsRedux;
