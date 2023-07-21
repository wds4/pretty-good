import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { oGrapevineDefaults } from 'renderer/window1/const';

export const controlPanelSettingsSlice = createSlice({
  name: 'controlPanelSettings',
  initialState: {
    seedUser: oGrapevineDefaults.seedUser,
    attenuationFactor: oGrapevineDefaults.attenuationFactor,
    rigor: oGrapevineDefaults.rigor,
    defaultUserTrustAverageScore: oGrapevineDefaults.defaultUserTrustAverageScore,
    defaultUserTrustConfidence: oGrapevineDefaults.defaultUserTrustConfidence,
    defaultInstanceBaselineAverageScore: oGrapevineDefaults.defaultInstanceBaselineAverageScore,
    defaultInstanceBaselineConfidence: oGrapevineDefaults.defaultInstanceBaselineConfidence,
    strat1Coeff: oGrapevineDefaults.strat1Coeff,
    strat2Coeff: oGrapevineDefaults.strat2Coeff,
    strat3Coeff: oGrapevineDefaults.strat3Coeff,
    strat4Coeff: oGrapevineDefaults.strat4Coeff,
    strat5Coeff: oGrapevineDefaults.strat5Coeff,
    selectedPubkeyForShowingTrustCalculations: "e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f",
    selectedInstanceIDForShowingCompScoreCalculations: null,
    entityTypeForShowingCalculations: "nostrProfile", // options: nostrProfile, curatedListInstance
    nostrProfileDisplaySize: 'influence', // influence, average, or nothing
    curatedListInstanceYAxis: 'average', // influence, average, or nothing
    contentTopic: null, // event ID of the topic for which content is being selected
  },
  reducers: {
    updateControlPanelSettings: (state, action) => {
      const event = action.payload;
      // incomplete (may deprecate?)
    },
    updateSeedUser: (state, action) => {
      state.seedUser = action.payload; // should be a pubkey (hex)
    },
    updateAttenuationFactor: (state, action) => {
      state.attenuationFactor = action.payload;
    },
    updateDefaultUserTrustAverageScore: (state, action) => {
      state.defaultUserTrustAverageScore = action.payload;
    },
    updateDefaultUserTrustConfidence: (state, action) => {
      state.defaultUserTrustConfidence = action.payload;
    },
    updateDefaultInstanceBaselineAverageScore: (state, action) => {
      state.defaultInstanceBaselineAverageScore = action.payload;
    },
    updateDefaultInstanceBaselineConfidence: (state, action) => {
      state.defaultInstanceBaselineConfidence = action.payload;
    },
    updateRigor: (state, action) => {
      state.rigor = action.payload;
    },
    updateStrat1Coeff: (state, action) => {
      state.strat1Coeff = action.payload;
    },
    updateStrat2Coeff: (state, action) => {
      state.strat2Coeff = action.payload;
    },
    updateStrat3Coeff: (state, action) => {
      state.strat3Coeff = action.payload;
    },
    updateStrat4Coeff: (state, action) => {
      state.strat4Coeff = action.payload;
    },
    updateStrat5Coeff: (state, action) => {
      state.strat5Coeff = action.payload;
    },
    updateSelectedPubkeyForShowingTrustCalculations: (state, action) => {
      state.selectedPubkeyForShowingTrustCalculations = action.payload;
    },
    updateSelectedInstanceIDForShowingCompScoreCalculations: (state, action) => {
      state.selectedInstanceIDForShowingCompScoreCalculations = action.payload;
    },
    updateEntityTypeForShowingCalculations: (state, action) => {
      state.entityTypeForShowingCalculations = action.payload;
    },
    updateNostrProfileDisplaySize: (state, action) => {
      state.nostrProfileDisplaySize = action.payload;
    },
    updateCuratedListInstanceYAxis: (state, action) => {
      state.curatedListInstanceYAxis = action.payload;
    },
    updateContentTopic: (state, action) => {
      state.contentTopic = action.payload; // should be event ID of topic
    },
  },
});

export const {
  updateControlPanelSettings,
  updateSeedUser,
  updateAttenuationFactor,
  updateDefaultUserTrustAverageScore,
  updateDefaultUserTrustConfidence,
  updateDefaultInstanceBaselineAverageScore,
  updateDefaultInstanceBaselineConfidence,
  updateRigor,
  updateStrat1Coeff,
  updateStrat2Coeff,
  updateStrat3Coeff,
  updateStrat4Coeff,
  updateStrat5Coeff,
  updateSelectedPubkeyForShowingTrustCalculations,
  updateSelectedInstanceIDForShowingCompScoreCalculations,
  updateEntityTypeForShowingCalculations,
  updateNostrProfileDisplaySize,
  updateCuratedListInstanceYAxis,
  updateContentTopic,
} = controlPanelSettingsSlice.actions;

export default controlPanelSettingsSlice.reducer;
