import { createSlice } from '@reduxjs/toolkit';

export const prettyGoodGlobalStateSlice = createSlice({
  name: 'prettyGoodGlobalState',
  initialState: {
    devMode: false, // generic dev mode; may deprecate in favor of devModes 2 and 3
    devMode2: false, // reveal features that are still in alpha
    devMode3: false, // reveal "nostr nerd" toggle buttons
    numBackSteps: 1,
    currentPage: null,
    curatedListFocus: null, // the (nostr event) id of the curated list that is being viewed on the view list page
    // NOTE: nostrProfileFocus is currently found in the nostr/settings store;
    // may consider moving all focus variables to this store (pretty good settings)
    // This is also used to keep track of the selected list in the list selector for leaving endorsements
    // on the view nostr profile pate.
    curatedListInstanceFocus: null,
    // a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c is Darth Vader, tester profile
    curatedListProfileFocus: "a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c", // the pubkey of the user I am viewing for purposes of leaving new ratings
    activeChannel: 'testnet1', // mainnet | mainnet1 | mainnet2, etc | testnet | testnet1 | testnet2, etc
    channels: {
      // kind:
      // grapevine: replaceable events, so in range [ 30k, 40k )
      // concept graph: in range [ 9k, 10k )
      // MAINNETS (not sure if I will have more than one mainnet or not)
      // need to specify tags here? (or maybe not channel specific?)
      mainnet: {
        kinds: {
          grapevine: 39001,
          conceptGraph: 9001,
        },
      },
      // TESTNETS
      testnet: {
        kinds: {
          grapevine: 39901,
          conceptGraph: 9901,
        }
      },
      testnet1: {
        kinds: {
          grapevine: 39901,
          conceptGraph: 9901,
        }
      },
      testnet2: {
        kinds: {
          grapevine: 39902,
          conceptGraph: 9902,
        }
      }
    }
  },
  reducers: {
    updateDevMode: (state, action) => {
      state.devMode = action.payload;
    },
    updateDevMode2: (state, action) => {
      state.devMode2 = action.payload;
    },
    updateDevMode3: (state, action) => {
      state.devMode3 = action.payload;
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
  updateDevMode2,
  updateDevMode3,
  resetNumBackSteps,
  setTwoBackSteps,
  setCurrentPage,
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
  updateCuratedListProfileFocus,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
