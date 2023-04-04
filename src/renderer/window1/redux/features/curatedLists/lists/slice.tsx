import { createSlice } from '@reduxjs/toolkit';
import { removeStringFromArray } from 'renderer/window2/lib/pg';
import { updateAbout } from 'renderer/window2/redux/features/nostr/myNostrProfile/slice';
import { EntryOptionPlugin } from 'webpack';

/*
curatedLists: {
  <curated list event id>: {
    name: {
      singular: null,
      plural: null
    },
    description: null,
    author: <pubkey of authoer>,
    oWord: (may or may not include word here; if include, may not need name, description, author above),
    items: {
      <item event id>: {
        name: null,
        description: null,
        author: <pubkey of author>,
        oWord: (may or may not store the concept graph word here that defines the item, in object form)
      }
    },
    curators: {
      <pubkey of curator>: {
        // pubkeys of raters with created_at to know whether to replace item or not
        <pubkey of rater1>: {
          created_at: created_at,
          thumbs: "up" | "down"
        },
        <pubkey of rater2>: {
          created_at: created_at,
          thumbs: "up" | "down"
        },
        // below is redundant but
        thumbsUp:[] // pubkeys of thumbs up
        thumbsDown: [] // pubkeys of thumbs down
      }
    }
  }
}
*/

export const curatedListsSlice = createSlice({
  name: 'curatedLists',
  initialState: {
    curatedLists: {},
  },
  reducers: {
    addCuratedList: (state, action) => {
      const oEvent = action.payload;
      const event_id = oEvent.id;
      const pubkey = oEvent.pubkey;
      const oWord = JSON.parse(oEvent.content);
      if (!state.curatedLists.hasOwnProperty(event_id)) { // don't overwrite if already present; otherwise, data in items property will be lost
        state.curatedLists[event_id] = {
          name: {
            singular: null,
            plural: null,
          },
          description: null,
          author: null,
          oWord: {},
          items: {},
          curators: {},
        }
      };
      // transcribe data

      state.curatedLists[event_id].name = {
        singular: oWord.nostrCuratedListData.name.singular,
        plural: oWord.nostrCuratedListData.name.plural,
      };
      state.curatedLists[event_id].description = oWord.nostrCuratedListData.description;
      state.curatedLists[event_id].author = pubkey;
      state.curatedLists[event_id].oWord = JSON.parse(JSON.stringify(oWord)); // clone object
    },
    addCuratorEndorsement: (state, action) => {
      const event = action.payload;
      const oWord = JSON.parse(event.content);
      if (oWord) {
        if (oWord.hasOwnProperty("ratingData")) {
          if (oWord.ratingData.hasOwnProperty("ratingTemplateData")) {
            const ratingTemplateSlug = oWord.ratingData.ratingTemplateData.ratingTemplateSlug;
            if (ratingTemplateSlug=="nostrCuratedListsCuratorEndorsement") {
              const raterPubkey = oWord.ratingData.raterData.nostrProfileData.pubkey;
              const rateePubkey = oWord.ratingData.rateeData.nostrProfileData.pubkey;
              const regularSliderRating = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.regularSliderRating;
              const referenceRegularSliderRating = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.referenceRegularSliderRating;
              const confidence = oWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;
              const listID = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.eventID;
              const contextDAGSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.contextDAG.slug;

              if (!state.curatedLists.hasOwnProperty(listID)) {
                state.curatedLists[listID] = {
                  name: {
                    singular: null,
                    plural: null,
                  },
                  description: null,
                  author: null,
                  oWord: {},
                  items: {},
                  curators: {},
                }
              }
              if ((contextDAGSlug=="genericRating") && (confidence == 80)) {
                if (!state.curatedLists[listID].curators.hasOwnProperty(rateePubkey)) {
                  state.curatedLists[listID].curators[rateePubkey] = {
                    thumbsUp: [],
                    thumbsDown: [],
                  }
                }
                // check if rating is already recorded and if so, compare created_at times
                let proceed = false;
                if (!state.curatedLists[listID].curators[rateePubkey].hasOwnProperty(raterPubkey)) {
                  proceed = true;
                }
                if (state.curatedLists[listID].curators[rateePubkey].hasOwnProperty(raterPubkey)) {
                  const existingCreatedAt = state.curatedLists[listID].curators[rateePubkey][raterPubkey].created_at;
                  if (event.created_at > existingCreatedAt) {
                    proceed = true;
                  }
                }
                if (proceed) {
                  // only proceed if the current event is later than the preexisting event
                  // console.log("qwerty raterPubkey: "+raterPubkey+"; rateePubkey: "+rateePubkey)
                  if (regularSliderRating == referenceRegularSliderRating) {
                    // console.log("qwerty thumbsUp")
                    // console.log("qwerty thumbsUp raterPubkey_"+raterPubkey+"; rateePubkey_"+rateePubkey)
                    // remove from thumbs down, if present
                    state.curatedLists[listID].curators[rateePubkey].thumbsDown = removeStringFromArray(raterPubkey,state.curatedLists[listID].curators[rateePubkey].thumbsDown)
                    // add to thumbs up
                    if (!state.curatedLists[listID].curators[rateePubkey].thumbsUp.includes(raterPubkey)) {
                      state.curatedLists[listID].curators[rateePubkey].thumbsUp.push(raterPubkey);
                    }
                    state.curatedLists[listID].curators[rateePubkey][raterPubkey] = {
                      created_at: event.created_at,
                      thumbs: "up",
                    }
                  }
                  if (regularSliderRating == 0) {
                    // console.log("qwerty thumbsDown")
                    // console.log("qwerty thumbsDown raterPubkey_"+raterPubkey+"; rateePubkey_"+rateePubkey)
                    // remove from thumbs up, if present
                    state.curatedLists[listID].curators[rateePubkey].thumbsUp = removeStringFromArray(raterPubkey,state.curatedLists[listID].curators[rateePubkey].thumbsUp)
                    // add to thumbs down
                    if (!state.curatedLists[listID].curators[rateePubkey].thumbsDown.includes(raterPubkey)) {
                      state.curatedLists[listID].curators[rateePubkey].thumbsDown.push(raterPubkey);
                    }
                    state.curatedLists[listID].curators[rateePubkey][raterPubkey] = {
                      created_at: event.created_at,
                      thumbs: "up",
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

// Action creators are generated for each case reducer function

export const {
  addCuratedList,
  addCuratorEndorsement,
} = curatedListsSlice.actions;

export default curatedListsSlice.reducer;
