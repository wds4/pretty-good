import { grapevineNostrUserTrustRatingTemplate } from 'renderer/window1/apps/grapevine/attestationTemplates/trustRatingTemplate';
import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const ComposeRatingAndEvent = ({ ratingPreset }) => {
  const sRating = 'rating text';
  const sEvent = 'event text';

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;

  const presets = useSelector(
    (state) => state.nostrGrapevineTrustRatingPresets.presets
  );

  const newRating = JSON.parse(
    JSON.stringify(grapevineNostrUserTrustRatingTemplate)
  );
  // edit newRating
  newRating.ratingData.raterData.nostrUserData.pubkey_hex =
    myNostrProfile.pubkey_hex;
  newRating.ratingData.raterData.nostrUserData.pubkey_bech32 =
    myNostrProfile.pubkey_bech32;
  newRating.ratingData.raterData.nostrUserData.name = myNostrProfile.name;
  newRating.ratingData.raterData.nostrUserData.display_name =
    myNostrProfile.display_name;
  newRating.metaData.timestamp = Date.now();
  const message = JSON.stringify(newRating);

  // kind: may want to choose NIP-16 REPLACEABLE EVENT, with 10000 <= n < 20000
  // Grapevine: kind = 11000 to 12000 and tags: [['g', 'grapevine']],
  // grapevine testnet: kind = 11900 to 11999 and tags: [['g', 'grapevine-testnet']],

  // GRAPEVINE: LIVE
  // kind: 11???
  // tags: [['g', 'grapevine']],

  // GRAPEVINE: TESTNET
  // kind: 11971 (?)
  // tags: [['g', 'grapevine-testnet']],

  // first test: 1971, grapevine (Jan or Feb 2023)
  // kind: 1971
  // tags: [['g', 'grapevine']],
  const event: NostrEvent = {
    content: message,
    kind: 11971,
    tags: [['g', 'grapevine-testnet']],
    created_at: dateToUnix(),
    pubkey: getPublicKey(myPrivkey),
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, myPrivkey);

  return (
    <>
      <div>ratingPreset: {ratingPreset}</div>
      <div
        style={{
          display: 'inline-block',
          width: '45%',
          fontSize: '10px',
          border: '1px dashed grey',
          overflow: 'auto',
          padding: '2px',
          margin: '2px',
        }}
      >
        <div>nostr event:</div>
        <pre
          style={{
            backgroundColor: 'white',
          }}
        >
          {JSON.stringify(event, null, 4)}
        </pre>
      </div>

      <div
        style={{
          display: 'inline-block',
          width: '45%',
          fontSize: '10px',
          border: '1px dashed grey',
          overflow: 'auto',
          padding: '2px',
          margin: '2px',
        }}
      >
        <div>newRating:</div>
        <pre
          style={{
            backgroundColor: 'white',
          }}
        >
          {JSON.stringify(newRating, null, 4)}
        </pre>
      </div>
    </>
  );
};

export default ComposeRatingAndEvent;
