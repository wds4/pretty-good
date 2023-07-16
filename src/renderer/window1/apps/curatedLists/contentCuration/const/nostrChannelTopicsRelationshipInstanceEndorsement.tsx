// rating template: nostrChannelTopicsRelationshipInstanceEndorsement
// still need to review structure

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
      rateeType: 'nostrChannelTopicRelationship',
      nostrChannelTopicRelationshipData: {
        eventID: null,
        name: null,
        slug: null,
      },
    },
    ratingTemplateData: {
      ratingTemplateSlug: 'nostrChannelTopicsRelationshipInstanceEndorsement',
      ratingTemplateTitle: 'Nostr Channel Topics Relationship Instance Endorsement',
    },
    ratingFieldsetData: {
      ratingFieldsetSlugs: [
        'nostrChannelTopicsRelationshipInstanceEndorsementFieldset',
        'confidenceFieldset',
      ],
      confidenceFieldsetData: {
        confidence: 80,
      },
      nostrChannelTopicsRelationshipInstanceEndorsementFieldsetData: {
        regularSliderRating: null,
        contextData: {
          transitivity: false,
          contextDAG: {
            slug: "genericContext",
          },
          nostrParentCuratedListData: {
            eventID:
              '6a7794b2b1d1cb33c05473fe2a52f4460eec63311e851e3c3fa8e787ca7d88fb',
            slug: {
              singular: 'relationship',
            },
            name: {
              singular: 'relationship',
            },
          },
        },
      },
    },
  },
};

export default oRating;
