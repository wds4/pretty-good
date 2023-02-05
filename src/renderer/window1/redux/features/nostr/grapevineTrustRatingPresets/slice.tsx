import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';

export const nostrGrapevineTrustRatingPresetsSlice = createSlice({
  name: 'nostrGrapevineTrustRatingPresets',
  initialState: {
    presets: {
      nostr_up: {
        trustRating: 100,
        referenceTrustRating: 100,
        confidence: 80,
        // rating template dictates which ratingsFieldsets to use: trust, comments, confidence.
        // but does it also dictate contexts within trustFieldsetData?
        // Proposal: the generic Grapevine Trust Rating template does not dictate the contexts,
        // but more specific rating templates can be made if desired.
        ratingTemplateData: {
          ratingTemplateTitle: "Grapevine Trust Rating" // or "Trust to Manage Nostr Relays"?
        },
        contextData: {
          transivity: true
        },
        topicData: {},
        contextGraphData: {}
      },
      nostr_down: {
        trustRating: 0,
        referenceTrustRating: 100,
      }
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

export const {
  updatePresets,
} = nostrGrapevineTrustRatingPresetsSlice.actions;

export default nostrGrapevineTrustRatingPresetsSlice.reducer;
