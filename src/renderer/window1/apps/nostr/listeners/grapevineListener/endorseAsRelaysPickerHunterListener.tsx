import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addEndorseAsRelaysPickerHunterNoteToReduxStore } from 'renderer/window1/redux/features/grapevine/listCuration/slice';
import { updateListCurationNoteInSql } from 'renderer/window1/lib/pg/sql';

const EndorseAsRelaysPickerHunterListener = () => {
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [39901],
      '#g': ['grapevine-testnet'],
      '#r': ['endorseAsRelaysPickerHunter'],
    },
  });
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
      await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
    }
  });
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">EndorseAsRelaysPickerHunter Listener</div>
        <div>numMessages received: {events.length}</div>
        {events.map((event) => {
          return (
            <>
              <div>{JSON.stringify(event, null, 4)}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EndorseAsRelaysPickerHunterListener;
