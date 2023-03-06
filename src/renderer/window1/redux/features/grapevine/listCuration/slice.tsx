import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg/index';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNotesInSql } from 'renderer/window2/redux/features/nostr/notes/slice';
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
    initNostrTestnetListCurationRatings: (state, action) => {
      const aRatingsData = action.payload;
      for (let r = 0; r < aRatingsData.length; r += 1) {
        const oRatingData = aRatingsData[r];
        const { uniqueID, ratingSlug, pk_rater, event } = oRatingData;
        state.relays.ratings.notes[ratingSlug][pk_rater] = JSON.parse(event);
      }
    },
    addEndorseAsRelaysPickerNoteToReduxStore: (state, action) => {
      const event = action.payload;
      if (doesEventValidate(event)) {
        state.relays.ratings.notes.endorseAsRelaysPicker[event.pubkey] = event;
      }
    },
    addEndorseAsRelaysPickerHunterNoteToReduxStore: (state, action) => {
      const event = action.payload;
      if (doesEventValidate(event)) {
        state.relays.ratings.notes.endorseAsRelaysPickerHunter[event.pubkey] = event;
      }
    },
  },
});

export const {
  initNostrTestnetListCurationRatings,
  addEndorseAsRelaysPickerNoteToReduxStore,
  addEndorseAsRelaysPickerHunterNoteToReduxStore,
} = listCurationSlice.actions;

export default listCurationSlice.reducer;
