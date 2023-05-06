import { createSlice } from '@reduxjs/toolkit';

export const eBooksSlice = createSlice({
  name: 'eBooks',
  initialState: {
    currentFocus: {
      eBook: 'threadedTapestry',
      item: 'threadedTapestry',
      previousTopics: [],
      version: 'singleSentence',
    },
    itemTypes: {
      notes: {
        name: 'notes',
      },
      singleSentence: {
        name: 'single sentence',
      },
      singleParagraph: {
        name: 'single paragraph',
      },
      singlePage: {
        name: 'single page',
      },
      singleChapter: {
        name: 'single chapter',
      },
    },
    eBooks: {
      threadedTapestry: {
        slug: 'threadedTapestry',
        name: 'threaded tapestry',
        title: 'Threaded Tapestry',
        initialItemSlug: 'threadedTapestry',
        items: {
          chunk: {
            name: 'chunk',
            title: 'Chunk',
            aliases: [
              {
                name: 'data chunk',
              },
            ],
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          classCreation: {
            name: 'class creation',
            title: 'Class Creation',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          classCriteria: {
            name: 'class criteria',
            title: 'Class Criteria',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          classNode: {
            name: 'class node',
            title: 'Class Node',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          classThread: {
            name: 'class thread',
            title: 'Class Thread',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          concept: {
            name: 'concept',
            title: 'Concept',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          conceptGraph: {
            name: 'concept graph',
            title: 'Concept Graph',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          dataDuality: {
            name: 'data duality',
            title: 'Data Duality',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          decentralizedDistributedSystem: {
            name: 'decentralized, distributed system',
            title: 'Decentralized, Distributed System',
            descriptions: ['singleParagraph', 'singlePage'],
          },
          grapevine: {
            name: 'grapevine',
            title: 'Grapevine',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          knowledgeCuration: {
            name: 'knowledge curation',
            title: 'Knowledge Curation',
            descriptions: ['singleParagraph'],
          },
          knowledgeRepresentation: {
            name: 'knowledge representation',
            title: 'Knowledge Representation',
            descriptions: ['singleParagraph'],
          },
          lockInMinimization: {
            name: 'lock-in minimization',
            title: 'Lock-in Minimization',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          looseConsensus: {
            name: 'loose consensus',
            title: 'Loose Consensus',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          neuronalTapestry: {
            name: 'neuronal tapestry',
            title: 'Neuronal Tapestry',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          primaryChallenge: {
            name: 'primary challenge',
            title: 'Primary Challenge',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          setNode: {
            name: 'set node',
            title: 'Set Node',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          specificInstance: {
            name: 'specific instance',
            title: 'Specific Instance',
            aliases:[
              {
                slug: "classInstance",
              },
              {
                slug: "instance",
              },
            ],
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          thread: {
            name: 'thread',
            title: 'Thread',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          threadedTapestry: {
            name: 'threaded tapestry',
            title: 'Threaded Tapestry',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
              "notes",
            ],
          },
          threadedTapestryImplementation: {
            name: 'threaded tapestry implementation',
            title: 'Threaded Tapestry Implementation',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          topologicalDataCompletion: {
            name: 'topological data completion',
            title: 'Topological Data Completion',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          topologicalDataEncoding: {
            name: 'topological data encoding',
            title: 'Topological Data Encoding',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          toxicThread: {
            name: 'toxic thread',
            title: 'Toxic Thread',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
          tribalTapestry: {
            name: 'tribal tapestry',
            title: 'Tribal Tapestry',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
        },
      },
      book2: {
        slug: 'book2',
        name: 'book 2',
        title: 'Book 2',
        initialItemSlug: 'book2',
        items: {
          book2: {
            name: 'foo',
            title: 'Foo',
            descriptions: [
              'singleSentence',
              'singleParagraph',
              'singlePage',
              'singleChapter',
            ],
          },
        },
      },
    },
  },
  reducers: {
    updateCurrentEBookFocus: (state, action) => {
      state.currentFocus.eBook = action.payload;
      state.currentFocus.previousTopics = [];
      state.currentFocus.item = state.eBooks[action.payload].initialItemSlug;
    },
    updateCurrentItemFocus: (state, action) => {
      const prevItem = state.currentFocus.item;
      const newItem = action.payload;
      state.currentFocus.item = newItem;
      state.currentFocus.previousTopics.unshift(prevItem);
      // state.currentFocus.version = "singleSentence"; // may deprecate this and set to first entry in the relevant array, if not empty
      const { eBook } = state.currentFocus;
      state.currentFocus.version =
        state.eBooks[eBook].items[newItem].descriptions[0];
    },
    updateCurrentVersionFocus: (state, action) => {
      state.currentFocus.version = action.payload;
    },
    updateItemTypes: (state, action) => {
      // state.itemTypes = action.payload
    },
    updateEBooks: (state, action) => {
      // state.eBooks = action.payload
    },
    goToPreviousTopic: (state, action) => {
      const aPreviousTopics = state.currentFocus.previousTopics;
      if (aPreviousTopics.length > 0) {
        const topic = aPreviousTopics[0];
        console.log(`goToPreviousTopic ${topic}`);
        state.currentFocus.item = topic;
        state.currentFocus.previousTopics.shift();
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentEBookFocus,
  updateCurrentItemFocus,
  updateCurrentVersionFocus,
  updateItemTypes,
  updateEBooks,
  goToPreviousTopic,
} = eBooksSlice.actions;

export default eBooksSlice.reducer;
