import { generatePrivateKey, getPublicKey } from 'nostr-tools';
import { dateToUnix } from 'nostr-react';
import { asyncSql } from '../pg/asyncSql';
import { doesEventValidate } from './eventValidation';

export const generateNewNostrKeys = async (active) => {
  console.log('lib_fxn: generateNewNostrKeys');
  const sk = generatePrivateKey(); // `sk` is a hex string
  const pk = getPublicKey(sk); // `pk` is a hex string
  const currentTime = dateToUnix(new Date());

  const sql = `INSERT OR IGNORE INTO myNostrProfile (pubkey, privkey, active, created_at) VALUES ('${pk}', '${sk}', ${active}, ${currentTime}) `;
  console.log(`lib_fxn: generateNewNostrKeys; sql: ${sql}`);
  await asyncSql(sql);

  /*
  if (true) {
    // update redux store
  }
  */

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
