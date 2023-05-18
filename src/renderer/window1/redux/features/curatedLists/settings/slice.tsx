import { createSlice } from '@reduxjs/toolkit';

export const curatedListsSettingsSlice = createSlice({
  name: 'curatedListsSettings',
  initialState: {
    viewListsLoadStoredData: false,
    activateCuratedListsBackgroundListener: true, // activates curated lists listener (all relevant notes) in curatedLists masthead
    // note: curated lists listener is active on the profile page, independently of this state
  },
  reducers: {
    updateViewListsLoadStoredData: (state, action) => {
      state.viewListsLoadStoredData = action.payload;
    },
    updateBackgroundListener: (state, action) => {
      if (action.payload == "true") {
        state.activateCuratedListsBackgroundListener = true;
      }
      if (action.payload == "false") {
        state.activateCuratedListsBackgroundListener = false;
      }
      state.activateCuratedListsBackgroundListener = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function

export const {
  updateViewListsLoadStoredData,
  updateBackgroundListener,
} = curatedListsSettingsSlice.actions;

export default curatedListsSettingsSlice.reducer;
