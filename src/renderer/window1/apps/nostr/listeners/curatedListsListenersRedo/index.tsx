import { useSelector } from 'react-redux';
import CuratedListsListenersToggle from './curatedListsListenersToggle';
import CuratedListsMasterFilter from './curatedListsMasterFilter';

const CuratedListsListenersRedo = () => {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }
  const activateCuratedListsBackgroundListener = useSelector(
    (state) => state.curatedListsSettings.activateCuratedListsBackgroundListener
  );
  /*
  return (
    <>
      <div>CuratedListsListenersRedo</div>
      <CuratedListsMasterFilter />
    </>
  );
  */
  if (activateCuratedListsBackgroundListener) {
    return (
      <>
        <div className="curatedListsListenerStatusContainer">
          <div style={{ display: 'inline-block', marginBottom: '2px' }}>
            CURATED LISTS
            <br />
            LISTENERS: ON
          </div>
          <br />
          <div style={{ display: 'inline-block' }}>
            <CuratedListsListenersToggle />
          </div>
        </div>

        <div style={{ maxHeight: '500px' }}>
          <CuratedListsMasterFilter />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="curatedListsListenerStatusContainer">
        <div style={{ display: 'inline-block', marginBottom: '2px' }}>
          CURATED LISTS
          <br />
          LISTENERS: OFF
        </div>
        <br />
        <div style={{ display: 'inline-block' }}>
          <CuratedListsListenersToggle />
        </div>
      </div>
    </>
  );
};

export default CuratedListsListenersRedo;
