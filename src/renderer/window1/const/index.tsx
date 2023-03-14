export const noProfilePicUrl = 'https://nostr.build/i/2282.png';
export const noBannerPicUrl = 'https://nostr.build/i/2282.png';

export const foo = "bar";

// This is used as the default list for new profiles
export const aDefaultRelayUrls: string[] = [
  'wss://nostr-pub.wellorder.net',
  'wss://relay.damus.io',
  'wss://nostr.fmt.wiz.biz', // NIP-16 and NIP-33
  'wss://nostr.zebedee.cloud', // NIP-16 and NIP-33
  'wss://nostr.oxtr.dev', // NIP-16 and NIP-33
  'wss://nostr.wine',
  'wss://nos.lol',
];
/*
// NIP-16 and NIP-33:
'wss://nostr.fmt.wiz.biz',
'wss://nostr.zebedee.cloud',
'wss://nostr.oxtr.dev',
*/
export const oDefaultRelayUrls = {
  'wss://nostr-pub.wellorder.net': {read: true, write: true},
  'wss://relay.damus.io': {read: true, write: true},
  'wss://nostr.fmt.wiz.biz': {read: true, write: true},
  'wss://nostr.zebedee.cloud': {read: true, write: true},
  'wss://nostr.oxtr.dev': {read: true, write: true},
  'wss://nostr.wine': {read: true, write: true},
  'wss://nos.lol': {read: true, write: true},
};

export const oGrapevineDefaults = {
  attenuationFactor: 80,
  rigorr: 25,
  defaultUserTrustAverageScore: 0,
  defaultUserTrustConfidence: 40,
  strat1Coeff: 15,
  strat2Coeff: 10,
  strat3Coeff: 100,
  strat4Coeff: 200,
  strat5Coeff: 500,
}
