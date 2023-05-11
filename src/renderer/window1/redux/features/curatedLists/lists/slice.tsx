import { createSlice } from '@reduxjs/toolkit';
import { removeStringFromArray } from 'renderer/window1/lib/pg';
import { updateAbout } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
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

        // RATINGS OF THIS ITEM
        ratings: {
          <pubkey of rater1>: {
            created_at: created_at,
            thumbs: "up" | "down"
          },
          <pubkey of rater2>: {
            created_at: created_at,
            thumbs: "up" | "down"
          },
          <pubkey of rater3>: {
            created_at: created_at,
            thumbs: "up" | "down"
          },
          // ... etc
          // below is redundant but may be useful
          thumbsUp: [] // pubkeys of thumbs up
          thumbsDown: [] // pubkeys of thumbs down
        }
      }
    },
    curators: {
      <pubkey of curator>: {
        // pubkeys of raters with created_at to know whether to replace item or not

        // ENDORSEMENTS OF THIS CURATOR
        <pubkey of rater1>: {
          created_at: created_at,
          thumbs: "up" | "down"
        },
        <pubkey of rater2>: {
          created_at: created_at,
          thumbs: "up" | "down"
        },
        <pubkey of rater3>: {
          created_at: created_at,
          thumbs: "up" | "down"
        },
        // ... etc
        // below is redundant but may be useful
        thumbsUp: [] // pubkeys of thumbs up
        thumbsDown: [] // pubkeys of thumbs down
      }
    }
  }
}
*/

export const oBlankItemData = {
  slug: null,
  name: null,
  description: null,
  author: null,
  oWord: {},
  ratings: {},
};
export const oBlankCuratorData = {
  thumbsUp: [], // pubkeys of thumbs up
  thumbsDown: [], // pubkeys of thumbs down
};

// rating of an item
export const oBlankRatingData = {
  created_at: null,
  thumbs: null,
};
// endorsement of curator
export const oBlankEndorsementData = {
  created_at: null,
  thumbs: null,
};

export const oBlankCuratedListData = {
  name: {
    singular: null,
    plural: null,
  },
  description: null,
  author: null,
  oWord: {},
  items: {},
  curators: {},
};

export const addCuratorEndorsement_X = (event, oWord, state) => {
  if (oWord.hasOwnProperty('ratingData')) {
    if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
      const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
      if (ratingTemplateSlug == 'nostrCuratedListsCuratorEndorsement') {
        const raterPubkey = oWord.ratingData.raterData.nostrProfileData.pubkey;
        const rateePubkey = oWord.ratingData.rateeData.nostrProfileData.pubkey;
        const { regularSliderRating } =
          oWord.ratingData.ratingFieldsetData
            .nostrCuratedListsCuratorEndorsementFieldsetData;
        const { referenceRegularSliderRating } =
          oWord.ratingData.ratingFieldsetData
            .nostrCuratedListsCuratorEndorsementFieldsetData;
        const { confidence } =
          oWord.ratingData.ratingFieldsetData.confidenceFieldsetData;
        const listID =
          oWord.ratingData.ratingFieldsetData
            .nostrCuratedListsCuratorEndorsementFieldsetData.contextData
            .nostrParentCuratedListData.eventID;
        const contextDAGSlug =
          oWord.ratingData.ratingFieldsetData
            .nostrCuratedListsCuratorEndorsementFieldsetData.contextData
            .contextDAG.slug;

        if (!state.curatedLists.hasOwnProperty(listID)) {
          state.curatedLists[listID] = JSON.parse(
            JSON.stringify(oBlankCuratedListData)
          );
        }
        if (contextDAGSlug == 'genericRating' && confidence == 80) {
          if (
            !state.curatedLists[listID].curators.hasOwnProperty(rateePubkey)
          ) {
            state.curatedLists[listID].curators[rateePubkey] = {
              thumbsUp: [],
              thumbsDown: [],
            };
          }
          // check if rating is already recorded and if so, compare created_at times
          let proceed = false;
          if (
            !state.curatedLists[listID].curators[rateePubkey].hasOwnProperty(
              raterPubkey
            )
          ) {
            proceed = true;
          }
          if (
            state.curatedLists[listID].curators[rateePubkey].hasOwnProperty(
              raterPubkey
            )
          ) {
            const existingCreatedAt =
              state.curatedLists[listID].curators[rateePubkey][raterPubkey]
                .created_at;
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
              state.curatedLists[listID].curators[rateePubkey].thumbsDown =
                removeStringFromArray(
                  raterPubkey,
                  state.curatedLists[listID].curators[rateePubkey].thumbsDown
                );
              // add to thumbs up
              if (
                !state.curatedLists[listID].curators[
                  rateePubkey
                ].thumbsUp.includes(raterPubkey)
              ) {
                state.curatedLists[listID].curators[rateePubkey].thumbsUp.push(
                  raterPubkey
                );
              }
              state.curatedLists[listID].curators[rateePubkey][raterPubkey] = {
                created_at: event.created_at,
                thumbs: 'up',
              };
            }
            if (regularSliderRating == 0) {
              // console.log("qwerty thumbsDown")
              // console.log("qwerty thumbsDown raterPubkey_"+raterPubkey+"; rateePubkey_"+rateePubkey)
              // remove from thumbs up, if present
              state.curatedLists[listID].curators[rateePubkey].thumbsUp =
                removeStringFromArray(
                  raterPubkey,
                  state.curatedLists[listID].curators[rateePubkey].thumbsUp
                );
              // add to thumbs down
              if (
                !state.curatedLists[listID].curators[
                  rateePubkey
                ].thumbsDown.includes(raterPubkey)
              ) {
                state.curatedLists[listID].curators[
                  rateePubkey
                ].thumbsDown.push(raterPubkey);
              }
              state.curatedLists[listID].curators[rateePubkey][raterPubkey] = {
                created_at: event.created_at,
                thumbs: 'up',
              };
            }
          }
        }
      }
    }
  }
};

export const addCuratedList_X = (oEvent, oWord, state, event_id, pubkey) => {
  if (!state.curatedLists.hasOwnProperty(event_id)) {
    // don't overwrite if already present; otherwise, data in items property will be lost
    state.curatedLists[event_id] = JSON.parse(
      JSON.stringify(oBlankCuratedListData)
    );
  }
  // transcribe data
  state.curatedLists[event_id].name = {
    singular: oWord.nostrCuratedListData.name.singular,
    plural: oWord.nostrCuratedListData.name.plural,
  };
  state.curatedLists[event_id].description =
    oWord.nostrCuratedListData.description;
  state.curatedLists[event_id].author = pubkey;
  // state.curatedLists[event_id].oWord = JSON.parse(JSON.stringify(oWord)); // clone object
};

export const addCuratedListInstance_X = (oEvent, oWord, state) => {
  const itemID = oEvent.id;
  const authorPubkey = oEvent.pubkey;
  const parentConceptSlug = oEvent.tags.find(
    ([k, v]) => k === 's' && v && v !== ''
  )[1];
  const parentConceptNostrEventID = oEvent.tags.find(
    ([k, v]) => k === 'e' && v && v !== ''
  )[1];
  const propertyPath = `${parentConceptSlug}Data`;
  if (oWord.hasOwnProperty(propertyPath)) {
    if (state.curatedLists.hasOwnProperty(parentConceptNostrEventID)) {
      state.curatedLists[parentConceptNostrEventID].items[itemID] = JSON.parse(
        JSON.stringify(oBlankItemData)
      );
      // state.curatedLists[parentConceptNostrEventID].items[itemID].tags = JSON.parse(JSON.stringify(oEvent.tags));
      // state.curatedLists[parentConceptNostrEventID].items[itemID].oWord = JSON.parse(JSON.stringify(oWord));
      state.curatedLists[parentConceptNostrEventID].items[itemID].author =
        authorPubkey;
    }
    if (oWord.hasOwnProperty(propertyPath)) {
      const name = oWord[propertyPath]?.name;
      const slug = oWord[propertyPath]?.slug;
      const description = oWord[propertyPath]?.description;
      state.curatedLists[parentConceptNostrEventID].items[itemID].name = name;
      state.curatedLists[parentConceptNostrEventID].items[itemID].slug = slug;
      state.curatedLists[parentConceptNostrEventID].items[itemID].description =
        description;
    }
  }
};
export const addRatingOfCuratedListInstance_X = (oEvent, oWord, state) => {
  if (oWord.hasOwnProperty('ratingData')) {
    if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
      const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
      if (ratingTemplateSlug == 'nostrCuratedListInstanceGenericRating') {
        // INCOMPLETE
      }
    }
  }
};

export const curatedListsSlice = createSlice({
  name: 'curatedLists',
  initialState: {
    curatedLists: {},
  },
  reducers: {
    initCuratedListInstances: (state, action) => {
      const aCuratedListInstancesData = action.payload;
      const oCuratedListInstanceData = {};
      for (let x = 0; x < aCuratedListInstancesData.length; x += 1) {
        const oCuratedListInstanceData = aCuratedListInstancesData[x];
        const {
          event,
          event_id,
          pubkey,
          parentConceptSlug,
          parentConceptNostrEventID,
          deprecated,
        } = oCuratedListInstanceData;
        const oEvent = JSON.parse(event);
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedListInstance_X(oEvent, oWord, state);
        }
      }
    },
    initRatingsOfCuratedListInstances: (state, action) => {
      const aRatingsOfCuratedListInstancesData = action.payload;
      const oRatingOfCuratedListInstanceData = {};
      for (let x = 0; x < aRatingsOfCuratedListInstancesData.length; x += 1) {
        const oRatingOfCuratedListInstanceData =
          aRatingsOfCuratedListInstancesData[x];
        const {
          event,
          event_id,
          uniqueID,
          pubkey,
          ratingTemplateSlug,
          parentConceptSlug,
          parentConceptNostrEventID,
          instanceSlug,
          instanceNostrEventID,
          deprecated,
        } = oRatingOfCuratedListInstanceData;
        const oEvent = JSON.parse(event);
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addRatingOfCuratedListInstance_X(oEvent, oWord, state);
        }
      }
    },
    initEndorsementsOfCurators: (state, action) => {
      const aEndorsementsOfCuratorsData = action.payload;
      const oEndorsementOfCuratorData = {};
      for (let x = 0; x < aEndorsementsOfCuratorsData.length; x += 1) {
        const oEndorsementOfCuratorData = aEndorsementsOfCuratorsData[x];
        const {} = oEndorsementOfCuratorData;
        const {
          event,
          event_id,
          uniqueID,
          rater_pubkey,
          ratee_pubkey,
          ratingTemplateSlug,
          parentConceptSlug,
          parentConceptNostrEventID,
          contextDAGSlug,
          deprecated,
        } = oEndorsementOfCuratorData;
        const oEvent = JSON.parse(event);
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratorEndorsement_X(event, oWord, state);
        }
      }
    },
    initCuratedLists: (state, action) => {
      const aCuratedListsData = action.payload;
      // console.log("initCuratedLists_a; aCuratedListsData: "+JSON.stringify(aCuratedListsData,null,4));
      const oCuratedListData = {};
      for (let x = 0; x < aCuratedListsData.length; x += 1) {
        const oCuratedListData = aCuratedListsData[x];
        // console.log("initCuratedLists_b; oCuratedListData: "+JSON.stringify(oCuratedListData,null,4));
        const { event, event_id, pubkey } = oCuratedListData;
        const oEvent = JSON.parse(event);
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedList_X(oEvent, oWord, state, event_id, pubkey);
        }
      }
    },
    addCuratedList: (state, action) => {
      const oEvent = action.payload;
      const event_id = oEvent.id;
      const { pubkey } = oEvent;
      const oWord = JSON.parse(oEvent.content);
      if (oWord) {
        addCuratedList_X(oEvent, oWord, state, event_id, pubkey);
      }
    },
    addCuratedListInstance: (state, action) => {
      const oEvent = action.payload;
      const oWord = JSON.parse(oEvent.content);
      if (oWord) {
        addCuratedListInstance_X(oEvent, oWord, state);
      }
    },
    addRatingOfCuratedListInstance: (state, action) => {
      const oEvent = action.payload;
      const oWord = JSON.parse(oEvent.content);
      if (oWord) {
        addRatingOfCuratedListInstance_X(oEvent, oWord, state);
      }
    },
    addCuratorEndorsement: (state, action) => {
      const event = action.payload;
      const oWord = JSON.parse(event.content);
      if (oWord) {
        addCuratorEndorsement_X(event, oWord, state);
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  initCuratedLists,
  initCuratedListInstances,
  initRatingsOfCuratedListInstances,
  initEndorsementsOfCurators,
  addCuratedList,
  addCuratedListInstance,
  addRatingOfCuratedListInstance,
  addCuratorEndorsement,
} = curatedListsSlice.actions;

export default curatedListsSlice.reducer;
