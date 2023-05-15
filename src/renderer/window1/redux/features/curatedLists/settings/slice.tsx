import { createSlice } from '@reduxjs/toolkit';

export const curatedListsSettingsSlice = createSlice({
  name: 'curatedListsSettings',
  initialState: {
    viewListsLoadStoredData: false,
    activateCuratedListsBackgroundListener: false, // activates curated lists listener (all relevant notes) in curatedLists masthead
    // note: curated lists listener is active on the profile page, independently of this state
  },
  reducers: {
    updateViewListsLoadStoredData: (state, action) => {
      state.viewListsLoadStoredData = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function

export const {
  updateViewListsLoadStoredData,
} = curatedListsSettingsSlice.actions;

export default curatedListsSettingsSlice.reducer;
