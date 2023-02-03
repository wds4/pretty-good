import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';

export const nostrDirectMessagesSlice = createSlice({
  name: 'nostrDirectMessages',
  initialState: {
    directMessages: {}, // arrange by id ?
  },
  reducers: {
    addDirectMessage: (state, action) => {
      state.directMessages += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  addDirectMessage,
} = nostrDirectMessagesSlice.actions;

export default nostrDirectMessagesSlice.reducer;

export const loadDirectMessagesFromSql = (oNewState) => async (dispatch) => {
  // dispatch(updateNostrRelay(oNewState));
  // const result = await updateNostrRelayInSql(oNewState)
  console.log('loadDirectMessagesFromSql');
};

export const updateDirectMessagesInSql = (oNewState) => async (dispatch) => {
  console.log('updateDirectMessagesInSql');
};

export const returnAllDirectMessagesWithProfile = (pubkey) => async (dispatch) => {
  console.log('returnAllDirectMessagesWithProfile');
};
