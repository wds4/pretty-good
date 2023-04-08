import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { isValidObj } from 'renderer/window1/lib/pg';
import { updateNostrProfileKind3Event } from 'renderer/window1/redux/features/nostr/profiles/slice';

const Kind3ProfilesReceived = () => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: aFollowing,
      since: 0,
      kinds: [3],
    },
  });
  events.forEach((event, item) => {
    if (doesEventValidate(event)) {
      const pk = event.pubkey;
      const created_at = event.created_at
      if (nostrProfiles.hasOwnProperty(pk)) {
        let oExistingKind3Event = {};
        if (isValidObj(nostrProfiles[pk].kind3Event)) {
          oExistingKind3Event = JSON.parse(nostrProfiles[pk].kind3Event);
        }
        let existingCreatedAt = 0;
        if (oExistingKind3Event.created_at) {
          existingCreatedAt = oExistingKind3Event.created_at
        }
        if (created_at > existingCreatedAt) {
          // update kind3Event in sql and in redux
          dispatch(updateNostrProfileKind3Event(event));
        }
      }
    }
  });
  return (
    <>
      <div>numNotes received: {events.length}</div>
    </>
  );
};

export default Kind3ProfilesReceived;
