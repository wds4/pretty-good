import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from '../../../../lib/nostr/eventValidation';

/*
directMessages: {
  <pk_author>: {
    <pk_recipient>: {
      <event id>: {
        event: <event>,
        viewed: false,
      }
    }
  }
}
*/
export const nostrDirectMessagesSlice = createSlice({
  name: 'nostrDirectMessages',
  initialState: {
    directMessages: {}, // arrange by id ?
  },
  reducers: {
    addDirectMessage: (state, action) => {
      const myPubkey = action.payload.myPubkey;
      const event = action.payload.event;
      console.log("qwerty addDirectMessage; myPubkey: "+myPubkey)
      const id = event.id;
      const pk_author = event.pubkey;
      const pk_recipient = event.tags.find(
        ([k, v]) => k === 'p' && v && v !== ''
      )[1];
      if (!state.directMessages.hasOwnProperty(pk_author)) {
        state.directMessages[pk_author] = {};
      }
      if (!state.directMessages[pk_author].hasOwnProperty(pk_recipient)) {
        state.directMessages[pk_author][pk_recipient] = {};
      }
      state.directMessages[pk_author][pk_recipient].event = event;
      state.directMessages[pk_author][pk_recipient].viewed = false;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  addDirectMessage,
} = nostrDirectMessagesSlice.actions;

export default nostrDirectMessagesSlice.reducer;

export const addDirectMessageToSqlAndReduxStore = (event, myPubkey) => async (dispatch) => {
  console.log("qwerty addDirectMessageToSqlAndReduxStore; myPubkey: "+myPubkey)
  // maybe add check that event has not already been added
  if (doesEventValidate(event)) {
    dispatch(addDirectMessage({event,myPubkey}));
    // const result = await addDirectMessageToSql(event)
  }
};

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
