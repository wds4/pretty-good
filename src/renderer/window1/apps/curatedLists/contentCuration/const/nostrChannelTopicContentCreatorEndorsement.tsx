// rating template: nostrChannelTopicContentCreatorEndorsement

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
      ratingTemplateSlug: "nostrChannelTopicContentCreatorEndorsement",
      ratingTemplateTitle: "Nostr Channel Topic Content Creator Endorsement"
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
        "nostrChannelTopicContentCreatorEndorsementFieldset",
        "confidenceFieldset"
      ],
      confidenceFieldsetData: {
        confidence: 80
      },
      nostrChannelTopicContentCreatorEndorsementFieldset: {
        regularSliderRating: null,
        contextData: {
          transitivity: false,
          nostrTopicData: {
            eventID: null,
            slug: null,
            name: null
          }
        }
      }
    }
  }
}

export default oRating;
