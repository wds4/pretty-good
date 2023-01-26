export let createNostrProfilesTableCommand = '';
export let createMyProfileTableCommand: string = '';
export let createMyFollowingNetworkTableCommand: string = '';
export let createRelaysTableCommand: string = '';
export const aDefaultRelayUrls: string[] = [
  'wss://nostr-pub.wellorder.net',
  'wss://nostr-relay.untethr.me',
  'wss://relay.damus.io',
  'wss://nostr-relay.wlvs.space',
  'wss://nostr.fmt.wiz.biz',
  'wss://nostr.oxtr.dev',
];

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
createMyProfileTableCommand += 'following TEXT NULL, ';
createMyProfileTableCommand += 'followers TEXT NULL, ';
createMyProfileTableCommand += 'ln_url TEXT NULL, ';
createMyProfileTableCommand += 'nip05_verification TEXT NULL, ';
createMyProfileTableCommand += 'lastUpdate INTEGER NULL, ';
createMyProfileTableCommand += 'UNIQUE(pubkey, privkey) ';


createMyFollowingNetworkTableCommand += 'id INTEGER PRIMARY KEY, ';
createMyFollowingNetworkTableCommand += 'seed TEXT NULL, ';
createMyFollowingNetworkTableCommand += 'pubkeys TEXT NULL ';


createRelaysTableCommand += 'id INTEGER PRIMARY KEY, ';
createRelaysTableCommand += 'url TEXT NULL, ';
createRelaysTableCommand += 'default_app BOOLEAN NULL, ';
createRelaysTableCommand += 'active BOOLEAN NULL, ';
createRelaysTableCommand += 'UNIQUE(url) ';
