import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
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

export const nostrSettingsSlice = createSlice({
  name: 'nostrSettings',
  initialState: {
    mainNostrFeedFilter: iMNFF,
    mainNostrFeedOrderAlgo: iMNFOA,
    nostrProfileFocus: 'initial nostrProfileFocus', // pubkey
    nostrProfilePanelSelector: 'about', // 'about' | 'posts' | 'grapevine' | 'ratings' | 'scores'
    nostrProfiles_movedToOtherStore: {}, // profile pubkey as id
    nostrPostFocusEvent: null, // event.id; which nostr post is being expanded
    nostrEvents: {}, // use event.id as key
    nostrMainFeed: [],
    nostrBackButtonStack: [], // keeps track of back button actions
    nostrRelays: {},
    nostrRelayStats: {},
    nostrRelayManagement: {
      endorseMyNostrRelays: false,
      relayManagementStyle: 'manual',
    },
    nostrGrapevineSettings: defaultNostrGrapevineSettings,
  },
  reducers: {
    updateNostrProfilePanelSelector: (state, action) => {
      state.nostrProfilePanelSelector = action.payload;
    },
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
      const topic = action.payload.topic;
      const oUpdate = action.payload.oUpdate;
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
    // deprecating nostrSettings.nostrEvents and updateNostrEvents; replace with nostrNotes.notes and addNote
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
      state.nostrRelays = action.payload;
      /*
      const aRelaysData = action.payload;
      const oRelaysData = {};
      for (let r = 0; r < aRelaysData.length; r += 1) {
        const oRelayData = aRelaysData[r];
        oRelaysData[oRelayData.url] = oRelayData;
      }
      state.nostrRelays = oRelaysData;
      */
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
    addNostrRelay: (state, action) => {
      const newRelayUrl = action.payload;
      const oRelayData = {};
      oRelayData.url = newRelayUrl;
      oRelayData.active = true;
      oRelayData.default_app = false;
      state.nostrRelays[newRelayUrl] = oRelayData;
    },
    removeNostrRelay: (state, action) => {
      const relayUrl = action.payload;
      delete state.nostrRelays[relayUrl];
    },
    resetNostrSettingsNostrRelays: (state, action) => {
      state.nostrRelays = action.payload;
    },
    incrementRelayDisconnectCount: (state, action) => {
      const url = action.payload;
      // state.nostrRelays.foo = "bar"
      if (!state.nostrRelayStats[url]) {
        state.nostrRelayStats[url] = {};
        state.nostrRelayStats[url].disconnects = 0;
      }
      state.nostrRelayStats[url].disconnects += 1;
      console.log(`incrementRelayDisconnectCount; url: ${url}`)
      /*
      // state.nostrRelays = action.payload;
      state.nostrRelays[url].foo = "bar";
      if (!state.nostrRelayDisconnects[url]) {
        state.nostrRelayDisconnects[url] = 1;
      } else {
        state.nostrRelayDisconnects[url] += 1;
      }
      state.nostrRelays[url].disconnects = 10;
      */
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  updateNostrProfilePanelSelector,
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
  addNostrRelay,
  removeNostrRelay,
  resetNostrSettingsNostrRelays,
  incrementRelayDisconnectCount
} = nostrSettingsSlice.actions;

export default nostrSettingsSlice.reducer;

export const ActivateNostrRelaysOfCurrentUser = () => {
  // fetch relays from the currently active nostr user
  // const myNostrProfile = useSelector((state) => state.myNostrProfile);
  // const oRelays = myNostrProfile.relays;
  // then transfer those settings to the nostr settings store, which makes them the active relay list
  // dispatch(resetNostrSettingsNostrRelays(oRelays));
  return (
    <>
      <div>ActivateNostrRelaysOfCurrentUser</div>
    </>
  )
}

export const updateNostrRelayStoreAndSql = (oNewState) => async (dispatch) => {
  dispatch(updateNostrRelay(oNewState));
  const result = await updateNostrRelayInSql(oNewState)
  console.log('updateNostrRelayStoreAndSql');
};
