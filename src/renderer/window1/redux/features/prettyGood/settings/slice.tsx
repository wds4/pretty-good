import { createSlice } from '@reduxjs/toolkit';
// import { oDefaultDevModes } from 'main/const/nostr';

export const prettyGoodGlobalStateSlice = createSlice({
  name: 'prettyGoodGlobalState',
  initialState: {
    // devModes: JSON.parse(JSON.stringify(oDefaultDevModes)),
    numBackSteps: 1,
    currentPage: null,
    currentApp: 'prettyGood', // slug of the active app; used for color scheme of left-most navbar
    // currentApp options: prettyGood, nostr, curatedLists, conceptGraph, grapevine, eBooks, askNostr, null
    curatedListFocus: "7e92c80fb7d3fa7bec453c8b3c6db306bdde50f7eee34e76a880fe0ab770d485", // the (nostr event) id of the curated list that is being viewed on the view list page
    // NOTE: nostrProfileFocus is currently found in the nostr/settings store;
    // may consider moving all focus variables to this store (pretty good settings)
    // This is also used to keep track of the selected list in the list selector for leaving endorsements
    // on the view nostr profile pate.
    curatedListInstanceFocus: null,
    // a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c is Darth Vader, tester profile
    curatedListProfileFocus: "a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c", // the pubkey of the user I am viewing for purposes of leaving new ratings
    curatedChannelsTopicFocus: null, // event ID of topic
    curatedChannelsRelationshipFocus: null, // event ID of relationship
    curatedChannelsContentFocus: null, // event ID of piece of content (or pubkey of the user? perhaps could be either, depending on the content type?)
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
    updateCurrentApp: (state, action) => {
      state.currentApp = action.payload;
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
    updateCuratedChannelsTopicFocus: (state, action) => {
      state.curatedChannelsTopicFocus = action.payload;
    },
    updateCuratedChannelsRelationshipFocus: (state, action) => {
      state.curatedChannelsRelationshipFocus = action.payload;
    },
    updateCuratedChannelsContentFocus: (state, action) => {
      state.curatedChannelsContentFocus = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function

export const {
  // updateDevMode,
  // updateDevMode2,
  // updateDevMode3,
  updateCurrentApp,
  resetNumBackSteps,
  setTwoBackSteps,
  setCurrentPage,
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
  updateCuratedListProfileFocus,
  updateCuratedChannelsTopicFocus,
  updateCuratedChannelsRelationshipFocus,
  updateCuratedChannelsContentFocus,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
