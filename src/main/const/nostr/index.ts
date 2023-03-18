export let createNostrDirectMessagesTableCommand = '';
export let createNostrNotesTableCommand = '';
export let createNostrProfilesTableCommand = '';
export let createMyProfileTableCommand = '';
export let createMyFollowingNetworkTableCommand = '';
export let createRelaysTableCommand = '';
export let createTestnetListCurationRatingsTableCommand = '';
export let createCuratedListsTableCommand = '';
export let createCuratedListInstancesTableCommand = '';

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

// each event contains an array of all ratees that are rated by the author for that ratingSlug; event is event type 39901 (for grapevine-testnet)
// In the future, more complex tables will have to exist, one for each ratee
createTestnetListCurationRatingsTableCommand += 'id INTEGER PRIMARY KEY, ';
createTestnetListCurationRatingsTableCommand += 'uniqueID TEXT NULL UNIQUE, '; // uniqueID = pk_rater + "-" + ratingSlug
createTestnetListCurationRatingsTableCommand += 'ratingSlug TEXT NULL, '; // ratingSlug: endorseAsRelaysPicker, endorseAsRelaysPickerHunter, etc
createTestnetListCurationRatingsTableCommand += 'pk_rater TEXT NULL, ';
createTestnetListCurationRatingsTableCommand += 'event TEXT NULL, ';
createTestnetListCurationRatingsTableCommand += 'UNIQUE(uniqueID) ';

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
createMyProfileTableCommand += 'multiClientAccess BOOLEAN false, ';
createMyProfileTableCommand += 'relaysAutoUpdate BOOLEAN false, ';
createMyProfileTableCommand += 'relaysAutoMerge BOOLEAN false, ';
createMyProfileTableCommand += 'lastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'followingListLastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'relaysListLastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'UNIQUE(pubkey, privkey) ';

createMyFollowingNetworkTableCommand += 'id INTEGER PRIMARY KEY, ';
createMyFollowingNetworkTableCommand += 'seed TEXT NULL, ';
createMyFollowingNetworkTableCommand += 'pubkeys TEXT NULL ';

createRelaysTableCommand += 'id INTEGER PRIMARY KEY, ';
createRelaysTableCommand += 'url TEXT NULL, ';
createRelaysTableCommand += 'default_app BOOLEAN NULL, ';
createRelaysTableCommand += 'active BOOLEAN NULL, ';
createRelaysTableCommand += 'UNIQUE(url) ';
