import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNotesInSql } from 'renderer/window2/redux/features/nostr/notes/slice';

/*
purpose: {
  all: {
    contexts: [],
    contextRelationships: [
      ["a","b"]
    ]
  },
  attention: {},
  listCuration: {
    contexts: ["all"],
    contextRelationships: [
      ["a","b"]
    ]
  },
  relaysCuration: {
    contexts: ["all","free","paid","imageHosting"],
    contextRelationships: [
      ["free","all"],
      ["paid","all"],
      ["imageHosting","all"],
    ]
  },
  ontology: {},
  advice: {},
  belief: {},

},
scoreTypes: [
  allInfluenceTypes_allContexts
],
scores: {
  <trustScoreType>: {
    <pk>: {
      influence:
      average:
      certainty:
      input:
    }
  }
}
*/

export const compositeTrustScoresSlice = createSlice({
  name: 'compositeTrustScores',
  initialState: {
    scoreTypes: ['allPurposeTypes_allContexts', 'relaysCuration_allRelayTypes'],
    scores: {
      allPurposeTypes_allContexts: {},
      relaysCuration_allRelayTypes: {},
    },
  },
  reducers: {
    initCompositeTrustScores: (state, action) => {
      const { oMyActiveNostrProfileData, aNostrProfilesData } = action.payload;
      /*
      for (let p = 0; p < aNostrProfilesData.length; p++) {
        const pk = aNostrProfilesData[p].pubkey;
        console.log(`initCompositeTrustScores; pk: ${pk}`);
        state.scores.allPurposeTypes_allContexts[pk] = {
          influence: null,
          average: null,
          certainty: null,
          input: null,
        };
        state.scores.relaysCuration_allRelayTypes[pk] = {
          influence: null,
          average: null,
          certainty: null,
          input: null,
        };
      }
      */
    },
    addUser: (state, action) => {
      const userData = action.payload;
    },
  },
});

export const { initCompositeTrustScores, addUser } =
  compositeTrustScoresSlice.actions;

export default compositeTrustScoresSlice.reducer;
