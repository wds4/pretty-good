import { useSelector, useDispatch } from 'react-redux';
import {
  addToFollowingList,
  removeFromFollowingList,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const FollowButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

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

  // access following list and relays list from redux store and publish an event with current lists to nostr
  const updateFollowingAndRelaysListsInNostr = () => {
    const oCurrentRelaysList = myNostrProfile.relays;
    const aCurrentFollowingList = myNostrProfile.following;
    console.log("updateFollowingAndRelaysListsInNostr; oCurrentRelaysList: "+JSON.stringify(oCurrentRelaysList)+"; aCurrentFollowingList: "+JSON.stringify(aCurrentFollowingList));
    const aFollowing = [];
    for (let x=0;x<aCurrentFollowingList.length;x++) {
      let nextFollowing = aCurrentFollowingList[x];
      let aNext = [ 'p', nextFollowing ]
      aFollowing.push(aNext)
    }
    const event: NostrEvent = {
      created_at: dateToUnix(),
      kind: 3,
      tags: aFollowing,
      content: JSON.stringify(oCurrentRelaysList),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    console.log("updateFollowingAndRelaysListsInNostr; event: "+JSON.stringify(event));

    publish(event);
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
    updateFollowingAndRelaysListsInNostr();
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
