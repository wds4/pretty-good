import { MultiCompiler } from webpack

export const grapevineNostrUserTrustRatingTemplate = {
  wordData: {
    slug: null,
    title: null,
    name: null,
    description: null,
    wordType: "rating",
    wordTypes: [
      "word",
      "rating",
    ],
    governingConcepts: []
  },
  ratingData: {
    slug: null,
    name: null,
    title: null,
    description: null,
    ratingTemplateData: {
      ratingTemplateName: 'grapevine nostr user trust',
      ratingTemplateIPNS: null,
      ratingTemplateWordSlug: 'grapevineNostrUserTrus',
      ratingTemplateTitle: "Grapevine Nostr User Trust",
    },
    raterData: {
      raterEntityType: "nostrUser",
      nostrUserData: {
        pubkey_hex: null,
        pubkey_bech32: null,
        display_name: null,
        name: null
      }
    },
    rateeData: {
      rateeEntityType: "nostrUser",
      nostrUserData: {
        pubkey_hex: null,
        pubkey_bech32: null,
        display_name: null,
        name: null
      }
    },
    ratingFieldsetData: {
      ratingFieldsetNames: [
        "trust fieldset",
        "confidence fieldset",
        "comments fieldset"
      ],
      commentsFieldsetData: {
        comments: null
      },
      confidenceFieldsetData: {
        confidence: '80'
      },
      trustFieldsetData: {
        trustRating: null,
        referenceTrustRating: null,
        referenceData: {
          referenceEntityType: "nostrUser",
          nostrUserData: {
            pubkey_hex: null,
            pubkey_bech32: null,
            display_name: null,
            name: null
          }
        },
        contextData: {
          transitivity: true,
          influenceCategoryData: {
            influenceCategoryName: "nostr relay management",
            influenceCategoryIPNS: null,
            influenceCategoryWordSlug: "influenceType_nostrRelayManagement_8teh9x",
            influenceCategoryTitle: "Nostr Relay Management",
          },
          topicData: {
            topicName: "all types of relays",
            topicIPNS: null,
            topicWordSlug: "contextStructuredData_context_allTypesOfRelays_sei24k",
            topicTitle: "All Relay Types",
          },
          contextGraphData: {
            contextGraphName: "nostr relay management",
            contextGraphIPNS: null,
            contextGraphWordSlug: "contextGraph_nostrRelayManagement_8xr5k8",
            contextGraphWordTitle: "Nostr Relay Management",
          }
        }
      }
    }
  },
  metaData: {
    ipns: "k2k4r8jm3hp95adow41xeai820efurtx8kfdgz3t3q3sm3k1vwl6frnt",
    lastUpdate: null,
  },
};
