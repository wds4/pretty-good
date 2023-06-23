export let createNostrDirectMessagesTableCommand = '';
export let createNostrNotesTableCommand = '';
export let createNostrProfilesTableCommand = '';
export let createMyProfileTableCommand = '';
export let createMyFollowingNetworkTableCommand = '';
export let createRelaysTableCommand = '';
export let createTestnetListCurationRatingsTableCommand = '';
export let createCuratedListsTableCommand = '';
export let createCuratedListInstancesTableCommand = '';
export let createRatingsOfCuratedListInstancesTableCommand = '';
export let createEndorsementsOfCuratorsTableCommand = '';
export let createMyConceptGraphChannelsTableCommand = '';
export let createProfileBackupsTableCommand = '';

// duplication from renderer/window1/const - may deprecate the lists here in favor of the one over there
export const aDefaultRelayUrls: string[] = [
  'wss://nostr-pub.wellorder.net',
  'wss://nostr-relay.untethr.me',
  'wss://relay.damus.io',
  'wss://nostr-relay.wlvs.space',
  'wss://nostr.fmt.wiz.biz',
  'wss://nostr.oxtr.dev',
];
export const oDefaultRelayUrls = {
  'wss://nostr-pub.wellorder.net': {
    write: true,
    read: true
  },
  'wss://nostr-relay.untethr.me': { write: true, read: true },
  'wss://relay.damus.io': { write: true, read: true },
  'wss://nostr-relay.wlvs.space': { write: true, read: true },
  'wss://nostr.fmt.wiz.biz': { write: true, read: true },
  'wss://nostr.oxtr.dev': { write: true, read: true },
};

export const oDefaultDevModes = {
  devMode: false, // generic dev mode; may deprecate in favor of devModes 2 and 3
  devMode1: true, // toggle Curated Lists
  devMode2: false, // reveal other features that are still in alpha
  devMode3: false, // reveal "nostr nerd" toggle buttons
  devMode4: true, // Curated Lists main page: show data from SQL
  devMode5: false, // Curated Lists main page: show data from redux store
  devMode6: false, // Curated Lists main page: show additional features
  devMode7: false, // reserved
  devMode8: false, // reserved
  devMode9: false, // reserved
  devMode10: false, // reserved
};

createProfileBackupsTableCommand += 'id INTEGER PRIMARY KEY, ';
createProfileBackupsTableCommand += 'pubkey TEXT NULL, ';
createProfileBackupsTableCommand += 'type3_id TEXT NULL, ';
createProfileBackupsTableCommand += 'type1_id TEXT NULL, ';
createProfileBackupsTableCommand += 'type3_event TEXT NULL, ';
createProfileBackupsTableCommand += 'type1_event TEXT NULL, ';
createProfileBackupsTableCommand += 't3id_t1id TEXT NULL, ';
createProfileBackupsTableCommand += 'whenBackedUp INTEGER NULL, ';
createProfileBackupsTableCommand += 'UNIQUE(t3id_t1id) ';

/*
myConceptGraph_channels
- id (unique)
- event
- event_id (unique)

- slug (=wordData.slug)
- version (=wordData.version)
- mostRecentSlug (boolean: true if it's the most recent for this slug)
- mostRecentSlugAndVersion (boolean: true if it's the most recent for this slug and this version)
- word
- stewardPubkey
- stewardPubkeyPlusVersion (should be unique, analagous to ipns)
- wordTypes
- ipns (for potential later usage)
- ipfs (for potential later usage)
*/
createMyConceptGraphChannelsTableCommand += 'id INTEGER PRIMARY KEY, ';
createMyConceptGraphChannelsTableCommand += 'event TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'event_id TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'slug TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'version TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'mostRecentSlug BOOLEAN NULL, ';
createMyConceptGraphChannelsTableCommand += 'mostRecentSlugAndVersion BOOLEAN NULL, ';
createMyConceptGraphChannelsTableCommand += 'word TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'stewardPubkey TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'stewardPubkeyPlusVersion TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'wordTypes TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'ipns TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'ipfs TEXT NULL, ';
createMyConceptGraphChannelsTableCommand += 'UNIQUE(event_id) ';

createEndorsementsOfCuratorsTableCommand += 'id INTEGER PRIMARY KEY, ';
createEndorsementsOfCuratorsTableCommand += 'event TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'event_id TEXT NULL UNIQUE, ';
createEndorsementsOfCuratorsTableCommand += 'uniqueID TEXT NULL UNIQUE, ';
createEndorsementsOfCuratorsTableCommand += 'created_at TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'rater_pubkey TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'ratee_pubkey TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'ratingTemplateSlug TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'parentConceptSlug TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'parentConceptNostrEventID TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'contextDAGSlug TEXT NULL, ';
createEndorsementsOfCuratorsTableCommand += 'deprecated BOOLEAN false, ';
createEndorsementsOfCuratorsTableCommand += 'UNIQUE(uniqueID,event_id) ';
// table: endorsementsOfCurators

// GENERATION 2 RATINGS TABLE (March 2023)
// each rating is its own independent word wrapping in its own event
// See renderer/window1/apps/curatedLists/viewInstance/leaveRating where these ratings are created
// Ratings of curated list INSTANCE
// (parent concept = parent list, since list is a simplified version of a concept)
createRatingsOfCuratedListInstancesTableCommand += 'id INTEGER PRIMARY KEY, ';
createRatingsOfCuratedListInstancesTableCommand += 'event TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'event_id TEXT NULL UNIQUE, ';
createRatingsOfCuratedListInstancesTableCommand += 'uniqueID TEXT NULL UNIQUE, ';
createRatingsOfCuratedListInstancesTableCommand += 'created_at TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'pubkey TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'ratingTemplateSlug TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'parentConceptSlug TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'parentConceptNostrEventID TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'instanceSlug TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'instanceNostrEventID TEXT NULL, ';
createRatingsOfCuratedListInstancesTableCommand += 'deprecated BOOLEAN false, ';
createRatingsOfCuratedListInstancesTableCommand += 'UNIQUE(uniqueID,event_id) ';
// table: ratingsOfCuratedListInstances

// GENERATION 1 RATINGS TABLE (? Feb 2023)
// Multiple ratings stored in a single event
// Each event contains an array of all ratees that are rated by the author for that ratingSlug; event is event type 39901 (for grapevine-testnet)
// In the future, more complex tables will have to exist, one for each ratee
createTestnetListCurationRatingsTableCommand += 'id INTEGER PRIMARY KEY, ';
createTestnetListCurationRatingsTableCommand += 'uniqueID TEXT NULL UNIQUE, '; // uniqueID = pk_rater + "-" + ratingSlug
createTestnetListCurationRatingsTableCommand += 'ratingSlug TEXT NULL, '; // ratingSlug: endorseAsRelaysPicker, endorseAsRelaysPickerHunter, etc
createTestnetListCurationRatingsTableCommand += 'pk_rater TEXT NULL, ';
createTestnetListCurationRatingsTableCommand += 'event TEXT NULL, ';
createTestnetListCurationRatingsTableCommand += 'UNIQUE(uniqueID) ';
// table: testnetListCurationRatings

createCuratedListInstancesTableCommand += 'id INTEGER PRIMARY KEY, ';
createCuratedListInstancesTableCommand += 'event TEXT NULL, ';
createCuratedListInstancesTableCommand += 'event_id TEXT NULL UNIQUE, ';
createCuratedListInstancesTableCommand += 'created_at INTEGER null, ';
createCuratedListInstancesTableCommand += 'pubkey TEXT NULL, ';
createCuratedListInstancesTableCommand += 'parentConceptSlug TEXT NULL, ';
createCuratedListInstancesTableCommand += 'parentConceptNostrEventID TEXT NULL, ';
createCuratedListInstancesTableCommand += 'deprecated BOOLEAN false, ';
createCuratedListInstancesTableCommand += 'UNIQUE(event_id) ';

createCuratedListsTableCommand += 'id INTEGER PRIMARY KEY, ';
createCuratedListsTableCommand += 'event TEXT NULL, ';
createCuratedListsTableCommand += 'event_id TEXT NULL UNIQUE, ';
createCuratedListsTableCommand += 'created_at INTEGER null, ';
createCuratedListsTableCommand += 'pubkey TEXT NULL, ';
createCuratedListsTableCommand += 'deprecated BOOLEAN false, ';
createCuratedListsTableCommand += 'UNIQUE(event_id) ';

createNostrDirectMessagesTableCommand += 'id INTEGER PRIMARY KEY, ';
createNostrDirectMessagesTableCommand += 'event TEXT NULL, ';
createNostrDirectMessagesTableCommand += 'event_id TEXT NULL UNIQUE, ';
createNostrDirectMessagesTableCommand += 'created_at INTEGER NULL, ';
createNostrDirectMessagesTableCommand += 'pubkey_author TEXT NULL , ';
createNostrDirectMessagesTableCommand += 'pubkey_recipient TEXT NULL , ';
createNostrDirectMessagesTableCommand += 'viewed BOOLEAN false , ';
createNostrDirectMessagesTableCommand += 'UNIQUE(event_id) ';

createNostrNotesTableCommand += 'id INTEGER PRIMARY KEY, ';
createNostrNotesTableCommand += 'event TEXT NULL, ';
createNostrNotesTableCommand += 'event_id TEXT NULL UNIQUE, ';
createNostrNotesTableCommand += 'created_at INTEGER NULL, ';
createNostrNotesTableCommand += 'pubkey TEXT NULL , ';
createNostrNotesTableCommand += 'viewed BOOLEAN FALSE , ';
createNostrNotesTableCommand += 'UNIQUE(event_id) ';

createNostrProfilesTableCommand += 'id INTEGER PRIMARY KEY, ';
createNostrProfilesTableCommand += 'event TEXT NULL, ';
createNostrProfilesTableCommand += 'event_id TEXT NULL UNIQUE, ';
createNostrProfilesTableCommand += 'content TEXT NULL, ';
createNostrProfilesTableCommand += 'created_at INTEGER NULL, ';
createNostrProfilesTableCommand += 'pubkey TEXT NULL UNIQUE, ';
createNostrProfilesTableCommand += 'name TEXT NULL, ';
createNostrProfilesTableCommand += 'display_name TEXT NULL, ';
createNostrProfilesTableCommand += 'about TEXT NULL, ';
createNostrProfilesTableCommand += 'picture_url TEXT NULL, ';
createNostrProfilesTableCommand += 'nip05 TEXT NULL, ';
createNostrProfilesTableCommand += 'lud06 TEXT NULL, ';
createNostrProfilesTableCommand += 'followers TEXT NULL, ';
createNostrProfilesTableCommand += 'following TEXT NULL, ';
// createNostrProfilesTableCommand += "degreesOfSeparation INTEGER NULL, ";
createNostrProfilesTableCommand += 'firstSeen INTEGER NULL, ';
createNostrProfilesTableCommand += 'lastUpdate INTEGER NULL, ';
createNostrProfilesTableCommand += 'kind3Event TEXT NULL, ';
createNostrProfilesTableCommand += 'UNIQUE(event_id, pubkey) ';

createMyProfileTableCommand += 'id INTEGER PRIMARY KEY, ';
createMyProfileTableCommand += 'created_at INTEGER NULL, ';
createMyProfileTableCommand += 'active BOOLEAN false, ';
createMyProfileTableCommand += 'pubkey TEXT NULL UNIQUE, ';
createMyProfileTableCommand += 'privkey TEXT NULL UNIQUE, ';
createMyProfileTableCommand += 'name TEXT NULL, ';
createMyProfileTableCommand += 'display_name TEXT NULL, ';
createMyProfileTableCommand += 'website TEXT NULL, ';
createMyProfileTableCommand += 'about TEXT NULL, ';
createMyProfileTableCommand += 'picture_url TEXT NULL, ';
createMyProfileTableCommand += 'banner_url TEXT NULL, ';
createMyProfileTableCommand += 'followers TEXT NULL, ';
createMyProfileTableCommand += 'following TEXT NULL, ';
createMyProfileTableCommand += 'extendedFollowing TEXT NULL, ';
createMyProfileTableCommand += 'followingForRelays TEXT NULL, ';
createMyProfileTableCommand += 'endorseAsRelaysPicker TEXT NULL, ';
createMyProfileTableCommand += 'endorseAsRelaysPickerHunter TEXT NULL, ';
createMyProfileTableCommand += 'nip05 TEXT NULL, ';
createMyProfileTableCommand += 'lud06 TEXT NULL, ';
createMyProfileTableCommand += 'relays TEXT NULL, ';
createMyProfileTableCommand += 'multiClientAccess BOOLEAN true, ';
createMyProfileTableCommand += 'relaysAutoUpdate BOOLEAN false, ';
createMyProfileTableCommand += 'relaysAutoMerge BOOLEAN false, ';
createMyProfileTableCommand += 'lastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'followingListLastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'relaysListLastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'endorseAsNostCuratedListCurator TEXT NULL, ';
createMyProfileTableCommand += 'devModes TEXT NULL, ';
createMyProfileTableCommand += 'UNIQUE(pubkey, privkey) ';

createMyFollowingNetworkTableCommand += 'id INTEGER PRIMARY KEY, ';
createMyFollowingNetworkTableCommand += 'seed TEXT NULL, ';
createMyFollowingNetworkTableCommand += 'pubkeys TEXT NULL ';

createRelaysTableCommand += 'id INTEGER PRIMARY KEY, ';
createRelaysTableCommand += 'url TEXT NULL, ';
createRelaysTableCommand += 'default_app BOOLEAN NULL, ';
createRelaysTableCommand += 'active BOOLEAN NULL, ';
createRelaysTableCommand += 'UNIQUE(url) ';
