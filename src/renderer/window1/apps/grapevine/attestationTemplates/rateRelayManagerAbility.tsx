export const rateUserAsNostrRelayOracle = {
  wordData: {
    wordTypes: [ "word", "rating" ],
  },
  ratingData: {
    ratingTemplateData: {
      slug: "rateUserAsNostrRelayOracle",
      title: "Endorse My Nostr Relay List",
      ipns: null,
      ipfs: null,
    },
    raterData: {
      nostr: {
        pubkey_hex: null,
        pubkey_bech32: null,
      }
    },
    rateeData: {
      nostr: {
        pubkey_hex: null,
        pubkey_bech32: null,
      }
    },
    ratingFieldsData: {
      type: "endorse",
      listLocation: {
        pubkey_hex: "thisNostrProfile",
      },
      description: "endorse = true means the author does endorse. attestation type: endorse or blacklist. null implies endorse. listLocation indicates where the relay list is stored; typically as a nostr pubkey_hex. Default is the pubkey_hex of the author."
    },
    confidence: 80,
    contextData: {
      context: "generic",
    }
  },
  metaData: {
    ipns: null,
    timestamp: null,
    nostrGrapevineTestnet: true,
    nostrRelayFilter: {
      kind: 1971,
      tags: ["#g","grapevine"]
    },
  },
};

export const foo = 'bar';
