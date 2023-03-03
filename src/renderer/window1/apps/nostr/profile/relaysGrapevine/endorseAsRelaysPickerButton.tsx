import { useSelector, useDispatch } from 'react-redux';
import {
  addToEndorseAsRelaysPickerList,
  removeFromEndorseAsRelaysPickerList,
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

const EndorseAsRelaysPickerButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  let buttonClass = 'endorseAsRelaysPickerButton';
  let currentState = 'notFollowing';

  let aEndorsedProfiles = [];
  if (myNostrProfile.endorseAsRelaysPicker) {
    aEndorsedProfiles = myNostrProfile.endorseAsRelaysPicker;
  }
  if (aEndorsedProfiles.includes(pubkey)) {
    // I am already following this user.
    buttonClass = 'unEndorseAsRelaysPickerButton';
    currentState = 'following';
  }
  // may not need oConceptGraphWord at this stage
  const oConceptGraphWord = {
    concept: 'relayListCuration',
    type: 'endorseAsRelaysPicker',
  }
  // access following list and relays list from redux store and publish an event with current lists to nostr
  const updateFollowingAndRelaysListsInNostr = () => {
    const aTags = [["g", "grapevine-testnet"],["r","endorseAsRelaysPicker"]];
    for (var x=0;x<aEndorsedProfiles.length;x++) {
      aTags.push(["p",aEndorsedProfiles[x]])
    }
    const event: NostrEvent = {
      created_at: dateToUnix(),
      kind: 11901,
      tags: aTags,
      content: '',
      pubkey: getPublicKey(myPrivkey),
    };

    console.log(
      `updateFollowingAndRelaysListsInNostr; event: ${JSON.stringify(event)}`
    );

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    console.log(
      `updateFollowingAndRelaysListsInNostr; event: ${JSON.stringify(event)}`
    );

    publish(event);
  };

  const processToggleButtonClick = (currentState) => {
    let newState = 'following';
    if (currentState == 'following') {
      newState = 'notFollowing';
      dispatch(removeFromEndorseAsRelaysPickerList(pubkey));
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      dispatch(addToEndorseAsRelaysPickerList(pubkey));
    }
    updateFollowingAndRelaysListsInNostr();
    // publish updated following list to nostr
    // const myUpdatedNostrProfile = useSelector((state) => state.myNostrProfile);
    // dispatch(FullSyncMyActiveNostrProfileFromReduxStoreToSql());
    // update in sql
  };

  return (
    <>
      <Tooltip
        anchorSelect="#endorseAsRelaysPickerButton"
        html={tooltipContent.endorseAsRelaysPickerButton}
        clickable
        className="reactTooltip"
      />
      <a id="endorseAsRelaysPickerButton">
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
export default EndorseAsRelaysPickerButton;
