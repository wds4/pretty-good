import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
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
      const { myPubkey } = action.payload;
      const { event } = action.payload;
      const { id } = event;
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
      state.directMessages[pk_author][pk_recipient][id] = {};
      state.directMessages[pk_author][pk_recipient][id].event = event;
      state.directMessages[pk_author][pk_recipient][id].viewed = false;
    },
  },
});

// Action creators are generated for each case reducer function

export const { addDirectMessage } = nostrDirectMessagesSlice.actions;

export default nostrDirectMessagesSlice.reducer;

export const fetchConvoProfiles = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const oDirectMessagesAuthors = useSelector(
    (state) => state.nostrDirectMessages.directMessages
  );
  let oDirectMessagesRecipients = {};
  if (oDirectMessagesAuthors.hasOwnProperty[myPubkey]) {
    oDirectMessagesRecipients = oDirectMessagesAuthors[myPubkey];
  }

  const aAuthors = Object.keys(oDirectMessagesAuthors);
  const aRecipients = Object.keys(oDirectMessagesRecipients);
  const aInteractees = removeDuplicatesFromArrayOfStrings([
    ...aAuthors,
    ...aRecipients,
  ]);
  return aInteractees;
};

export const fetchDirectMessagesFromAliceToBob = (pk_alice,pk_bob) => {
  let oMessages = [];
  try {
    oMessages = useSelector((state) => state.nostrDirectMessages.directMessages[pk_alice][pk_bob]);
  } catch (err) {}
  if (!oMessages) { oMessages = {};}
  return oMessages; // form: oMessages[eventId] = event;
}

export const addDirectMessageToSqlAndReduxStore =
  (event, myPubkey) => async (dispatch) => {
    // maybe add check that event has not already been added
    if (doesEventValidate(event)) {
      dispatch(addDirectMessage({ event, myPubkey }));
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

export const returnAllDirectMessagesWithProfile =
  (pubkey) => async (dispatch) => {
    console.log('returnAllDirectMessagesWithProfile');
  };
