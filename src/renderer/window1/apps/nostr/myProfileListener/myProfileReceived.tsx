import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { returnMostRecentEvent, returnMostRecentProfileEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  updateName,
  updateDisplayName,
  updatePictureUrl,
  updateBannerUrl,
  updateWebsite,
  updateAbout,
  updateNip05,
  updateLud06,
  updateLastUpdate,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { updateMyActiveNostrProfileInSql } from 'renderer/window1/lib/pg/sql';

const MyProfileReceived = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  let mNP_lastUpdate = myNostrProfile?.lastUpdate;
  if (!mNP_lastUpdate) {
    mNP_lastUpdate = 0;
  }
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [myPubkey],
      since: 0,
      kinds: [0],
    },
  });

  let content = {};
  let event = {};
  let event_ = {};
  event = returnMostRecentProfileEvent(events,myPubkey);
  if ( JSON.stringify(event) !== '{}' ) {
    // console.log("doesEventValidate, step 1; event: "+JSON.stringify(event,null,4))
    if (event && doesEventValidate(event)) {
      // console.log("doesEventValidate_yes; event: "+JSON.stringify(event,null,4))
      content = JSON.parse(event.content);
      event_ = JSON.parse(JSON.stringify(event));
      event_.content = content;
    }
  }

  let received_created_at = event?.created_at;
  if (!received_created_at) {
    received_created_at = 0;
  }
  let sMultiClientAccess = "false";
  if (myNostrProfile.multiClientAccess) {
    sMultiClientAccess = "true";
  }
  let needToUpdate = false;
  let sNeedToUpdate = "false";
  if (received_created_at > mNP_lastUpdate) {
    needToUpdate = true;
    sNeedToUpdate = "true";
    if (myNostrProfile.multiClientAccess) {
      // UPDATE PROFILE IN SQL AND REDUX

      dispatch(updateName(content?.name));
      dispatch(updateDisplayName(content?.display_name));
      dispatch(updatePictureUrl(content?.picture));
      dispatch(updateBannerUrl(content?.banner));
      dispatch(updateWebsite(content?.website));
      dispatch(updateAbout(content?.about));
      dispatch(updateLud06(content?.lud06));
      dispatch(updateNip05(content?.nip05));
      dispatch(updateLastUpdate(event?.created_at));

      const oMyNostrProfileInfo = {};
      oMyNostrProfileInfo.name = content?.name;
      oMyNostrProfileInfo.display_name = content?.display_name;
      oMyNostrProfileInfo.picture = content?.picture;
      oMyNostrProfileInfo.banner = content?.banner;
      oMyNostrProfileInfo.website = content?.website;
      oMyNostrProfileInfo.about = content?.about;
      oMyNostrProfileInfo.lud06 = content?.lud06;
      oMyNostrProfileInfo.nip05 = content?.nip05;
      oMyNostrProfileInfo.lastUpdate = event?.created_at;

      const sProfileInfo = JSON.stringify(oMyNostrProfileInfo);
      console.log(`sProfileInfo: ${sProfileInfo}`);

      updateMyActiveNostrProfileInSql(oMyNostrProfileInfo);
    }
  }
  return (
    <>
      <div>myPubkey: {myPubkey}</div>
      <div>sNeedToUpdate: {sNeedToUpdate}</div>
      <div>sMultiClientAccess: {sMultiClientAccess}</div>
      Local data:
      <div>mNP_lastUpdate: {mNP_lastUpdate}</div>
      <pre>{JSON.stringify(myNostrProfile,null,4)}</pre>
      Received event:
      <div>created_at: {event?.created_at}</div>
      <div>name: {content?.name}</div>
      <div>display_name: {content?.display_name}</div>
      <div>banner: {content?.banner}</div>
      <div>picture: {content?.picture}</div>
      <div>about: {content?.about}</div>
      <div>website: {content?.website}</div>
      <div>lud06: {content?.lud06}</div>
      <div>nip05: {content?.nip05}</div>
      <pre>{JSON.stringify(event_,null,4)}</pre>
    </>
  );
};

export default MyProfileReceived;
