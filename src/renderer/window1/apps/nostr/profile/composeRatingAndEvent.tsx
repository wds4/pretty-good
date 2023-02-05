import { grapevineNostrUserTrustRatingTemplate } from 'renderer/window1/apps/grapevine/attestationTemplates/trustRatingTemplate';
import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const ComposeRatingAndEvent = ({ratingPreset}) => {
  let sRating = "rating text";
  let sEvent = "event text";

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;

  const presets = useSelector((state) => state.nostrGrapevineTrustRatingPresets.presets);

  let newRating = JSON.parse(JSON.stringify(grapevineNostrUserTrustRatingTemplate));
  // edit newRating
  newRating.ratingData.raterData.nostrUserData.pubkey_hex = myNostrProfile.pubkey_hex;
  newRating.ratingData.raterData.nostrUserData.pubkey_bech32 = myNostrProfile.pubkey_bech32;
  newRating.ratingData.raterData.nostrUserData.name = myNostrProfile.name;
  newRating.ratingData.raterData.nostrUserData.display_name = myNostrProfile.display_name;
  newRating.metaData.timestamp = Date.now();
  const message = JSON.stringify(newRating);



  // kind: may want to choose NIP-16 REPLACEABLE EVENT, with 10000 <= n < 20000
  const event: NostrEvent = {
    content: message,
    kind: 11971,
    tags: [["g", "grapevine"]],
    created_at: dateToUnix(),
    pubkey: getPublicKey(myPrivkey),
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, myPrivkey);

  return (
    <>
      ratingPreset: {ratingPreset}
      <pre>{JSON.stringify(event,null,4)}</pre>
      <pre>{JSON.stringify(newRating,null,4)}</pre>
    </>
  );
};

export default ComposeRatingAndEvent;
