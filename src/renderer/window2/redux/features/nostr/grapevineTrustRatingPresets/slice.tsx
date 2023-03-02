import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';

export const nostrGrapevineTrustRatingPresetsSlice = createSlice({
  name: 'nostrGrapevineTrustRatingPresets',
  initialState: {
    presets: {
      nostr_up: {
        ratingTemplateData: {
          ratingTemplateName: 'grapevine nostr user trust',
          ratingTemplateIPNS: null,
          ratingTemplateWordSlug: 'grapevineNostrUserTrust',
          ratingTemplateTitle: 'Grapevine Nostr User Trust', // or "Trust to Manage Nostr Relays"?
        },
        ratingFieldsetData: {
          confidenceFieldsetData: {
            confidence: '80'
          },
          trustFieldsetData: {
            trustRating: 100,
            referenceTrustRating: 100,
            referenceData: {
              referenceEntityType: 'nostrUser',
              nostrUserData: {
                pubkey_hex: null,
                pubkey_bech32: null,
                display_name: null,
                name: null,
              },
            },
            contextData: {
              transitivity: true,
              influenceCategoryData: {
                influenceCategoryName: 'nostr relay management',
                influenceCategoryIPNS: null,
                influenceCategoryWordSlug:
                  'influenceType_nostrRelayManagement_8teh9x',
                influenceCategoryTitle: 'Nostr Relay Management',
              },
              topicData: {
                topicName: 'all types of relays',
                topicIPNS: null,
                topicWordSlug:
                  'contextStructuredData_context_allTypesOfRelays_sei24k',
                topicTitle: 'All Relay Types',
              },
              contextGraphData: {
                contextGraphName: 'nostr relay management',
                contextGraphIPNS: null,
                contextGraphWordSlug:
                  'contextGraph_nostrRelayManagement_8xr5k8',
                contextGraphWordTitle: 'Nostr Relay Management',
              },
            },
          },
        },
      },
      nostr_down: {
        ratingTemplateData: {
          ratingTemplateName: 'grapevine nostr user trust',
          ratingTemplateIPNS: null,
          ratingTemplateWordSlug: 'grapevineNostrUserTrust',
          ratingTemplateTitle: 'Grapevine Nostr User Trust', // or "Trust to Manage Nostr Relays"?
        },
        ratingFieldsetData: {
          confidenceFieldsetData: {
            confidence: '80'
          },
          trustFieldsetData: {
            trustRating: 0,
            referenceTrustRating: 100,
            referenceData: {
              referenceEntityType: 'nostrUser',
              nostrUserData: {
                pubkey_hex: null,
                pubkey_bech32: null,
                display_name: null,
                name: null,
              },
            },
            contextData: {
              transitivity: true,
              influenceCategoryData: {
                influenceCategoryName: 'nostr relay management',
                influenceCategoryIPNS: null,
                influenceCategoryWordSlug:
                  'influenceType_nostrRelayManagement_8teh9x',
                influenceCategoryTitle: 'Nostr Relay Management',
              },
              topicData: {
                topicName: 'all types of relays',
                topicIPNS: null,
                topicWordSlug:
                  'contextStructuredData_context_allTypesOfRelays_sei24k',
                topicTitle: 'All Relay Types',
              },
              contextGraphData: {
                contextGraphName: 'nostr relay management',
                contextGraphIPNS: null,
                contextGraphWordSlug:
                  'contextGraph_nostrRelayManagement_8xr5k8',
                contextGraphWordTitle: 'Nostr Relay Management',
              },
            },
          },
        },
      },
    }, // profile pubkey as id
  },
  reducers: {
    updatePresets: (state, action) => {
      if (doesEventValidate(action.payload)) {
        // payload should be an event of kind 0 and should be the most uptodate version for that profile
        const { pubkey } = action.payload;
        state.nostrGrapevineTrustRatingPresets[pubkey] = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const { updatePresets } = nostrGrapevineTrustRatingPresetsSlice.actions;

export default nostrGrapevineTrustRatingPresetsSlice.reducer;
