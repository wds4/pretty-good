import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNip51ListToSql } from 'renderer/window1/lib/pg/sql';

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
      // already validated; no need to repeat
      // if (doesEventValidate(event)) {
      const {id, kind, pubkey} = event;
      const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
      let listName = "";
      if (aTags_d.length > 0) {
        listName = aTags_d[0][1];
      }
      // repeat check for duplicates?
      // if (!state.aListEventIDs.includes(id)) {
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
      // }
      // }
    }
  }
});

// Action creators are generated for each case reducer function

export const {
  addList,
} = nip51Slice.actions;

export default nip51Slice.reducer;

export const addNip51ListToSqlAndReduxStore =
  (event) => async (dispatch) => {
    // maybe add check that event has not already been added; unless already done
    if (doesEventValidate(event)) {
      const {id, kind, pubkey} = event;
      const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
      let listName = "";
      if (aTags_d.length > 0) {
        listName = aTags_d[0][1];
      }
      dispatch(addList({ event }));
      addNip51ListToSql(event)
    }
  };
