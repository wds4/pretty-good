// rating template: nostrChannelTopicsRelationshipCuratorEndorsement
// still need to review structure

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
      ratingTemplateSlug: "nostrChannelTopicsRelationshipCuratorEndorsement",
      ratingTemplateTitle: "Nostr Channel Topics Relationship Curator Endorsement"
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
        "nostrChannelTopicsRelationshipCuratorEndorsementFieldset",
        "confidenceFieldset"
      ],
      confidenceFieldsetData: {
        confidence: 80
      },
      nostrChannelTopicsRelationshipCuratorEndorsementFieldsetData: {
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
        transitivity: true,
        contextDAG: {
          slug: "genericContext",
        },
        nostrParentCuratedListData: {
          eventID:
            'need to find or create event id',
          slug: {
            singular: 'nostrTopicRelationship',
          },
          name: {
            singular: 'nostr topic relationship',
          },
        },
      }
    }
  }
}

export default oRating;
