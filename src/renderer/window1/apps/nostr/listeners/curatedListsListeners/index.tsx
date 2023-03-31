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
  return (
    <>
      <div className="h3">Curated Lists; kinds 9901 and 39901 Listeners</div>
      <CuratedListsListener />
      <CuratedListInstancesListener />
      <CuratorEndorsementsListener />
      <CuratedListItemRatingsListener />
    </>
  );
};

export default CuratedListsListeners;
