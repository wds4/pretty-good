export const endorseMyRelayList = {
  wordData: {
    wordTypes: [ "word", "attestation" ],
  },
  attestationData: {
    attestationTemplateData: {
      slug: "endorseMyNostrRelayList",
      title: "Endorse My Nostr Relay List",
      ipns: null,
      ipfs: null,
    },
    authorData: {
      nostr: {
        pubkey_hex: null,
        pubkey_bech32: null,
      }
    },
    attestationFieldsData: {
      commentsFieldsetData: {
        comments: null,
      },
      confidenceFieldsetData: {
        confidence: null,
      },
      trustFieldsetData: {
        trustRating: null,
        referenceRating: null,
      },
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
  }
}

export const foo = 'bar';
