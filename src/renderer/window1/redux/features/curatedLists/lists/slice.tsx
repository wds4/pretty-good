import { createSlice } from '@reduxjs/toolkit';
import { removeStringFromArray, isValidObj, isValidObjString } from 'renderer/window1/lib/pg';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  addCuratedListEventToSql,
  addInstanceEventToSql,
  addRatingOfCuratedListInstanceEventToSql,
  addEndorsementOfListCuratorEventToSql,
} from 'renderer/window1/lib/pg/sql';
// import { updateAbout } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
// import { EntryOptionPlugin } from 'webpack';

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
  ratings: {
    thumbsUp: [],
    thumbsDown: [],
  },
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

export const addRatingOfCuratedListItem_X = (oEvent, oWord, state) => {
  // already checked that oWord.ratingData.ratingTemplateData.ratingTemplateSlug == 'nostrCuratedListInstanceGenericRating'
  // console.log("addRatingOfCuratedListItem_X")
  // console.log("qwerty addRatingOfCuratedListItem_X typeof oEvent: "+typeof oEvent)
  const event_id = oEvent.id;
  const raterPubkey = oWord.ratingData.raterData.nostrProfileData.pubkey;
  const rateeID = oWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
  const { regularSliderRating } = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData;
  const { confidence } = oWord.ratingData.ratingFieldsetData.confidenceFieldsetData;
  const listID = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.eventID;
  const contextDAGSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.contextDAG.slug;

  if (!state.curatedLists.hasOwnProperty(listID)) {
    state.curatedLists[listID] = JSON.parse(
      JSON.stringify(oBlankCuratedListData)
    );
  }

  if (contextDAGSlug == 'genericRating' && confidence == 80) {
    if (
      !state.curatedLists[listID].items.hasOwnProperty(rateeID)
    ) {
      state.curatedLists[listID].items[rateeID] = JSON.parse(JSON.stringify(oBlankItemData));
    }
    // check if rating is already recorded and if so, compare created_at times
    let proceed = false;
    if (
      !state.curatedLists[listID].items[rateeID].hasOwnProperty(
        raterPubkey
      )
    ) {
      proceed = true;
    }
    if (
      state.curatedLists[listID].items[rateeID].hasOwnProperty(
        raterPubkey
      )
    ) {
      const existingCreatedAt =
        state.curatedLists[listID].items[rateeID][raterPubkey]
          .created_at;
      if (oEvent.created_at > existingCreatedAt) {
        proceed = true;
      }
    }
    if (proceed) {
      // only proceed if the current event is later than the preexisting event
      // future: generalize to other rating values; for now (May 2023), just doing thumbs up (rating 100) and down (rating 0)
      if (regularSliderRating == 100) {
        // thumbs up
        // remove from thumbs down, if present
        state.curatedLists[listID].items[rateeID].ratings.thumbsDown =
        removeStringFromArray(
          raterPubkey,
          state.curatedLists[listID].items[rateeID].ratings.thumbsDown
        );
        // add to thumbs up
        if (
          !state.curatedLists[listID].items[
            rateeID
          ].ratings.thumbsUp.includes(raterPubkey)
        ) {
          state.curatedLists[listID].items[rateeID].ratings.thumbsUp.push(
            raterPubkey
          );
        }
        state.curatedLists[listID].items[rateeID].ratings[raterPubkey] = {
          created_at: oEvent.created_at,
          thumbs: 'up',
        };
      }
      if (regularSliderRating == 0) {
        // thumbs down
        // remove from thumbs up, if present
        state.curatedLists[listID].items[rateeID].ratings.thumbsUp =
        removeStringFromArray(
          raterPubkey,
          state.curatedLists[listID].items[rateeID].ratings.thumbsUp
        );
        // add to thumbs down
        if (
          !state.curatedLists[listID].items[
            rateeID
          ].ratings.thumbsDown.includes(raterPubkey)
        ) {
          state.curatedLists[listID].items[rateeID].ratings.thumbsDown.push(
            raterPubkey
          );
        }
        state.curatedLists[listID].items[rateeID].ratings[raterPubkey] = {
          created_at: oEvent.created_at,
          thumbs: 'down',
        };
      }
      if (!state.aRatingsOfItemsEventIDs.includes(event_id)) {
        state.aRatingsOfItemsEventIDs.push(event_id);
      }
      if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
        state.aThreadedTapestryEventIDs.push(event_id);
      }
    }
  }
};

export const addCuratorEndorsement_X = (event, oWord, state) => {
  // already checked that ratingData.ratingTemplateData.ratingTemplateSlug == 'nostrCuratedListsCuratorEndorsement'
  // console.log("qwerty addCuratorEndorsement_X typeof event: "+typeof event)
  const event_id = event.id;
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
      state.curatedLists[listID].curators[rateePubkey] = JSON.parse(JSON.stringify(oBlankCuratorData));
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
          thumbs: 'down',
        };
      }
      if (!state.aRatingsOfCuratorsEventIDs.includes(event_id)) {
        state.aRatingsOfCuratorsEventIDs.push(event_id);
      }
      if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
        state.aThreadedTapestryEventIDs.push(event_id);
      }
    }
  }
};

export const addCuratedList_X = (event, oWord, state, event_id) => {
  const { pubkey } = event;
  if (!state.curatedLists.hasOwnProperty(event_id)) {
    // don't overwrite if already present; otherwise, data in items property will be lost
    state.curatedLists[event_id] = JSON.parse(
      JSON.stringify(oBlankCuratedListData)
    );
  }
  // transcribe data
  if (oWord?.nostrCuratedListData) {
    if (oWord.nostrCuratedListData?.name) {
      state.curatedLists[event_id].name = {
        singular: oWord.nostrCuratedListData.name.singular,
        plural: oWord.nostrCuratedListData.name.plural,
      };
    }
    state.curatedLists[event_id].description =
      oWord.nostrCuratedListData?.description;
    state.curatedLists[event_id].author = pubkey;
    state.curatedLists[event_id].oWord = JSON.parse(JSON.stringify(oWord)); // clone object
  }
  if (!state.aListEventIDs.includes(event_id)) {
    state.aListEventIDs.push(event_id);
  }
  if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
    state.aThreadedTapestryEventIDs.push(event_id);
  }
};

export const addCuratedListItem_X = (oEvent, oWord, state) => {
  // console.log("addCuratedListItem_X; oEvent: "+JSON.stringify(oEvent,null,4))
  if ((oEvent) && (oWord)) {
    const event_id = oEvent.id;
    const authorPubkey = oEvent.pubkey;
    const aParentConceptNostrEventID = oEvent.tags.filter(
      ([k, v]) => k === 'e' && v && v !== ''
    )[0];
    const aParentConceptSlug = oEvent.tags.filter(
      ([k, v]) => k === 's' && v && v !== ''
    )[0];
    let parentConceptNostrEventID = "";
    if (aParentConceptNostrEventID) {
      if (aParentConceptNostrEventID.length > 0) {
        parentConceptNostrEventID = aParentConceptNostrEventID[1];
      }
    }
    let parentConceptSlug = "";
    if (aParentConceptSlug) {
      if (aParentConceptSlug.length > 0) {
        parentConceptSlug = aParentConceptSlug[1];
      }
    }
    /*
    const parentConceptSlug = oEvent.tags.find(
      ([k, v]) => k === 's' && v && v !== ''
    )[1];
    const parentConceptNostrEventID = oEvent.tags.find(
      ([k, v]) => k === 'e' && v && v !== ''
    )[1];
    */

    if ((parentConceptNostrEventID) && (parentConceptSlug)) {
      const propertyPath = `${parentConceptSlug}Data`;
      if (oWord.hasOwnProperty(propertyPath)) {
        console.log("addCuratedListItem_X; parentConceptNostrEventID: "+parentConceptNostrEventID+"; parentConceptSlug: "+parentConceptSlug)
        if (state.curatedLists.hasOwnProperty(parentConceptNostrEventID)) {
          if (state.curatedLists[parentConceptNostrEventID].hasOwnProperty("items")) {
            state.curatedLists[parentConceptNostrEventID].items[event_id] = JSON.parse(
              JSON.stringify(oBlankItemData)
            );
            // state.curatedLists[parentConceptNostrEventID].items[event_id].tags = JSON.parse(JSON.stringify(oEvent.tags));
            state.curatedLists[parentConceptNostrEventID].items[event_id].oWord = JSON.parse(JSON.stringify(oWord));
            state.curatedLists[parentConceptNostrEventID].items[event_id].author =
              authorPubkey;
          }
        }
        if (oWord.hasOwnProperty(propertyPath)) {
          const name = oWord[propertyPath]?.name;
          const slug = oWord[propertyPath]?.slug;
          const description = oWord[propertyPath]?.description;
          if (state.curatedLists.hasOwnProperty(parentConceptNostrEventID) && state.curatedLists[parentConceptNostrEventID].hasOwnProperty("items")) {
            state.curatedLists[parentConceptNostrEventID].items[event_id].name = name;
            state.curatedLists[parentConceptNostrEventID].items[event_id].slug = slug;
            state.curatedLists[parentConceptNostrEventID].items[event_id].description =
              description;
          }
        }
      }
    }
    if (!state.aListItemEventIDs.includes(event_id)) {
      state.aListItemEventIDs.push(event_id);
    }
    if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
      state.aThreadedTapestryEventIDs.push(event_id);
    }
  }
};

export const curatedListsSlice = createSlice({
  name: 'curatedLists',
  initialState: {
    curatedLists: {},
    aThreadedTapestryEventIDs: [],
    aRatingsOfItemsEventIDs: [],
    aRatingsOfCuratorsEventIDs: [],
    aListEventIDs: [],
    aListItemEventIDs: [],
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
          addCuratedListItem_X(oEvent, oWord, state);
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
          if (oWord.hasOwnProperty('ratingData')) {
            if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
              const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
              if (ratingTemplateSlug == 'nostrCuratedListInstanceGenericRating') {
                addRatingOfCuratedListItem_X(oEvent, oWord, state);
              }
            }
          }
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
          if (oWord.hasOwnProperty('ratingData')) {
            if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
              const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
              if (ratingTemplateSlug == 'nostrCuratedListsCuratorEndorsement') {
                addCuratorEndorsement_X(oEvent, oWord, state);
              }
            }
          }
        }
      }
    },
    initCuratedLists: (state, action) => {
      const aCuratedListsData = action.payload;
      console.log("initCuratedLists_a; aCuratedListsData: "+JSON.stringify(aCuratedListsData,null,4));
      const oCuratedListData = {};
      for (let x = 0; x < aCuratedListsData.length; x += 1) {
        const oCuratedListData = aCuratedListsData[x];
        // console.log("initCuratedLists_b; oCuratedListData: "+JSON.stringify(oCuratedListData,null,4));
        const { event, event_id, pubkey } = oCuratedListData;
        const oEvent = JSON.parse(event);
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedList_X(oEvent, oWord, state, event_id);
        }
      }
    },
    addCuratedList: (state, action) => {
      const oEvent = action.payload;
      const event_id = oEvent.id;
      if (!state.aListEventIDs.includes(event_id)) {
        const { pubkey } = oEvent;
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedList_X(oEvent, oWord, state, event_id);
          state.aListEventIDs.push(event_id);
        }
      }
      /*
      const oCuratedLists = state.curatedLists;
      const aCuratedLists = Object.keys(oCuratedLists); // array of curated list event IDs
      // console.log("aCuratedLists: "+JSON.stringify(aCuratedLists,null,4))
      if (!aCuratedLists.includes(event_id)) { // only add curated list if not already added
        const { pubkey } = oEvent;
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedList_X(oEvent, oWord, state, event_id);
        }
      }
      */
    },
    addCuratedListInstance: (state, action) => {
      const oEvent = action.payload;
      const event_id = oEvent.id;
      if (!state.aListItemEventIDs.includes(event_id)) {
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedListItem_X(oEvent, oWord, state);
          state.aListItemEventIDs.push(event_id);
        }
      }

      /*
      const oCuratedLists = state.curatedLists;
      const aCuratedLists = Object.keys(oCuratedLists); // array of curated list event IDs
      let aCuratedListItems = [];
      for (let x=0;x<aCuratedLists.length;x++) {
        const listEventID = aCuratedLists[x]
        const oCuratedListItems = state.curatedLists[listEventID].items;
        aCuratedListItems = aCuratedListItems.concat(Object.keys(oCuratedListItems));
      }
      // console.log("aCuratedListItems: "+JSON.stringify(aCuratedListItems,null,4))
      if (!aCuratedListItems.includes(oEvent.id)) { // only add list item if it does not already exist in store
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          addCuratedListItem_X(oEvent, oWord, state);
        }
      }
      */
    },
    addRatingOfCuratedListInstance: (state, action) => {
      const oEvent = action.payload;
      const event_id = oEvent.id;
      if (!state.aRatingsOfItemsEventIDs.includes(event_id)) {
        const oWord = JSON.parse(oEvent.content);
        if (oWord) {
          if (oWord.hasOwnProperty('ratingData')) {
            if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
              const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
              if (ratingTemplateSlug == 'nostrCuratedListInstanceGenericRating') {
                addRatingOfCuratedListItem_X(oEvent, oWord, state);
                state.aRatingsOfItemsEventIDs.push(event_id);
              }
            }
          }
        }
      }



      /*
      // INCOMPLETE -- SEE ALSO BELOW
      // maybe should do this entire check in addRatingOfCuratedListItem_X ?
      const oCuratedLists = state.curatedLists;
      const aCuratedLists = Object.keys(oCuratedLists); // array of curated list event IDs
      // END INCOMPLETE
      */


      /*
      const oWord = JSON.parse(oEvent.content);
      if (oWord) {
        addRatingOfCuratedListItem_X(oEvent, oWord, state);
      }
      */
    },
    addCuratorEndorsement: (state, action) => {
      const event = action.payload;
      const event_id = event.id;
      if (!state.aRatingsOfCuratorsEventIDs.includes(event_id)) {
        const oWord = JSON.parse(event.content);
        if (oWord) {
          if (oWord.hasOwnProperty('ratingData')) {
            if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
              const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
              if (ratingTemplateSlug == 'nostrCuratedListsCuratorEndorsement') {
                addCuratorEndorsement_X(event, oWord, state);
                state.aRatingsOfCuratorsEventIDs.push(event_id);
              }
            }
          }
        }
      }



      /*
      // INCOMPLETE -- SEE ALSO ABOVE
      // maybe should do this entire check in addCuratorEndorsement_X ?
      // Or maybe need to keey a running array in redux of eventID of each recorded rating (rating of curator, rating of item); will be easier to check

      const oCuratedLists = state.curatedLists;
      const aCuratedLists = Object.keys(oCuratedLists); // array of curated list event IDs
      for (let x=0;x<aCuratedLists.length;x++) {
        const listEventID = aCuratedLists[x];
        const oCuratedListCurators = state.curatedLists[listEventID].curators;
        const aCuratedListCurators = Object.keys(oCuratedListCurators);
        for (let z=0;z<aCuratedListCurators.length;z++) {
          const curatorPubkey = aCuratedListCurators[x];
          const oCuratorRaters = state.curatedLists[listEventID].curators[curatorPubkey]
          const aCuratorRaters = Object.keys(oCuratorRaters); // contains pubkeys or raters but also contains 'thumbsUp' and 'thumbsDown' !!!
          // need to decide whether to add this one or not
          // ...
        }
      }
      // END INCOMPLETE
      */

      /*
      const oWord = JSON.parse(event.content);
      if (oWord) {
        addCuratorEndorsement_X(event, oWord, state);
      }
      */
    },

    // 4 June 2023: addThreadedTapestryEvent will replace addCuratedList, addCuratedListInstance, addRatingOfCuratedListInstance, and addCuratorEndorsement, all of which will be deprecated
    // It will also HOPEFULLY call a single function: (addThreadedTapestryEventToSql) so that: addCuratedListEventToSql, addInstanceEventToSql, addRatingOfCuratedListInstanceEventToSql, addEndorsementOfListCuratorEventToSql,
    // (currently in renderer/window1/lib/pg/sql)
    // will also be deprecated. (Although call to sql needs to be async -- can this be done asynchronously?)
    addThreadedTapestryEvent: (state, action) => {
      const event = action.payload;
      // console.log("qwerty addThreadedTapestryEvent A");
      if (doesEventValidate(event)) {
        // console.log("qwerty addThreadedTapestryEvent B")
        const event_id = event.id;

        // c0 and g0 will not be needed if 9901, 33901 are reserved for these purposes;
        // but for now at least, c0 and g0 will be used as additional checks that these are
        // following the DCoSL protocol. (Maybe change to z0 == dcosl ???)

        if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
          const { pubkey } = event;
          const kind = event.kind;
          if (isValidObjString(event?.content)) {
            const oWord = JSON.parse(event.content);

            /*
            const aPropertyPaths = Object.keys(oWord);
            if (aPropertyPaths.includes("nostrCuratedListData")) {

            }
            */
            let c0 = event.tags.filter(([k, v]) => k === 'c' && v && v !== '')[0];
            let d0 = event.tags.filter(([k, v]) => k === 'd' && v && v !== '')[0];
            let e0 = event.tags.filter(([k, v]) => k === 'e' && v && v !== '')[0];
            let g0 = event.tags.filter(([k, v]) => k === 'g' && v && v !== '')[0];
            let l0 = event.tags.filter(([k, v]) => k === 'l' && v && v !== '')[0];
            let m0 = event.tags.filter(([k, v]) => k === 'm' && v && v !== '')[0];
            let p0 = event.tags.filter(([k, v]) => k === 'p' && v && v !== '')[0];
            let r0 = event.tags.filter(([k, v]) => k === 'r' && v && v !== '')[0];
            let s0 = event.tags.filter(([k, v]) => k === 's' && v && v !== '')[0];
            let t0 = event.tags.filter(([k, v]) => k === 't' && v && v !== '')[0];

            if (c0 && (typeof c0 == "object") && (c0.length > 1)) { c0 = c0[1]; }
            if (d0 && (typeof d0 == "object") && (d0.length > 1)) { d0 = d0[1]; }
            if (e0 && (typeof e0 == "object") && (e0.length > 1)) { e0 = e0[1]; }
            if (g0 && (typeof g0 == "object") && (g0.length > 1)) { g0 = g0[1]; }
            if (l0 && (typeof l0 == "object") && (l0.length > 1)) { l0 = l0[1]; }
            if (m0 && (typeof m0 == "object") && (m0.length > 1)) { m0 = m0[1]; }
            if (p0 && (typeof p0 == "object") && (p0.length > 1)) { p0 = p0[1]; }
            if (r0 && (typeof r0 == "object") && (r0.length > 1)) { r0 = r0[1]; }
            if (s0 && (typeof s0 == "object") && (s0.length > 1)) { s0 = s0[1]; }
            if (t0 && (typeof t0 == "object") && (t0.length > 1)) { t0 = t0[1]; }

            if (g0 == "grapevine-testnet-901") {
              console.log("qwerty g0=grapevine-testnet; event: "+JSON.stringify(event,null,4))
            }

            // c0 and g0 will not be needed if 9901, 33901 are reserved for these purposes;
            // but for now at least, c0 and g0 will be used as additional checks that these are
            // following the DCoSL protocol. (Maybe change to z0 == dcosl ???)
            if ( (kind == 9901) && (c0 == "concept-graph-testnet-901") ) {
              // console.log("qwerty concept graph testnet")
              if (t0 == "createInstance") {
                // list, testnet 901
                if (s0 == "nostrCuratedList") {
                  // old way:
                  // dispatch(addCuratedList(event));
                  // await addCuratedListEventToSql(event);
                  // new way:
                  addCuratedList_X(event, oWord, state, event_id);
                  addCuratedListEventToSql(event);

                }
                if (e0 && s0) {
                  const parentConceptNostrEventID = e0;
                  const parentConceptSlug = s0;
                  // list item:
                  // old way:
                  /*
                  dispatch(addCuratedListInstance(event));
                  await addInstanceEventToSql(
                    event,
                    parentConceptSlug,
                    parentConceptNostrEventID
                  );
                  */
                  // new way:
                  addCuratedListItem_X(event, oWord, state);
                  addInstanceEventToSql(
                    event,
                    parentConceptSlug,
                    parentConceptNostrEventID
                  );
                }
              }
            }
            if ( (kind == 39901) && (g0 == "grapevine-testnet-901") ) {
              // console.log("qwerty grapevine testnet")
              // endorsements of items
              // old way:
              // dispatch(addRatingOfCuratedListInstance(event));
              // endorsements of users
              // old way:
              // dispatch(addCuratorEndorsement(event));
              if (oWord.hasOwnProperty('ratingData')) {
                if (oWord.ratingData.hasOwnProperty('ratingTemplateData')) {
                  const { ratingTemplateSlug } = oWord.ratingData.ratingTemplateData;
                  if (ratingTemplateSlug == 'nostrCuratedListInstanceGenericRating') {
                    addRatingOfCuratedListItem_X(event, oWord, state);
                    if (l0) {
                      const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                      const parentConceptNostrEventID = l0;
                      addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                    }
                  }
                  if (ratingTemplateSlug == 'nostrCuratedListsCuratorEndorsement') {
                    addCuratorEndorsement_X(event, oWord, state);
                    if (l0) {
                      const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                      const parentConceptNostrEventID = l0;
                      addEndorsementOfListCuratorEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                    }
                  }
                }
              }
            }
          }
          if (!state.aThreadedTapestryEventIDs.includes(event_id)) {
            state.aThreadedTapestryEventIDs.push(event_id);
          }

          // console.log("qwerty state.aThreadedTapestryEventIDs.length: "+state.aThreadedTapestryEventIDs.length)
        }
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
  addThreadedTapestryEvent,
} = curatedListsSlice.actions;

export default curatedListsSlice.reducer;
