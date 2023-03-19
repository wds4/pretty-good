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
    // a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c is Darth Vader, tester profile
    curatedListProfileFocus: "a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c", // the pubkey of the user I am viewing for purposes of leaving new ratings
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
    updateCuratedListProfileFocus: (state, action) => {
      state.curatedListProfileFocus = action.payload;
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
  updateCuratedListProfileFocus,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
