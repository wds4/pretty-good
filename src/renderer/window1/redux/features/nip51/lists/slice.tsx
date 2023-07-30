import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

/*
kindxxxxx: {
  <eventID>: {
    event: <event in JSON>
  }
}
*/

/*
byAuthor: {
  <pubkey>: {
    kind10000: [], // array of eventIDs by this author of this kind
    kind10001: [],
    kind30000: [],
    kind30001: []
  },
}
*/
export const nip51Slice = createSlice({
  name: 'nip51',
  initialState: {
    aListEventIDs: [],
    aKind10000: [],
    aKind10001: [],
    aKind30000: [],
    aKind30001: [],
    lists: {

    },
    byAuthor: {},
  },
  reducers: {
    addList: (state, action) => {
      const event = action.payload;
      // if (doesEventValidate(event)) {
        const {id, kind, pubkey} = event;
        if (!state.aListEventIDs.includes(id)) {
          state.lists[id] = {
            event: event,
          }
          state.aListEventIDs.push(id)
          if (kind==10000) { state.aKind10000.push(id) }
          if (kind==10001) { state.aKind10001.push(id) }
          if (kind==30000) { state.aKind30000.push(id) }
          if (kind==30001) { state.aKind30001.push(id) }
          if (!state.byAuthor[pubkey]) {
            state.byAuthor[pubkey] = [id]
          }
          if (!state.byAuthor[pubkey].includes(id)) {
            state.byAuthor[pubkey].push(id);
          }
        }
      // }
    }
  }
});

// Action creators are generated for each case reducer function

export const {
  addList,
} = nip51Slice.actions;

export default nip51Slice.reducer;
