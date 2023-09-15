import { createSlice } from '@reduxjs/toolkit';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNip51ListToSql } from 'renderer/window1/lib/pg/sql';

/*
kindxxxxx: {
  <eventID>: {
    event: <event in JSON>
  }
}
// kindxxxxx may be deprecated ... ?
*/

/*
lists: {
  <event id>: {
    event: <event as an object>
  }
}
byAuthor: {
  <pubkey>: {
    aEventIDs: [], // array of eventIDs by this author of this kind
    byListName: {
      <List Name>: <list event ID>
    },
  },
}
naddrLookup: {
  <naddr info as a string, pulled from the tag>: <event ID of list>,
  "30000:460c25e682fda7832b52d1f22d3d22b3176d972f60dcdc3212ed8c92ef85065c:Nostr Devs": <event ID of list>
}
// then go to lists to look up the event using the event id
*/
const oInitialState = {
  aListEventIDs: [],
  aKind10000: [],
  aKind10001: [],
  aKind30000: [],
  aKind30001: [],
  lists: {},
  byAuthor: {},
  naddrLookup: {},
}
export const nip51Slice = createSlice({
  name: 'nip51',
  initialState: oInitialState,
  reducers: {
    clearAllNip51Lists: (state, action) => {
      // const foo = action.payload;
      // console.log("qwerty clearAllNip51Lists")
      // state = oInitialState;
      state.aListEventIDs = [];
      state.aKind10000 = [];
      state.aKind10001 = [];
      state.aKind30000 = [];
      state.aKind30001 = [];
      state.lists = {};
      state.byAuthor = {};
      state.naddrLookup = {};
    },
    initNip51Lists: (state, action) => {
      const aNip51ListsData = action.payload;
      for (let x=0;x<aNip51ListsData.length;x++) {
        const oNip51ListData = aNip51ListsData[x];
        const event = JSON.parse(oNip51ListData.event);

        // if (doesEventValidate(event)) {
        const { id, kind, pubkey } = event;
        const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
        let listName = '';
        if (aTags_d.length > 0) {
          listName = aTags_d[0][1];
        }
        // repeat check for duplicates?
        // if (!state.aListEventIDs.includes(id)) {
        state.lists[id] = {
          event,
        };
        if (listName) {
          const naddrString = kind+":"+pubkey+":"+listName;
          state.naddrLookup[naddrString] = id;
        }

        if (!state.aListEventIDs.includes(id)) { state.aListEventIDs.push(id); }
        if (kind == 10000) {
          if (!state.aKind10000.includes(id)) { state.aKind10000.push(id); }
        }
        if (kind == 10001) {
          if (!state.aKind10001.includes(id)) { state.aKind10001.push(id); }
        }
        if (kind == 30000) {
          if (!state.aKind30000.includes(id)) { state.aKind30000.push(id); }
        }
        if (kind == 30001) {
          if (!state.aKind30001.includes(id)) { state.aKind30001.push(id); }
        }
        if (!state.byAuthor[pubkey]) {
          state.byAuthor[pubkey] = {};
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
    },
    addList: (state, action) => {
      const event = action.payload;
      // already validated; no need to repeat
      // if (doesEventValidate(event)) {
      const { id, kind, pubkey } = event;
      if (!state.aListEventIDs.includes(id)) {
        const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
        let listName = '';
        if (aTags_d.length > 0) {
          listName = aTags_d[0][1];
        }
        // repeat check for duplicates?
        // add to state.naddrLookup
        const naddrString = kind+":"+pubkey+":"+listName;

        if (listName) {
          // remove id from redux if this is an update of a preexisting list
          if (state.naddrLookup[naddrString]) {

            const oldEventID = state.naddrLookup[naddrString];
            // remove oldEventID from state.lists
            delete state.lists[oldEventID];
            // remove oldEventID from arrays: aListEventIDs, etc
            const index1 = state.aListEventIDs.indexOf(oldEventID);
            state.aListEventIDs.splice(index1, 1);
            /*
            if (kind == 10000) {
              const index2 = state.aKind10000.indexOf(oldEventID);
              state.aKind10000.splice(index2, 1);
            }
            if (kind == 10001) {
              const index2 = state.aKind10001.indexOf(oldEventID);
              state.aKind10001.splice(index2, 1);
            }
            if (kind == 30000) {
              const index2 = state.aKind30000.indexOf(oldEventID);
              state.aKind30000.splice(index2, 1);
            }
            if (kind == 30001) {
              const index2 = state.aKind30001.indexOf(oldEventID);
              state.aKind30001.splice(index2, 1);
            }
            // remove from the array state.byAuthor[pubkey].aEventIDs
            const index3 = state.byAuthor[pubkey].aEventIDs.indexOf(oldEventID);
            state.byAuthor[pubkey].aEventIDs.splice(index3, 1);
            // no need to remove from state.byAuthor[pubkey].byListName because it will be overwritten
            */
          }
        }

        state.naddrLookup[naddrString] = id;
        // if (!state.aListEventIDs.includes(id)) {
        state.lists[id] = {
          event,
        };
        state.aListEventIDs.push(id);
        if (kind == 10000) {
          state.aKind10000.push(id);
        }
        if (kind == 10001) {
          state.aKind10001.push(id);
        }
        if (kind == 30000) {
          state.aKind30000.push(id);
        }
        if (kind == 30001) {
          state.aKind30001.push(id);
        }
        if (!state.byAuthor[pubkey]) {
          state.byAuthor[pubkey] = {};
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
    },
  },
});

// Action creators are generated for each case reducer function

export const { clearAllNip51Lists, initNip51Lists, addList } = nip51Slice.actions;

export default nip51Slice.reducer;

export const addNip51ListToSqlAndReduxStore = (event) => async (dispatch) => {
  // maybe add check that event has not already been added; unless already done
  if (doesEventValidate(event)) {
    const { id, kind, pubkey } = event;
    const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
    let listName = '';
    if (aTags_d.length > 0) {
      listName = aTags_d[0][1];
    }
    // console.log(`addNip51ListToSqlAndReduxStore; id: ${id}`);
    dispatch(addList(event));
    addNip51ListToSql(event);
  }
};
