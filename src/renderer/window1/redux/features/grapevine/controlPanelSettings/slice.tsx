import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { oGrapevineDefaults } from 'renderer/window1/const';

export const controlPanelSettingsSlice = createSlice({
  name: 'controlPanelSettings',
  initialState: {
    attenuationFactor: oGrapevineDefaults.attenuationFactor,
    rigor: oGrapevineDefaults.rigor,
    defaultUserTrustAverageScore: oGrapevineDefaults.defaultUserTrustAverageScore,
    defaultUserTrustConfidence: oGrapevineDefaults.defaultUserTrustConfidence,
    strat1Coeff: oGrapevineDefaults.strat1Coeff,
    strat2Coeff: oGrapevineDefaults.strat2Coeff,
    strat3Coeff: oGrapevineDefaults.strat3Coeff,
    strat4Coeff: oGrapevineDefaults.strat4Coeff,
    strat5Coeff: oGrapevineDefaults.strat5Coeff,
  },
  reducers: {
    updateControlPanelSettings: (state, action) => {
      const event = action.payload;
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
  },
});

export const {
  updateControlPanelSettings,
  updateAttenuationFactor,
  updateDefaultUserTrustAverageScore,
  updateDefaultUserTrustConfidence,
  updateRigor,
  updateStrat1Coeff,
  updateStrat2Coeff,
  updateStrat3Coeff,
  updateStrat4Coeff,
  updateStrat5Coeff,
} = controlPanelSettingsSlice.actions;

export default controlPanelSettingsSlice.reducer;
