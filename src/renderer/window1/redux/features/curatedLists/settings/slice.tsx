import { createSlice } from '@reduxjs/toolkit';

export const curatedListsSettingsSlice = createSlice({
  name: 'curatedListsSettings',
  initialState: {
    viewListsLoadStoredData: false,
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
