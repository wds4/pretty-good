import { createSlice } from '@reduxjs/toolkit';
import { updateNostrRelayInSql } from 'renderer/window1/lib/pg/sql';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';
import { defaultNostrGrapevineSettings } from './defaultNostrGrapevineSettings';
// which type of filter to use for main nostr feed
type MainNostrFeedFilter = 'firehose' | 'following' | 'eFollowing';
const iMNFF: MainNostrFeedFilter = 'following'; // initial choice

// algorithm to use to order posts
type MainNostrFeedOrderAlgo = 'chrono'; // for now, chronological ordering is the only algo
const iMNFOA: MainNostrFeedOrderAlgo = 'chrono'; // initial choice
type relayManagementStyle = 'manual' | 'grapevineAuto';

export const nostrGlobalStateSlice = createSlice({
  name: 'nostrGlobalState',
  initialState: {
    mainNostrFeedFilter: iMNFF,
    mainNostrFeedOrderAlgo: iMNFOA,
    nostrProfileFocus: 'initial nostrProfileFocus', // pubkey
    nostrProfiles_movedToOtherStore: {}, // profile pubkey as id
    nostrPostFocusEvent: null, // event.id; which nostr post is being expanded
    nostrEvents: {}, // use event.id as key
    nostrMainFeed: [],
    nostrBackButtonStack: [], // keeps track of back button actions
    nostrRelays: {},
    nostrRelayManagement: {
      endorseMyNostrRelays: false,
      relayManagementStyle: 'manual',
    },
    nostrGrapevineSettings: defaultNostrGrapevineSettings,
  },
  reducers: {
    updateMyRelayListEndorsementMode: (state, action) => {
      state.nostrRelayManagement.endorseMyNostrRelays = action.payload;
    },
    updateNostrGrapevineGeneralSettings: (state, action) => {
      state.nostrGrapevineSettings = { ... state.nostrGrapevineSettings, ... action.payload };
    },
    restoreDefaultNostrGrapevineSettings: (state, action) => {
      // restore default grapevine settings, except keep top level active variable unchanged
      let newSettings = structuredClone(defaultNostrGrapevineSettings);
      const isCurrentlyActive = state.nostrGrapevineSettings.active;
      newSettings.active = isCurrentlyActive;
      state.nostrGrapevineSettings = newSettings;
    },
    updateNostrGrapevineTopicalSettings: (state, action) => {
      console.log("qwerty updateNostrGrapevineTopicalSettings; action.payload: ")
      const topic = action.payload.topic;
      const oUpdate = action.payload.oUpdate;
      console.log("qwerty updateNostrGrapevineTopicalSettings; action.payload: "+JSON.stringify(action.payload,null,4))
      state.nostrGrapevineSettings[topic] = { ... state.nostrGrapevineSettings[topic], ... oUpdate[topic] };
    },
    updateMainNostrFeedFilter: (state, action) => {
      state.mainNostrFeedFilter = action.payload;
    },
    updateMainNostrFeedOrderAlgo: (state, action) => {
      state.mainNostrFeedOrderAlgo = action.payload;
    },
    updateNostrProfiles_movedToOtherStore: (state, action) => {
      if (doesEventValidate(action.payload)) {
        // payload should be an event of kind 0 and should be the most uptodate version for that profile
        const { pubkey } = action.payload;
        state.nostrProfiles_movedToOtherStore[pubkey] = action.payload;
      }
    },
    updateNostrProfileFocus: (state, action) => {
      console.log(`updateNostrProfileFocus; action.payload: ${action.payload}`);
      state.nostrProfileFocus = action.payload;
    },
    updateNostrPostFocusEvent: (state, action) => {
      state.nostrPostFocusEvent = action.payload;
    },
    updateNostrEvents: (state, action) => {
      if (doesEventValidate(action.payload)) {
        // payload should be an event of kind 0 and should be the most uptodate version for that profile
        const { id } = action.payload;
        state.nostrEvents[id] = action.payload;
      }
    },
    addToNostrBackButtonStack: (state, action) => {
      state.nostrBackButtonStack += action.payload;
    },
    initNostrRelays: (state, action) => {
      const aRelaysData = action.payload;
      const oRelaysData = {};
      for (let r = 0; r < aRelaysData.length; r += 1) {
        const oRelayData = aRelaysData[r];
        oRelaysData[oRelayData.url] = oRelayData;
      }
      state.nostrRelays = oRelaysData;
    },
    updateNostrRelay: (state, action) => {
      const oNewState = action.payload;
      const { url } = oNewState;
      if (url) {
        state.nostrRelays[url].active = oNewState.active;
      }
      // may need to change other vars (not just url) too once added, e.g. to update performance stats
      console.log(`oNewState: ${JSON.stringify(oNewState, null, 4)}`);
      console.log(`oNewState; state: ${JSON.stringify(state, null, 4)}`);
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  updateMyRelayListEndorsementMode,
  restoreDefaultNostrGrapevineSettings,
  updateNostrGrapevineGeneralSettings,
  updateNostrGrapevineTopicalSettings,
  updateMainNostrFeedFilter,
  updateMainNostrFeedOrderAlgo,
  updateNostrProfiles_movedToOtherStore,
  updateNostrProfileFocus,
  updateNostrEvents,
  updateNostrPostFocusEvent,
  addToNostrBackButtonStack,
  initNostrRelays,
  updateNostrRelay,
} = nostrGlobalStateSlice.actions;

export default nostrGlobalStateSlice.reducer;

export const updateNostrRelayStoreAndSql = (oNewState) => async (dispatch) => {
  dispatch(updateNostrRelay(oNewState));
  const result = await updateNostrRelayInSql(oNewState)
  console.log('updateNostrRelayStoreAndSql');
};
