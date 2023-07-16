// rating template: nostrChannelTopicsCuratorEndorsement

export const oRating = {
  wordData: {
    slug: null,
    wordTypes: ["rating"],
  },
  ratingData: {
    raterData: {
      raterType: 'nostrProfile',
      nostrProfileData: {
        pubkey: null,
        name: null,
        display_name: null,
      },
    },
    rateeData: {
      rateeType: 'nostrChannelTopicInstance',
      nostrChannelTopicInstanceData: {
        eventID: null,
        name: null,
        slug: null,
      },
    },
    ratingTemplateData: {
      ratingTemplateSlug: 'nostrChannelTopicsInstanceEndorsement',
      ratingTemplateTitle: 'Nostr Channel Topic Instance Endorsement',
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
        'nostrChannelTopicsInstanceEndorsementFieldset',
        'confidenceFieldset',
      ],
      confidenceFieldsetData: {
        confidence: 80,
      },
      nostrChannelTopicsInstanceEndorsementFieldsetData: {
        regularSliderRating: null,
        contextData: {
          transitivity: false,
          contextDAG: {
            slug: "genericContext",
          },
          nostrParentCuratedListData: {
            eventID:
              'ec9af0fa71b2f6c1e3556816ad7c06e6623069c04a6e486fc9312b0273697779',
            slug: {
              singular: 'nostrTopic',
            },
            name: {
              singular: 'nostr topic',
            },
          },
        },
      },
    },
  },
};

export default oRating;
