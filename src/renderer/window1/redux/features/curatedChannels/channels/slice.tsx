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
          versionIndependent: eventID,
          byVersion: {
            <version>: eventID
          }
        }
      },
      byWordType: {
        <concept1Slug>: {
          <word1Slug>: {
            versionIndependent: eventID, use this to look up data under channels.nodes.byEventID
            byVersion: {
              <version>: eventID
            }
          }
          <word2Slug>: {
            versionIndependent: eventID, use this to look up data under channels.nodes.byEventID
            byVersion: {
              <version>: eventID
            }
          }
        }
      }
    }
  },
  // store ratings? and scores?
  grapevine: {
    byRatingTemplateSlug: {
      <ratingTemplateSlug>: {
        byRaterUniversalID: {
          <raterUniversalID>: {
            byRateeUniversalID: {
              <rateeUniversalID>: {
                ratingEventID: <ratingEventID>
              }
            }
          }
        },
        byRateeUniversalID: {
          <rateeUniversalID>: {
            byRaterUniversalID: {
              <raterUniversalID>: {
                ratingEventID: <ratingEventID>
              }
            }
          }
        }
      }
    }
  }
}
*/

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    aThreadedTapestryEventIDs: [],
    conceptGraph: {
      nodes: {
        byEventID: {

        },
        bySlug: {

        },
        byWordType: {
          nostrTopic: {}

        }
      }
    },
    grapevine: { // for words of wordType: rating
      byRatingTemplateSlug: {

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
        const event_id = event.id;
        if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
          const { pubkey, kind, created_at } = event;
          if (isValidObjString(event?.content)) {
            const oWord = JSON.parse(event.content);
            if (oWord && oWord.wordData) {
              const slug = oWord.wordData?.slug;
              const version = oWord.wordData?.version;
              const wordTypes = oWord.wordData?.wordTypes;

              if (!state.conceptGraph.nodes.byEventID.hasOwnProperty(event_id)) {
                state.conceptGraph.nodes.byEventID[event_id] = {};
              }
              state.conceptGraph.nodes.byEventID[event_id].event = event;
              state.conceptGraph.nodes.byEventID[event_id].word = oWord;

              if (slug) {
                if (!state.conceptGraph.nodes.bySlug.hasOwnProperty(slug)) {
                  state.conceptGraph.nodes.bySlug[slug] = {};
                  state.conceptGraph.nodes.bySlug[slug].versionIndependent = null;
                  state.conceptGraph.nodes.bySlug[slug].byVersion = {};
                }

                // versionIndependent
                if (state.conceptGraph.nodes.bySlug[slug].versionIndependent) {
                  const event_id_previous = state.conceptGraph.nodes.bySlug[slug].versionIndependent;
                  const event_id_current = event_id;
                  const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                  const created_at_current = state.conceptGraph.nodes.byEventID[event_id_current].event.created_at;
                  if (created_at_current > created_at_previous) {
                    state.conceptGraph.nodes.bySlug[slug].versionIndependent = event_id;
                  }
                } else {
                  state.conceptGraph.nodes.bySlug[slug].versionIndependent = event_id;
                }

                // byVersion
                if (version) {
                  // state.conceptGraph.nodes.bySlug[slug].byVersion[version] = event_id;
                  if (state.conceptGraph.nodes.bySlug[slug].byVersion[version]) {
                    // compare created_at, existing and current
                    const event_id_previous = state.conceptGraph.nodes.bySlug[slug].byVersion[version];
                    const event_id_current = event_id;
                    const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                    const created_at_current = state.conceptGraph.nodes.byEventID[event_id_current].event.created_at;
                    if (created_at_current > created_at_previous) {
                      state.conceptGraph.nodes.bySlug[slug].byVersion[version] = event_id;
                    }
                  } else {
                    state.conceptGraph.nodes.bySlug[slug].byVersion[version] = event_id;
                  }
                }
              }

              if (slug && wordTypes && (Array.isArray(wordTypes)) ) {
                for (let z=0;z<wordTypes.length;z++) {
                  const wT = wordTypes[z];

                  //////////////////////////////////////////////
                  ////// ADD RATINGS TO state.grapevine ////////
                  if (wT == "rating") {
                    const ratingTemplateSlug = oWord.ratingData.ratingTemplateData.ratingTemplateSlug;

                    const raterType = oWord.ratingData.raterData.raterType;
                    let raterUniversalID = "";
                    if (raterType=="nostrProfile") {
                      raterUniversalID = oWord.ratingData.raterData.nostrProfileData.pubkey;
                    }

                    const rateeType = oWord.ratingData.rateeData.rateeType;
                    let rateeUniversalID = "";
                    if (rateeType=="nostrCuratedListInstance") {
                      rateeUniversalID = oWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
                    }
                    if (rateeType=="relationship") {
                      rateeUniversalID = oWord.ratingData.rateeData.relationshipData.eventID;
                    }
                    if (ratingTemplateSlug && raterUniversalID && rateeUniversalID) {
                      if (!state.grapevine.byRatingTemplateSlug[ratingTemplateSlug]) {
                        state.grapevine.byRatingTemplateSlug[ratingTemplateSlug] = {
                          byRaterUniversalID: {},
                          byRateeUniversalID: {}
                        }
                      }
                      // byRatingTemplateSlug, byRaterUniversalID
                      if (!state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID]) {
                        state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID] = {
                          byRateeUniversalID: {}
                        }
                      }
                      // check if one already exists; if so, compare created_at
                      if (state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID].byRateeUniversalID[rateeUniversalID]) {
                        const event_id_previous = state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID].byRateeUniversalID[rateeUniversalID].ratingEventID;
                        const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                        if (created_at > created_at_previous) {
                          state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID].byRateeUniversalID[rateeUniversalID] = {
                            ratingEventID: event_id
                          }
                        }
                      } else {
                        state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID[raterUniversalID].byRateeUniversalID[rateeUniversalID] = {
                          ratingEventID: event_id
                        }
                      }

                      // byRatingTemplateSlug, byRateeUniversalID
                      if (!state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID]) {
                        state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID] = {
                          byRaterUniversalID: {}
                        }
                      }
                      // check if one already exists; if so, compare created_at
                      if (state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID].byRaterUniversalID[raterUniversalID]) {
                        const event_id_previous = state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID].byRaterUniversalID[raterUniversalID].ratingEventID;
                        const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                        if (created_at > created_at_previous) {
                          state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID].byRaterUniversalID[raterUniversalID] = {
                            ratingEventID: event_id
                          }
                        }
                      } else {
                        state.grapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID[rateeUniversalID].byRaterUniversalID[raterUniversalID] = {
                          ratingEventID: event_id
                        }
                      }
                    }

                  }
                  ////// end ADD RATINGS TO state.grapevine ////////
                  //////////////////////////////////////////////

                  if (!state.conceptGraph.nodes.byWordType[wT]) {
                    state.conceptGraph.nodes.byWordType[wT] = {};
                  }
                  if (!state.conceptGraph.nodes.byWordType[wT][slug]) {
                    state.conceptGraph.nodes.byWordType[wT][slug] = {};
                    state.conceptGraph.nodes.byWordType[wT][slug].versionIndependent = null;
                    state.conceptGraph.nodes.byWordType[wT][slug].byVersion = {};
                  }

                  // versionIndependent
                  if (state.conceptGraph.nodes.byWordType[wT][slug].versionIndependent) {
                    const event_id_previous = state.conceptGraph.nodes.byWordType[wT][slug].versionIndependent;
                    const event_id_current = event_id;
                    const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                    const created_at_current = state.conceptGraph.nodes.byEventID[event_id_current].event.created_at;
                    if (created_at_current > created_at_previous) {
                      state.conceptGraph.nodes.byWordType[wT][slug].versionIndependent = event_id;
                    }
                  } else {
                    state.conceptGraph.nodes.byWordType[wT][slug].versionIndependent = event_id;
                  }

                  // byVersion
                  if (version) {
                    if (state.conceptGraph.nodes.byWordType[wT][slug].byVersion[version]) {
                      const event_id_previous = state.conceptGraph.nodes.byWordType[wT][slug].byVersion[version];
                      const event_id_current = event_id;
                      const created_at_previous = state.conceptGraph.nodes.byEventID[event_id_previous].event.created_at;
                      const created_at_current = state.conceptGraph.nodes.byEventID[event_id_current].event.created_at;
                      if (created_at_current > created_at_previous) {
                        state.conceptGraph.nodes.byWordType[wT][slug].byVersion[version] = event_id;
                      }
                    } else {
                      state.conceptGraph.nodes.byWordType[wT][slug].byVersion[version] = event_id;
                    }
                  }
                }
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
