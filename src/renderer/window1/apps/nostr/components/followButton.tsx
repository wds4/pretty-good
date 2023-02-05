import { useSelector, useDispatch } from 'react-redux';
import {
  addToFollowingList,
  removeFromFollowingList,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const FollowButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  let buttonClass = 'followButton';
  let currentState = 'notFollowing';

  let aFollowing = [];
  let aFollowers = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  if (myNostrProfile.followers) {
    aFollowers = myNostrProfile.followers;
  }
  if (aFollowing.includes(pubkey)) {
    // I am already following this user.
    buttonClass = 'unfollowButton';
    currentState = 'following';
  }

  const toggleFollow = (currentState) => {
    let newState = 'following';
    if (currentState == 'following') {
      newState = 'notFollowing';
      dispatch(removeFromFollowingList(pubkey));
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      dispatch(addToFollowingList(pubkey));

    }
    // publish updated following list to nostr
    // const myUpdatedNostrProfile = useSelector((state) => state.myNostrProfile);
    // dispatch(FullSyncMyActiveNostrProfileFromReduxStoreToSql());
    // update in sql
  };

  return (
    <>
      <button
        type="button"
        value={currentState}
        onClick={({ target: { value } }) => toggleFollow(value)}
        className={buttonClass}
      />
    </>
  );
};
export default FollowButton;
