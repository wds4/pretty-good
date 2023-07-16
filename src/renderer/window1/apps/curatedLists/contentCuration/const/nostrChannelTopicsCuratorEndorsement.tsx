// rating template: nostrChannelTopicsCuratorEndorsement

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
      ratingTemplateSlug: "nostrChannelTopicsCuratorEndorsement",
      ratingTemplateTitle: "Nostr Channel Topics Curator Endorsement"
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
          "nostrChannelTopicsCuratorEndorsementFieldset",
          "confidenceFieldset"
      ],
      confidenceFieldsetData: {
          confidence: 80
      },
      nostrChannelTopicsCuratorEndorsementFieldsetData: {
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
        contextData: {
          transitivity: true,
          nostrTopicData: {
            eventID: null,
            slug: null,
            name: null
          }
        }
      }
    }
  }
};

export default oRating;
