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
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const EndorseAsRelaysPickerHunterButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  let buttonClass = 'endorseAsRelaysPickerHunterButton';
  let currentState = 'notFollowing';

  let aFollowingRelays = [];
  if (myNostrProfile.followingRelays) {
    aFollowingRelays = myNostrProfile.followingRelays;
  }
  if (aFollowingRelays.includes(pubkey)) {
    // I am already following this user.
    buttonClass = 'unEndorseAsRelaysPickerHunterButton';
    currentState = 'following';
  }

  // access following list and relays list from redux store and publish an event with current lists to nostr
  const updateFollowingAndRelaysListsInNostr = () => {
    const oCurrentRelaysList = myNostrProfile.relays;
    const aCurrentFollowingList = myNostrProfile.following;
    console.log(
      `updateFollowingAndRelaysListsInNostr; oCurrentRelaysList: ${JSON.stringify(
        oCurrentRelaysList
      )}; aCurrentFollowingList: ${JSON.stringify(aCurrentFollowingList)}`
    );
    const aFollowing = [];
    for (let x = 0; x < aCurrentFollowingList.length; x++) {
      const nextFollowing = aCurrentFollowingList[x];
      const aNext = ['p', nextFollowing];
      aFollowing.push(aNext);
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

    console.log(
      `updateFollowingAndRelaysListsInNostr; event: ${JSON.stringify(event)}`
    );

    // publish(event);
  };

  const processToggleButtonClick = (currentState) => {
    let newState = 'following';
    if (currentState == 'following') {
      newState = 'notFollowing';
      dispatch(removeFromFollowingList(pubkey));
      updateFollowingAndRelaysListsInNostr();
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      dispatch(addToFollowingList(pubkey));
      updateFollowingAndRelaysListsInNostr();
    }
    // publish updated following list to nostr
    // const myUpdatedNostrProfile = useSelector((state) => state.myNostrProfile);
    // dispatch(FullSyncMyActiveNostrProfileFromReduxStoreToSql());
    // update in sql
  };

  return (
    <>
      <Tooltip
        anchorSelect="#endorseAsRelaysPickerHunterButton"
        html={tooltipContent.endorseAsRelaysPickerHunterButton}
        clickable
        className="reactTooltip"
      />
      <a id="endorseAsRelaysPickerHunterButton">
        <button
          type="button"
          value={currentState}
          onClick={({ target: { value } }) => processToggleButtonClick(value)}
          className={buttonClass}
        />
      </a>
    </>
  );
};
export default EndorseAsRelaysPickerHunterButton;
