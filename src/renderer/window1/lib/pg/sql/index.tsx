import { dateToUnix } from 'nostr-react';
import { oDefaultRelayUrls } from 'renderer/window1/const';
import { asyncSql } from '../asyncSql';
import { generateNewNostrKeys } from '../../nostr';

export const updateListCurationNoteInSql = async (event, slug) => {
  const pk = event.pubkey;
  const uniqueID = `${pk}-${slug}`;
  const sql1 = ` INSERT OR IGNORE INTO testnetListCurationRatings (uniqueID, ratingSlug, pk_rater, event) VALUES('${uniqueID}', '${slug}', '${pk}', '${JSON.stringify(
    event
  )}' ) `;

  const res1 = await asyncSql(sql1);

  let sql2 = '';
  sql2 += ' UPDATE testnetListCurationRatings ';
  sql2 += ` SET ratingSlug = '${slug}' `;
  sql2 += ` , pk_rater = '${pk}' `;
  sql2 += ` , event = '${JSON.stringify(event)}' `;
  sql2 += ` WHERE uniqueID = '${uniqueID}' `;
  const res2 = await asyncSql(sql2);

  // console.log("updateListCurationNoteInSql; sql1: "+sql1)
};

/*
export const updateListCurationNotesInSql = async (oNotes) => {
  const aRatingTemplateSlugs = Object.keys(oNotes);
  console.log("updateListCurationNotesInSql; aRatingTemplateSlugs: "+JSON.stringify(aRatingTemplateSlugs)+"; oNotes: "+JSON.stringify(oNotes));

  for (let z=0; z<aRatingTemplateSlugs.length; z++) {
    const slug = aRatingTemplateSlugs[z];
    const aAuthorPubkeys = Object.keys(oNotes[slug]);
    for (let x=0; x<aAuthorPubkeys.length; x++) {
      const pk = aAuthorPubkeys[x]
      const oEvent = oNotes[slug][pk];
      const uniqueID = pk + "-" + slug;

      const sql1 = ` INSERT OR IGNORE INTO testnetListCurationRatings (uniqueID, ratingSlug, pk_rater, event) VALUES('${uniqueID}', '${slug}', '${pk}', '${JSON.stringify(oEvent)}' ) `;

      const res1 = await asyncSql(sql1);


      let sql2 = '';
      sql2 += ' UPDATE testnetListCurationRatings ';
      sql2 += ` SET ratingSlug = '${slug}' `;
      sql2 += ` , pk_rater = '${pk}' `;
      sql2 += ` , event = '${JSON.stringify(oEvent)}' `;
      sql2 += ` WHERE uniqueID = '${uniqueID}' `;
      // const res2 = await asyncSql(sql2);
    }
  }
}
*/

export const addEndorsementOfListCuratorEventToSql = async (
  event,
  parentConceptSlug,
  parentConceptNostrEventID
) => {
  const instanceNostrEventID = '';
  let ratingTemplateSlug = '';
  let rater_pubkey = '';
  let ratee_pubkey = '';
  let uniqueID = '';
  let contextDAGSlug = '';
  const oWord = JSON.parse(event.content);
  ratingTemplateSlug = oWord.ratingData.ratingTemplateData?.ratingTemplateSlug;
  rater_pubkey = oWord.ratingData.raterData?.nostrProfileData.pubkey;
  ratee_pubkey = oWord.ratingData.rateeData?.nostrProfileData.pubkey;
  contextDAGSlug =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData.contextData.contextDAG
      .slug;
  uniqueID = `${rater_pubkey}-${ratee_pubkey}-${parentConceptNostrEventID}-${ratingTemplateSlug}-${contextDAGSlug}`;

    // NEED TO REMOVE RATING IF AN OLDER ONE ALREADY EXISTS, i.e. if uniqueID is present but event_id is nonidentical
    let sql2 = '';
    sql2 += ' DELETE FROM endorsementsOfCurators ';
    sql2 += ` WHERE (uniqueID = '${uniqueID}' `;
    // need to compare created_at to see which one is older
    sql2 += ` AND created_at < '${event.created_at}' `;
    sql2 += ` AND event_id != '${event.id}') `;
    const res2 = await asyncSql(sql2);

  const sql1 = ` INSERT OR IGNORE INTO endorsementsOfCurators (event, event_id, created_at, rater_pubkey, parentConceptSlug, parentConceptNostrEventID, ratee_pubkey, ratingTemplateSlug, contextDAGSlug, uniqueID) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${
    event.pubkey
  }', '${parentConceptSlug}', '${parentConceptNostrEventID}', '${ratee_pubkey}', '${ratingTemplateSlug}', '${contextDAGSlug}',  '${uniqueID}' ) `;
  console.log(`addEndorsementOfListCuratorEventToSql; sql: ${sql1}`);
  const res1 = await asyncSql(sql1);

  return res1;
};

export const addRatingOfCuratedListInstanceEventToSql = async (
  event,
  parentConceptSlug,
  parentConceptNostrEventID
) => {
  let instanceSlug = '';
  let instanceNostrEventID = '';
  let ratingTemplateSlug = '';
  let uniqueID = '';
  let contextDAGSlug = '';
  const oWord = JSON.parse(event.content);
  ratingTemplateSlug = oWord.ratingData.ratingTemplateData?.ratingTemplateSlug;
  instanceSlug = oWord.ratingData.rateeData?.nostrCuratedListInstanceData.slug;
  instanceNostrEventID =
    oWord.ratingData.rateeData?.nostrCuratedListInstanceData.eventID;
  contextDAGSlug =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListInstanceRatingFieldsetData.contextData.contextDAG.slug;
  const ratingTemplateUniqueID = `${parentConceptNostrEventID}-${contextDAGSlug}`;
  uniqueID = `${event.pubkey}-${instanceNostrEventID}-${ratingTemplateUniqueID}`;

  // Ought to check for existing entries with the same uniqueID; if one or more is found, keep the most recent and delete the rest
  // INCOMPLETE
  /*
  let sql0 = '';
  sql0 += ` SELECT * FROM ratingsOfCuratedListInstances WHERE uniqueID = '${uniqueID}' `;
  const aMatchingUniqueIDs = await asyncSql(sql0);
  console.log("aMatchingUniqueIDs: "+(aMatchingUniqueIDs.length))
  */

  // NEED TO REMOVE RATING IF AN OLDER ONE ALREADY EXISTS, i.e. if uniqueID is present but event_id is nonidentical
  let sql2 = '';
  sql2 += ' DELETE FROM ratingsOfCuratedListInstances ';
  sql2 += ` WHERE (uniqueID = '${uniqueID}' `;
  // need to compare created_at to see which one is older
  sql2 += ` AND created_at < '${event.created_at}' `;
  sql2 += ` AND event_id != '${event.id}') `;
  const res2 = await asyncSql(sql2);

  const sql1 = ` INSERT OR IGNORE INTO ratingsOfCuratedListInstances (event, event_id, created_at, pubkey, parentConceptSlug, parentConceptNostrEventID, instanceSlug, instanceNostrEventID, ratingTemplateSlug, uniqueID) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${
    event.pubkey
  }', '${parentConceptSlug}', '${parentConceptNostrEventID}', '${instanceSlug}', '${instanceNostrEventID}', '${ratingTemplateSlug}', '${uniqueID}' ) `;
  console.log(`addRatingOfCuratedListInstanceEventToSql; sql: ${sql1}`);
  const res1 = await asyncSql(sql1);

  return res1;
};

export const addInstanceEventToSql = async (
  event,
  parentConceptSlug,
  parentConceptNostrEventID
) => {
  const sql = ` INSERT OR IGNORE INTO curatedListInstances (event, event_id, created_at, pubkey, parentConceptSlug, parentConceptNostrEventID) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${
    event.pubkey
  }', '${parentConceptSlug}', '${parentConceptNostrEventID}' ) `;
  const res = await asyncSql(sql);
  return res;
};

export const addCuratedListEventToSql = async (event) => {
  const sql = ` INSERT OR IGNORE INTO curatedLists (event, event_id, created_at, pubkey) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${event.pubkey}' ) `;
  const res = await asyncSql(sql);
  return res;
};

export const addDirectMessageToSql = async (event) => {
  const pk_recipient = event.tags.find(
    ([k, v]) => k === 'p' && v && v !== ''
  )[1];
  const sql = ` INSERT OR IGNORE INTO nostrDirectMessages (event, event_id, created_at, pubkey_author, pubkey_recipient) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${
    event.pubkey
  }', '${pk_recipient}' ) `;
  const res = await asyncSql(sql);
  return res;
};

export const addNostrNoteToSql = async (event) => {
  const sql = ` INSERT OR IGNORE INTO nostrNotes (event, event_id, created_at, pubkey) VALUES('${JSON.stringify(
    event
  )}', '${event.id}', '${event.created_at}', '${event.pubkey}' ) `;
  const res = await asyncSql(sql);
  return res;
};

export const updateThisKind3EventProfileInSql = (event) => {
  console.log(
    `updateThisKind3EventProfileInSql; event: ${JSON.stringify(event, null, 4)}`
  );
  const currentTime = dateToUnix(new Date());

  const sql1 = ` INSERT OR IGNORE INTO nostrProfiles (pubkey,kind3Event,firstSeen) VALUES('${
    event.pubkey
  }','${JSON.stringify(event)}',${currentTime}) `;
  // console.log("updateThisKind3EventProfileInSql; sql1: "+sql1);
  const res1 = asyncSql(sql1);

  let sql2 = '';
  sql2 += ' UPDATE nostrProfiles ';
  sql2 += ` SET kind3Event = '${JSON.stringify(event)}' `;
  sql2 += ` WHERE pubkey = '${event.pubkey}' `;
  // console.log("updateThisKind3EventProfileInSql; sql2: "+sql2);
  const res2 = asyncSql(sql2);
};

export const updateThisProfileInSql = (event) => {
  console.log(
    `updateThisProfileInSql; event: ${JSON.stringify(event, null, 4)}`
  );
  const currentTime = dateToUnix(new Date());

  const sql1 = ` INSERT OR IGNORE INTO nostrProfiles (pubkey,event,firstSeen) VALUES('${
    event.pubkey
  }','${JSON.stringify(event)}',${currentTime}) `;
  // console.log("updateThisProfileInSql; sql1: "+sql1);
  const res1 = asyncSql(sql1);

  let sql2 = '';
  sql2 += ' UPDATE nostrProfiles ';
  sql2 += ` SET event = '${JSON.stringify(event)}' `;
  sql2 += ` , lastUpdate = ${currentTime} `;
  sql2 += ` WHERE pubkey = '${event.pubkey}' `;
  // console.log("updateThisProfileInSql; sql2: "+sql2);
  const res2 = asyncSql(sql2);
};

export const fetchMyActiveNostrProfileFromSql = async (initNewProfile) => {
  const sql = 'SELECT * FROM myNostrProfile WHERE active=true';
  let aMyProfileData = await asyncSql(sql);

  console.log(
    `fetchMyActiveNostrProfileFromSql aMyProfileData.length: ${aMyProfileData.length}; initNewProfile: ${initNewProfile}`
  );

  if (initNewProfile && aMyProfileData.length == 0) {
    const [sk, pk] = await generateNewNostrKeys(true);
    aMyProfileData = await asyncSql(sql);
  }

  let oMyProfileData = {};
  if (aMyProfileData.length > 0) {
    oMyProfileData = aMyProfileData[0];
  }

  console.log(
    `fetchMyActiveNostrProfileFromSql oMyProfileData: ${JSON.stringify(
      oMyProfileData,
      null,
      4
    )}`
  );

  return oMyProfileData;
};

export const fetchAllMyNostrProfilesFromSql = async () => {
  const sql = 'SELECT * FROM myNostrProfile ';
  const aMyProfileData = await asyncSql(sql);
  console.log(
    `fetchAllMyNostrProfilesFromSql: ${JSON.stringify(aMyProfileData[0])}`
  );
  return aMyProfileData;
};

export const fetchProfilesDataFromSql = async () => {
  const sql = 'SELECT * FROM myNostrProfile WHERE active=true';
};
export const fetchExtendedFollowingListFromSql = async () => {
  const sql = 'SELECT * FROM myNostrProfile WHERE active=1';
};

export const addNewRowToMyNostrProfileInSql = async (pubkey, privkey) => {
  // pubkey is hex formatted
  const sql = ` INSERT OR IGNORE INTO myNostrProfile (pubkey,privkey,following,relays,active) VALUES ('${pubkey}','${privkey}','[]','${JSON.stringify(
    oDefaultRelayUrls
  )}',false) `;
  console.log(`addNewRowToMyNostrProfileInSql; sql: ${sql}`);
  return asyncSql(sql);
};

export const deleteRowFromMyNostrProfiles = async (sqlId) => {
  const sql = ` DELETE FROM myNostrProfile WHERE id=${sqlId} `;
  console.log(`deleteRowFromMyNostrProfiles; sql: ${sql}`);
  return asyncSql(sql);
};

export const deleteRelayUrlFromSql = async (url) => {
  const sql = ` DELETE FROM relays WHERE url='${url}' `;
  console.log(`deleteUrlFromRelays; sql: ${sql}`);
  return asyncSql(sql);
};

export const updateMyNostrProfileSetActiveInSql = async (sqlId) => {
  const sql1 = ' UPDATE myNostrProfile SET active=false ';
  const sql2 = ` UPDATE myNostrProfile SET active=true WHERE id=${sqlId} `;
  const res1 = await asyncSql(sql1);
  const res2 = await asyncSql(sql2);
  return true;
};

export const updateMyActiveNostrFollowingListInSql = async (
  aNewFollowingList,
  createdAt
) => {
  const sNewFollowingList = JSON.stringify(aNewFollowingList);
  const sql = ` UPDATE myNostrProfile SET following = '${sNewFollowingList}', followingListLastUpdate = ${createdAt} WHERE active = true `;
  console.log(`updateMyActiveNostrFollowingListInSql; sql: ${sql}`);
  const result = await asyncSql(sql);
};

export const updateMyActiveNostrRelaysListInSql = async (
  oNewRelaysList,
  createdAt
) => {
  const sNewRelaysList = JSON.stringify(oNewRelaysList);
  const sql = ` UPDATE myNostrProfile SET relays = '${sNewRelaysList}', relaysListLastUpdate = ${createdAt} WHERE active = true `;
  console.log(`updateMyActiveNostrFollowingListInSql; sql: ${sql}`);
  const result = await asyncSql(sql);
};

export const updateNostrRelaysForActiveUserInSql = async (oRelays) => {
  let sql = '';
  sql += ' UPDATE myNostrProfile ';
  sql += ` SET relays = '${JSON.stringify(oRelays)}' `;
  sql += ` WHERE active = true `;

  console.log(`updateNostrRelaysForActiveUserInSql sql: ${sql}`);

  const result = await asyncSql(sql);
  return result;
};

// input object formatted as state from myNostrProfile redux store
export const updateMyFullNostrProfileInSql = async (oMyNostrProfileInfo) => {
  const {
    pubkey_hex,
    name,
    display_name,
    website,
    about,
    picture_url,
    nip05,
    lud06,
    following,
    extendedFollowing,
    followers,
    relays,
    multiClientAccess,
    relaysAutoUpdate,
    relaysAutoMerge,
    followingForRelays,
    endorseAsRelaysPicker,
    endorseAsRelaysPickerHunter,
    endorseAsNostCuratedListCurator,
  } = oMyNostrProfileInfo;
  const currentTime = dateToUnix(new Date());

  let sql = '';
  sql += ' UPDATE myNostrProfile ';
  sql += ` SET name = '${name}' `;
  sql += ` , display_name = '${display_name}' `;
  sql += ` , picture_url = '${picture_url}' `;
  sql += ` , website = '${website}' `;
  sql += ` , about = '${about}' `;
  sql += ` , lud06 = '${lud06}' `;
  sql += ` , nip05 = '${nip05}' `;
  sql += ` , followers = '${JSON.stringify(followers)}' `;
  sql += ` , following = '${JSON.stringify(following)}' `;
  sql += ` , extendedFollowing = '${JSON.stringify(extendedFollowing)}' `;
  sql += ` , followingForRelays = '${JSON.stringify(followingForRelays)}' `;
  sql += ` , endorseAsRelaysPicker = '${JSON.stringify(
    endorseAsRelaysPicker
  )}' `;
  sql += ` , endorseAsRelaysPickerHunter = '${JSON.stringify(
    endorseAsRelaysPickerHunter
  )}' `;
  sql += ` , relays = '${JSON.stringify(relays)}' `;
  sql += ` , lastUpdate = ${currentTime} `;
  sql += ` , multiClientAccess = ${multiClientAccess} `;
  sql += ` , relaysAutoUpdate = ${relaysAutoUpdate} `;
  sql += ` , relaysAutoMerge = ${relaysAutoMerge} `;
  sql += ` , endorseAsNostCuratedListCurator = '${JSON.stringify(
    endorseAsNostCuratedListCurator
  )}' `;
  sql += ` WHERE pubkey = '${pubkey_hex}' `;

  // console.log(`qwerty updateMyFullNostrProfileInSql sql: ${sql}`);

  const result = await asyncSql(sql);
  console.log(
    `qwerty updateMyFullNostrProfileInSql result: ${JSON.stringify(
      result,
      null,
      4
    )}`
  );
};

export const updateMyActiveNostrProfileInSql = async (oMyNostrProfileInfo) => {
  const { name } = oMyNostrProfileInfo;
  const { display_name } = oMyNostrProfileInfo;
  const profilePictureUrl = oMyNostrProfileInfo.picture;
  const { website } = oMyNostrProfileInfo;
  const { about } = oMyNostrProfileInfo;
  const btcLightningTips = oMyNostrProfileInfo.lud06;
  const nip05Verification = oMyNostrProfileInfo.nip05;
  const { multiClientAccess } = oMyNostrProfileInfo;
  const currentTime = dateToUnix(new Date());

  let sql = '';
  sql += ' UPDATE myNostrProfile ';
  sql += ` SET name = '${name}' `;
  sql += ` , display_name = '${display_name}' `;
  sql += ` , picture_url = '${profilePictureUrl}' `;
  sql += ` , website = '${website}' `;
  sql += ` , about = '${about}' `;
  sql += ` , lud06 = '${btcLightningTips}' `;
  sql += ` , nip05 = '${nip05Verification}' `;
  if (multiClientAccess !== undefined) {
    sql += ` , multiClientAccess = ${multiClientAccess} `;
  }
  sql += ` , lastUpdate = ${currentTime} `;
  sql += ' WHERE active = true ';

  console.log(`updateNostrProfileInSql sql: ${sql}`);

  const result = await asyncSql(sql);
  console.log(
    `updateNostrProfileInSql result: ${JSON.stringify(result, null, 4)}`
  );
};

export const addNewRelayToSql = async (newUrl) => {
  const sql = ` INSERT OR IGNORE INTO relays (url) VALUES ('${newUrl}') `;
  const result = await asyncSql(sql);
  return result;
};

export const updateNostrRelayInSql = async (oNewState) => {
  const sql = ` UPDATE relays SET active = ${oNewState.active} WHERE url = '${oNewState.url}' `;
  const result = await asyncSql(sql);
  return result;
};

export const fetchRelaysFromSql = async (which) => {
  let sql = '';
  sql += 'SELECT * FROM relays ';
  const aRelaysData = await asyncSql(sql);

  const aDefault = [];
  const aActive = [];
  const aAll = [];
  console.log(`aRelaysData.length: ${aRelaysData.length}`);
  for (let r = 0; r < aRelaysData.length; r++) {
    const oNextRelayData = aRelaysData[r];

    const { url } = oNextRelayData;
    const { default_app } = oNextRelayData;
    const { active } = oNextRelayData;
    aAll.push(url);
    if (default_app) {
      aDefault.push(url);
    }
    if (active) {
      aActive.push(url);
    }
  }
  if (!which) {
    return aActive;
  }
  if (which == 'active') {
    return aActive;
  }
  if (which == 'default') {
    return aDefault;
  }
  if (which == 'all') {
    return aAll;
  }
  if (which == 'verbose') {
    return [aActive, aDefault, aAll];
  }
  return aActive;
};
