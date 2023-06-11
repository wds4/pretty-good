import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
import { dateToUnix } from 'nostr-react';
import { asyncSql } from '../pg/asyncSql';
import { doesEventValidate } from './eventValidation';
import { oDefaultRelayUrls } from 'main/const/nostr';

export const generateNewNostrKeys = async (active) => {
  const sk = generatePrivateKey(); // `sk` is a hex string
  const pk = getPublicKey(sk); // `pk` is a hex string
  const currentTime = dateToUnix(new Date());
  const sql = `INSERT OR IGNORE INTO myNostrProfile (pubkey, privkey, relays, active, created_at) VALUES ('${pk}', '${sk}', '${JSON.stringify(oDefaultRelayUrls)}', ${active}, ${currentTime}) `;
  await asyncSql(sql);

  return [sk, pk];
};

// select active account from myNostrProfile
// optional: input sqlId of the active nostr user
export const reloadMyNostrProfileFromSqlToRedux = async () => {};

export const returnMostRecentEvent = (events) => {
  try {
    // this gets the oldest:
    // events.sort((b,a) => parseFloat(b.created_at) - parseFloat(a.created_at)); // 1674498966
    // to get the newest:
    events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)); // 1674867581
    if (doesEventValidate(events[0])) {
      return events[0];
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const returnMostRecentProfileEvent = (events, pubkey) => {
  try {
    // filter out any events with pubkey that does not match
    const events_ = [];
    for (var x=0;x<events.length;x++) {
      const ev = events[x];
      if (pubkey === ev.pubkey) {
        events_.push(ev)
      }
    }

    // then get the newest of what's left
    events_.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)); // 1674867581
    if (doesEventValidate(events_[0])) {
      return events_[0];
    }
    return {};
  } catch (err) {
    return {};
  }
};

export const checkPrivkeyHexValidity = (privkeyHex) => {
  if (!privkeyHex) { return false; }
  try {
    const privkeyBech32 = nip19.nsecEncode(privkeyHex);
    if (!privkeyBech32) { return false }
    return true;
  } catch (err) {
    return false;
  }
}
