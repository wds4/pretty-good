import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

/*
notes: {
  <pk_author>: {
    <event id>: {
      event: <event>,
      viewed: false,
    }
  }
}
*/

export const nostrNotesSlice = createSlice({
  name: 'nostrNotes',
  initialState: {
    notes: {},
  },
  reducers: {
    initNostrNotes: (state, action) => {
      const aNostrNotesData = action.payload;
      for (let x=0;x<aNostrNotesData.length;x++) {
        const oNoteData = aNostrNotesData[x];
        const event = JSON.parse(oNoteData.event);
        if (doesEventValidate(event)) {
          const { id } = event;
          const pk_author = event.pubkey;
          if (!state.notes.hasOwnProperty(pk_author)) {
            state.notes[pk_author] = {};
          }
          if (!state.notes[pk_author].hasOwnProperty(id)) {
            state.notes[pk_author][id] = {};
            state.notes[pk_author][id].event = event;
            state.notes[pk_author][id].viewed = false;
          }
        }
      }
    },
    addNote: (state, action) => {
      const event = action.payload;
      if (doesEventValidate(event)) {
        const { id } = event;
        const pk_author = event.pubkey;
        if (!state.notes.hasOwnProperty(pk_author)) {
          state.notes[pk_author] = {};
        }
        if (!state.notes[pk_author].hasOwnProperty(id)) {
          state.notes[pk_author][id] = {};
          state.notes[pk_author][id].event = event;
          state.notes[pk_author][id].viewed = false;
        }
      }
    },
  },
});

export const { initNostrNotes, addNote } = nostrNotesSlice.actions;

export default nostrNotesSlice.reducer;

export const fetchNotesFromAlice = (pk_alice) => {
  let oMessages = {};
  try {
    oMessages = useSelector((state) => state.nostrDirectMessages.directMessages[pk_alice][pk_bob]);
  } catch (err) {}
  if (!oMessages) { oMessages = {};}
  const aMessages = Object.keys(oMessages);
  console.log("fetchDirectMessagesFromAliceToBob; pk_alice: "+pk_alice+"; pk_bob: "+pk_bob)
  console.log("fetchDirectMessagesFromAliceToBob; num messages: "+aMessages.length);
  return oMessages; // form: oMessages[eventId] = event;
}

export const addNoteToSqlAndReduxStore =
  (event) => async (dispatch) => {
    // maybe add check that event has not already been added
    if (doesEventValidate(event)) {
      dispatch(addNote({ event }));
      // const result = await addDirectMessageToSql(event)
    }
  };

export const loadNotesFromSql = (oNewState) => async (dispatch) => {
  console.log('loadNotesFromSql');
};

export const updateNotesInSql = (oNewState) => async (dispatch) => {
  console.log('updateNotesInSql');
};

export const returnAllNotesWithProfile =
  (pubkey) => async (dispatch) => {
    console.log('returnAllNotesWithProfile');
  };
