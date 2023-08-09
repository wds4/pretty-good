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
    aEventIDs: [], // array of eventIDs by this author of this kind
    byListName: {
      <List Name>: <list event ID>
    },
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
        const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
        let listName = "";
        if (aTags_d.length > 0) {
          listName = aTags_d[0][1];
        }
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
            state.byAuthor[pubkey] = {}
            state.byAuthor[pubkey].aEventIDs = [];
            state.byAuthor[pubkey].byListName = {};
          }
          if (!state.byAuthor[pubkey].aEventIDs.includes(id)) {
            state.byAuthor[pubkey].aEventIDs.push(id);
          }
          if (listName) {
            state.byAuthor[pubkey].byListName[listName] = id;
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
