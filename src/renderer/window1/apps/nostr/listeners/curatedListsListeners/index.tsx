import { useSelector } from 'react-redux';
import CuratedListsListener from './curatedLists';
import CuratedListInstancesListener from "./curatedListInstances";
import CuratorEndorsementsListener from "./curatorEndorsements";
import CuratedListItemRatingsListener from "./curatedListItemRatings";

/*
// listen for:
curated lists
instances of curated lists
ratings of instances
endorsements of profiles as curators of specified lists
*/

const CuratedListsListeners = () => {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }
  return (
    <>
      <div className={devElemClass}>
        <div className="h3">Curated Lists; kinds 9901 and 39901 Listeners</div>
      </div>
      <CuratedListsListener />
      <CuratedListInstancesListener />
      <CuratorEndorsementsListener />
      <CuratedListItemRatingsListener />
    </>
  );
};

export default CuratedListsListeners;
