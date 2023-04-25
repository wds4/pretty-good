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
          conceptGraph: {
            name: "concept graph",
            title: "Concept Graph",
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
          },
          decentralizedDistributedSystem: {
            name: "decentralized, distributed system",
            title: "Decentralized, Distributed System",
            descriptions: ["singleParagraph"],
          },
          grapevine: {
            name: "grapevine",
            title: "Grapevine",
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
          },
          knowledgeCuration: {
            name: "knowledge curation",
            title: "Knowledge Curation",
            descriptions: ["singleParagraph"],
          },
          knowledgeRepresentation: {
            name: "knowledge representation",
            title: "Knowledge Representation",
            descriptions: ["singleParagraph"],
          },
          lockInMinimization: {
            name: "lock-in minimization",
            title: "Lock-in Minimization",
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
          },
          neuronalTapestry: {
            name: "neuronal tapestry",
            title: "Neuronal Tapestry",
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
          },
          threadedTapestry: {
            name: 'threaded tapestry',
            title: 'Threaded Tapestry',
            descriptions: ["singleSentence","singleParagraph","singleChapter"],
          },
          tribalTapestry: {
            name: "tribal tapestry",
            title: "Tribal Tapestry",
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
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
            descriptions: ["singleSentence","singleParagraph","singlePage","singleChapter"],
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
      state.currentFocus.previousTopics.unshift(prevItem)
      // state.currentFocus.version = "singleSentence"; // may deprecate this and set to first entry in the relevant array, if not empty
      const eBook = state.currentFocus.eBook;
      state.currentFocus.version = state.eBooks[eBook].items[newItem].descriptions[0];
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
    }
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
