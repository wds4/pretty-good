import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { returnMostRecentProfileEvent } from 'renderer/window1/lib/nostr';
import {
  updateRelays,
  updateRelaysListLastUpdate,
  updateFollowing,
  updateFollowingListLastUpdate,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { updateMyActiveNostrFollowingListInSql, updateMyActiveNostrRelaysListInSql } from 'renderer/window1/lib/pg/sql';

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
  let followingListLastUpdate = myNostrProfile?.followingListLastUpdate;
  if (!followingListLastUpdate) {
    followingListLastUpdate = 0;
  }
  let relaysListLastUpdate = myNostrProfile?.relaysListLastUpdate;
  if (!relaysListLastUpdate) {
    relaysListLastUpdate = 0;
  }
  let content = {}; // content contains the relays list
  let tags = []; // tags contains the following list
  let event = {};
  let event_ = {};
  event = returnMostRecentProfileEvent(events,myPubkey);
  if ( JSON.stringify(event) !== '{}' ) {
    // console.log("doesEventValidate, step 1; event: "+JSON.stringify(event,null,4))
    if (event && doesEventValidate(event)) {
      content = JSON.parse(event.content);
      // console.log("doesEventValidate_yes; event: "+JSON.stringify(event,null,4))
      event_ = JSON.parse(JSON.stringify(event));
      event_.content = content;
    }
  }
  let received_created_at = event?.created_at;
  if (!received_created_at) {
    received_created_at = 0;
  }
  let needToUpdate = false;
  let sFollowingListNeedToUpdate = "false";
  let sRelaysListNeedToUpdate = "false";
  if (received_created_at > followingListLastUpdate) {
    sFollowingListNeedToUpdate = "true";
    let createdAtReceivedList = event_?.created_at;
    if (myNostrProfile.multiClientAccess) {
      // UPDATE PROFILE IN SQL AND REDUX USING RECEIVED EVENT
      const aReceivedFollowing = event_?.tags;
      const aNewFollowingList = [];
      if (!createdAtReceivedList) {
        createdAtReceivedList = 0;
      }
      for (var t=0;t<aReceivedFollowing.length;t++) {
        const aFollowingData = aReceivedFollowing[t];
        if (aFollowingData[0] === 'p') {
          aNewFollowingList.push(aFollowingData[1]);
        }
      }
      dispatch(updateFollowing(aNewFollowingList));
      dispatch(updateFollowingListLastUpdate(createdAtReceivedList));

      updateMyActiveNostrFollowingListInSql(aNewFollowingList, createdAtReceivedList);
    }
  }
  if (received_created_at > relaysListLastUpdate) {
    sRelaysListNeedToUpdate = "true";
    if (myNostrProfile.multiClientAccess) {
      // UPDATE PROFILE IN SQL AND REDUX USING RECEIVED EVENT
      const oReceivedRelays = event_?.content;
      let createdAtReceivedList = event_?.created_at;

      dispatch(updateRelays(oReceivedRelays));
      dispatch(updateRelaysListLastUpdate(createdAtReceivedList));

      updateMyActiveNostrRelaysListInSql(oReceivedRelays, createdAtReceivedList);
    }
  }
  return (
    <>
      <div style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
        <center>listening for my following list and relays list</center>
        <div>myPubkey: {myPubkey}</div>
        <div>sFollowingListNeedToUpdate: {sFollowingListNeedToUpdate}</div>
        <div>sFollowingListNeedToUpdate: {sFollowingListNeedToUpdate}</div>
        <div style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}>
          <center>Local data (redux, sql):</center>
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
