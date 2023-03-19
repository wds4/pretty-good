import { useSelector, useDispatch } from 'react-redux';
import {
  addToEndorseAsRelaysPickerHunterList,
  removeFromEndorseAsRelaysPickerHunterList,
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
import {
  addStringToArrayUniquely,
  removeStringFromArray,
} from 'renderer/window1/lib/pg/index';

const EndorseAsRelaysPickerHunterButton = ({ pubkey }) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  let buttonClass = 'endorseAsRelaysPickerHunterButton';
  let currentState = 'notFollowing';

  let aEndorsedProfiles = [];
  if (myNostrProfile.endorseAsRelaysPickerHunter) {
    aEndorsedProfiles = myNostrProfile.endorseAsRelaysPickerHunter;
  }
  if (aEndorsedProfiles.includes(pubkey)) {
    // I am already following this user.
    buttonClass = 'unEndorseAsRelaysPickerHunterButton';
    currentState = 'following';
  }
  // may not need oConceptGraphWord at this stage
  const oConceptGraphWord = {
    concept: 'relayListCuration',
    type: 'endorseAsRelaysPickerHunter',
  };
  // access following list and relays list from redux store and publish an event with current lists to nostr
  const updateFollowingAndRelaysListsInNostr = (aEndorsedProfilesUpdated) => {
    const uniqueID = `${myPubkey}-endorseAsRelaysPickerHunter`;
    const aTags = [
      ['d', uniqueID],
      ['g', 'grapevine-testnet'],
      ['r', 'endorseAsRelaysPickerHunter'],
    ];
    for (let x = 0; x < aEndorsedProfilesUpdated.length; x++) {
      aTags.push(['p', aEndorsedProfilesUpdated[x]]);
    }
    const event: NostrEvent = {
      created_at: dateToUnix(),
      kind: 39901,
      tags: aTags,
      content: '',
      pubkey: myPubkey,
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
      const aEndorsedProfilesUpdated = removeStringFromArray(pubkey, aEndorsedProfiles);
      dispatch(removeFromEndorseAsRelaysPickerHunterList(pubkey));
      updateFollowingAndRelaysListsInNostr(aEndorsedProfilesUpdated);
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      const aEndorsedProfilesUpdated = addStringToArrayUniquely(pubkey, aEndorsedProfiles);
      dispatch(addToEndorseAsRelaysPickerHunterList(pubkey));
      updateFollowingAndRelaysListsInNostr(aEndorsedProfilesUpdated);
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
