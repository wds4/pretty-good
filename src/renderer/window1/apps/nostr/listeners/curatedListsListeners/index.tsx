import { useSelector } from 'react-redux';
import CuratedListsListener from './curatedLists';
import CuratedListInstancesListener from './curatedListInstances';
import CuratorEndorsementsListener from './curatorEndorsements';
import CuratedListItemRatingsListener from './curatedListItemRatings';
import CuratedListsListenersToggle from './curatedListsListenersToggle';

const CuratedListsListeners = () => {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }
  const activateCuratedListsBackgroundListener = useSelector(
    (state) => state.curatedListsSettings.activateCuratedListsBackgroundListener
  );

  console.log("activateCuratedListsBackgroundListener: "+activateCuratedListsBackgroundListener)

  if (activateCuratedListsBackgroundListener) {
    return (
      <>
        <div className="curatedListsListenerStatusContainer">
          <div style={{display:'inline-block', marginBottom:'2px'}}>CURATED LISTS<br/>LISTENERS: ON</div>
          <br />
          <div style={{display:'inline-block'}}><CuratedListsListenersToggle /></div>
        </div>

        <div className={devElemClass}>
          <div className="h4">
            Curated Lists; kinds 9901 and 39901 Listeners
          </div>
        </div>
        <div style={{ maxHeight: '200px' }}>
          <CuratedListsListener />
          <CuratedListInstancesListener />
          <CuratorEndorsementsListener />
          <CuratedListItemRatingsListener />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="curatedListsListenerStatusContainer">
          <div style={{display:'inline-block', marginBottom:'2px'}}>CURATED LISTS<br/>LISTENERS: OFF</div>
          <br />
          <div style={{display:'inline-block'}}><CuratedListsListenersToggle /></div>
        </div>
      </>
    );
  }
};

export default CuratedListsListeners;
