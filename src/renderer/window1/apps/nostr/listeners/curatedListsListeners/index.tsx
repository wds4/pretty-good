import { useSelector } from 'react-redux';
import CuratedListsListener from './curatedLists';
import CuratedListInstancesListener from './curatedListInstances';
import CuratorEndorsementsListener from './curatorEndorsements';
import CuratedListItemRatingsListener from './curatedListItemRatings';

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
        <div className="curatedListsListenerStatusContainer">CURATED LISTS<br/>LISTENERS: ON</div>
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
        <div className="curatedListsListenerStatusContainer">CURATED LISTS<br/>LISTENERS: OFF</div>
      </>
    );
  }
};

export default CuratedListsListeners;
