// rating template: nostrChannelTopicsTreeStructureCuratorEndorsement

export const oRating = {
  wordData: {
    slug: null,
    wordTypes: ["rating"]
  },
  ratingData: {
    raterData: {
      raterType: "nostrProfile",
      nostrProfileData: {
        pubkey: null,
        name: null,
        display_name: null
      }
    },
    rateeData: {
      rateeType: "nostrProfile",
      nostrProfileData: {
        pubkey: null,
        name: null,
        display_name: null
      }
    },
    ratingTemplateData: {
      ratingTemplateSlug: "nostrChannelTopicsTreeStructureCuratorEndorsement",
      ratingTemplateTitle: "Nostr Channel Topics Tree Structure Curator Endorsement"
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
        "nostrChannelTopicsTreeStructureCuratorEndorsementFieldset",
        "confidenceFieldset"
      ],
      confidenceFieldsetData: {
        confidence: 80
      },
      nostrChannelTopicsTreeStructureCuratorEndorsementFieldset: {
        regularSliderRating: null,
        referenceRegularSliderRating: 100,
        referenceData: {
          referenceEntityType: "nostrProfile",
          nostrProfileData: {
            pubkey: null,
            name: null,
            display_name: null
          }
        },
        transitivity: true
      }
    }
  }
}

export default oRating;
