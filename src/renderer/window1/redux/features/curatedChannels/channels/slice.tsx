import { createSlice } from '@reduxjs/toolkit';
import { removeStringFromArray, isValidObj, isValidObjString } from 'renderer/window1/lib/pg';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {

} from 'renderer/window1/lib/pg/sql';

/*
sql tables, adapted from Plex:
myConcepGraphs (not yet implemented, but first table witll be myConceptGraph_channels)
- id
- slug
- name
- title
- tableName e.g.: myConceptGraph_channels
- mainSchema_slug
- description
myConceptGraph_channels
- id (unique)
- slug (=wordData.slug)
- version (=wordData.version)
- mostRecentSlug (boolean: true if it's the most recent for this slug)
- mostRecentSlugAndVersion (boolean: true if it's the most recent for this slug and this version)
- event
- word
- eventID (unique)
- stewardPubkey
- wordTypes
- ipns
- ipfs

// may skip dictionaries.
myDictionaries
myDictionary_channels
*/

/*
channels: {
  conceptGraph: {
    nodes: {
      byEventID: {
        <eventID>: {
          event: <event in object form>
          word: <word in object form>
        }
      },
      bySlug: {
        <slug>: {
          noVersion: eventID,
          byVersion: {
            <version>: eventID
          }
        }
      },
      byConcept: {
        <concept1Slug>: {
          <word1Slug>: eventID, use this to look up data under channels.nodes.byEventID
          <word2Slug>: eventID,
          ...
        }
      }
    }
  },
  // store ratings? and scores?
  grapevine: {

  }
}
*/

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    aThreadedTapestryEventIDs: [],
    nodes: {
      byEventID: {

      },
      bySlug: {

      }
    }
  },
  reducers: {
    initChannels: (state, action) => {
      const foo = action.payload;
    },
    addThreadedTapestryEvent: (state, action) => {
      const event = action.payload;
      if (doesEventValidate(event)) {
        // console.log("qwerty addThreadedTapestryEvent B")
        const event_id = event.id;
        if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
          const { pubkey } = event;
          const kind = event.kind;
          if (isValidObjString(event?.content)) {
            const oWord = JSON.parse(event.content);
            if (oWord && oWord.wordData) {
              const slug = oWord.wordData?.slug;
              const version = oWord.wordData?.version;

              state.nodes.byEventID.[event_id].event = event;
              state.nodes.byEventID.[event_id].word = oWord;
              if (slug) {
                if (!state.nodes.bySlug) {
                  state.nodes.bySlug[slug] = {};
                }

                if (version) {
                  // TO DO: if one already exists, check created_at and keep the most recent
                  state.nodes.bySlug[slug].byVersion[version] = event_id;
                }

                // TO DO: fugure out what to put for noVersion when there are multiple choices
                // probably check the created_at and keep the most recent
                // maybe change noVersion to something like versionIndependent
                state.nodes.bySlug[slug].noVersion = event_id;
              }
            }
          }
          if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
            state.aThreadedTapestryEventIDs.push(event_id);
          }
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  initChannels,
  addThreadedTapestryEvent,
} = channelsSlice.actions;

export default channelsSlice.reducer;
