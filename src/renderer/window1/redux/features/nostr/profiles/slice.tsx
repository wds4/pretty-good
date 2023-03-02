import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateThisProfileInSql, updateThisKind3EventProfileInSql } from 'renderer/window1/lib/pg/sql';

/*
kind 0: regular profile info
kind 3: relays (in content) and following (in tags)

nostrProfiles: {
  <pubkey>: <most recent kind0 event>
}
kind3NostrProfiles: {
  <pubkey>: <most recent kind3 event>
}
*/

export const nostrProfilesSlice = createSlice({
  name: 'nostrProfiles',
  initialState: {
    nostrProfiles: {}, // profile pubkey as id
    kind3NostrProfiles: {}, // profile pubkey as id
  },
  reducers: {
    updateNostrProfiles: (state, action) => {
      if (doesEventValidate(action.payload)) {
        const event = action.payload;
        // payload should be an event of kind 0 and should be the most uptodate version for that profile
        if (event.kind == 0) {
          const { pubkey } = action.payload;
          state.nostrProfiles[pubkey] = action.payload;
          updateThisProfileInSql(action.payload)
        }
      }
    },
    updateNostrProfileKind3Event: (state, action) => {
      if (doesEventValidate(action.payload)) {
        // payload should be an event of kind 3 and should be the most uptodate version for that profile
        const event = action.payload;
        if (event.kind == 3) {
          const { pubkey } = action.payload;
          state.kind3NostrProfiles[pubkey] = action.payload;
          console.log("updateNostrProfileKind3Event; pubkey: "+pubkey)
          updateThisKind3EventProfileInSql(action.payload)
        }
      }
    },
    initNostrProfiles: (state, action) => {
      const aProfilesData = action.payload;
      const oProfileData = {};
      for (let r = 0; r < aProfilesData.length; r += 1) {
        const oProfileData = aProfilesData[r];
        const { event, kind3Event, pubkey } = oProfileData;
        state.nostrProfiles[pubkey] = JSON.parse(event);
        state.kind3NostrProfiles[pubkey] = JSON.parse(kind3Event);
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  updateNostrProfiles,
  updateNostrProfileKind3Event,
  initNostrProfiles,
} = nostrProfilesSlice.actions;

export default nostrProfilesSlice.reducer;

export const loadProfilesFromSqlToStore = (oNewState) => async (dispatch) => {
  // dispatch(updateNostrRelay(oNewState));
  // const result = await updateNostrRelayInSql(oNewState)
  console.log('loadProfilesFromSql');
};

export const updateProfilesInSqlFromStore = (oNewState) => async (dispatch) => {
  console.log('updateProfilesInSql');
};
