import { useSelector, useDispatch } from 'react-redux';
import {
  addToFollowingForRelaysList,
  removeFromFollowingForRelaysList,
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

const FollowRelaysButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  let buttonClass = 'followRelaysButton';
  let currentState = 'notFollowing';

  let aFollowingRelays = [];
  if (myNostrProfile.followingForRelays) {
    aFollowingRelays = myNostrProfile.followingForRelays;
  }
  if (aFollowingRelays.includes(pubkey)) {
    // I am already following this user.
    buttonClass = 'unfollowRelaysButton';
    currentState = 'following';
  }

  const processToggleButtonClick = (currentState) => {
    console.log("qwerty processToggleButtonClick; currentState: "+currentState);
    let newState = 'following';
    if (currentState == 'following') {
      newState = 'notFollowing';
      dispatch(removeFromFollowingForRelaysList(pubkey));
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      dispatch(addToFollowingForRelaysList(pubkey));
    }
  };

  return (
    <>
      <Tooltip
        anchorSelect="#followRelaysButton"
        html={tooltipContent.followRelaysButton}
        clickable
        className="reactTooltip"
      />
      <a id="followRelaysButton">
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
export default FollowRelaysButton;
