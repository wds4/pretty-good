import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

/*
<list being curated, e.g. relays>: {},
relays: {
  ratings: {
    notes: { // each pubkey has at most one note which is a list of all endorsements
      endorseAsRelaysPicker: {
        <pubkey>: <event>,
      },
      endorseAsRelaysPickerHunter: {
        <pubkey>: <event>,
      }
    },
    authors: { // redundant info - may not need to maintain this
      <pk_author>: [ <event1 id>, <event2 id>, ... ]
    }
  },
  compositeScores: {
    relaysPicker: {
      <pk>: {

      }
    },
    relaysPickerHunter: {
      <pk>: {

      }
    },
    relayList: {
      <pk>: {

      }
    },
  },
}
*/

export const listCurationSlice = createSlice({
  name: 'listCuration',
  initialState: {
    relays: {
      ratings: {
        notes: {
          endorseAsRelaysPicker: {},
          endorseAsRelaysPickerHunter: {},
        },
      },
      compositeScores: {},
    },
  },
  reducers: {
    initNotesFromSql: (state, action) => {
      // not yet implemented; will populate relays.ratings.notes upon startup from sql
    },
    addEndorseAsRelaysPickerNoteToReduxStore: (state, action) => {
      const event = action.payload;
      state.relays.ratings.notes.endorseAsRelaysPicker[event.pubkey] = event;
    },
    addEndorseAsRelaysPickerHunterNoteToReduxStore: (state, action) => {
      const event = action.payload;
      state.relays.ratings.notes.endorseAsRelaysPickerHunter[event.pubkey] = event;
    },
  },
});

export const {
  initNotesFromSql,
  addEndorseAsRelaysPickerNoteToReduxStore,
  addEndorseAsRelaysPickerHunterNoteToReduxStore,
} = listCurationSlice.actions;

export default listCurationSlice.reducer;
