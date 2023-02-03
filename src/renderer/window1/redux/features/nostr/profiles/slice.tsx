import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';

export const nostrProfilesSlice = createSlice({
  name: 'nostrProfiles',
  initialState: {
    nostrProfiles: {}, // profile pubkey as id
  },
  reducers: {
    updateNostrProfiles: (state, action) => {
      if (doesEventValidate(action.payload)) {
        // payload should be an event of kind 0 and should be the most uptodate version for that profile
        const { pubkey } = action.payload;
        state.nostrProfiles[pubkey] = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  updateNostrProfiles,
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
