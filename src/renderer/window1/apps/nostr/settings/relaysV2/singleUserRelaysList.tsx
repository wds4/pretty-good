import { useSelector, useDispatch } from 'react-redux';
import { useNostr, useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { isValidObjString } from 'renderer/window1/lib/pg/';
import { updateRelaysFromMyFollowingList } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const SingleUserRelaysList = ({ pubkey }) => {
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0, // all new events from now
      kinds: [3],
    },
  });
  let oRelays = {};
  if (events.length > 0) {
    const event = returnMostRecentEvent(events);
    if (event && doesEventValidate(event)) {
      if (event.hasOwnProperty('content')) {
        const sRelays = event.content;
        if (isValidObjString(event.content)) {
          oRelays = JSON.parse(sRelays);
          const aRelays = Object.keys(oRelays);
          const oData = {
            pubkey,
            aRelays,
          };
          dispatch(updateRelaysFromMyFollowingList(oData));
          return <></>;
        }
      }
    }
  }
  const aRelays = Object.keys(oRelays);

  return <></>;
};
export default SingleUserRelaysList;
