import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import { returnMostRecentProfileEvent } from 'renderer/window1/lib/nostr';

const MyFollowingListReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [myPubkey],
      since: 0,
      kinds: [3],
    },
  });
  let followingListLastUpdate = null;
  let relaysListLastUpdate = null;
  let event = {};
  let event_ = {};
  event = returnMostRecentProfileEvent(events,myPubkey);
  if ( JSON.stringify(event) !== '{}' ) {
    // console.log("doesEventValidate, step 1; event: "+JSON.stringify(event,null,4))
    if (event && doesEventValidate(event)) {
      // console.log("doesEventValidate_yes; event: "+JSON.stringify(event,null,4))
      event_ = JSON.parse(JSON.stringify(event));
    }
  }
  let received_created_at = event?.created_at;
  if (!received_created_at) {
    received_created_at = 0;
  }
  let needToUpdate = false;
  let sFollowingListNeedToUpdate = "false";
  return (
    <>
      <div style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
        <center>listening for my following list and relays list</center>
        <div>myPubkey: {myPubkey}</div>
        <div>sFollowingListNeedToUpdate: {sFollowingListNeedToUpdate}</div>
        <div style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
          <center>Local data (sql):</center>
          <div>followingListLastUpdate: {followingListLastUpdate}</div>
          <div>relaysListLastUpdate: {relaysListLastUpdate}</div>
          <pre>{JSON.stringify(myNostrProfile,null,4)}</pre>
        </div>
        <div style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
          <center>most recent received event (from nostr):</center>
          <div>created_at: {event?.created_at}</div>
          <pre>{JSON.stringify(event_,null,4)}</pre>
        </div>
      </div>
    </>
  );
};

export default MyFollowingListReceived;
