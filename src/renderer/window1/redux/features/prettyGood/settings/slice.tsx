import { createSlice } from '@reduxjs/toolkit';

export const prettyGoodGlobalStateSlice = createSlice({
  name: 'prettyGoodGlobalState',
  initialState: {
    devMode: false,
    numBackSteps: 1,
    currentPage: null,
    curatedListFocus: null, // the (nostr event) id of the curated list that is being viewed on the view list page
    // NOTE: nostrProfileFocus is currently found in the nostr/settings store;
    // may consider moving all focus variables to this store (pretty good settings)
    curatedListInstanceFocus: null,
  },
  reducers: {
    updateDevMode: (state, action) => {
      state.devMode = action.payload;
    },
    resetNumBackSteps: (state) => {
      state.numBackSteps = 1;
    },
    setTwoBackSteps: (state) => {
      state.numBackSteps = 2;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateCuratedListFocus: (state, action) => {
      state.curatedListFocus = action.payload;
    },
    updateCuratedListInstanceFocus: (state, action) => {
      state.curatedListInstanceFocus = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function

export const {
  updateDevMode,
  resetNumBackSteps,
  setTwoBackSteps,
  setCurrentPage,
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
