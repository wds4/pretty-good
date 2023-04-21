import { createSlice } from '@reduxjs/toolkit';

export const eBooksSlice = createSlice({
  name: 'eBooks',
  initialState: {
    currentFocus: {
      eBook: 'foo1',
      item: 'foo2',
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
        title: 'Threaded Tapestry',
        initialItemSlug: 'threadedTapestry',
        items: {
          conceptGraph: {
            name: "concept graph",
            title: "Concept Graph",
            descriptions: ["singleSentence","singleParagraph"]
          },
          grapevine: {
            name: "grapevine",
            title: "Grapevine",
            descriptions: ["singleSentence","singleParagraph"]
          },
          lockInMinimization: {
            name: "lock-in minimization",
            title: "Lock-in Minimization",
            descriptions: ["singleSentence","singleParagraph"]
          },
          tribalTapestry: {
            name: "tribal tapestry",
            title: "Tribal Tapestry",
            descriptions: ["singleSentence","singleParagraph"]
          },
          threadedTapestry: {
            name: 'threaded tapestry',
            title: 'Threaded Tapestry',
            descriptions: ["singleSentence","singleParagraph"],
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
            descriptions: {
              singleSentence: {
                name: 'single sentence',
              },
              singleParagraph: {
                name: 'single paragraph',
              },
            },
          },
        },
      },
    },
  },
  reducers: {
    updateCurrentEBookFocus: (state, action) => {
      state.currentFocus.eBook = action.payload;
    },
    updateCurrentItemFocus: (state, action) => {
      state.currentFocus.item = action.payload;
    },
    updateItemTypes: (state, action) => {
      // state.itemTypes = action.payload
    },
    updateEBooks: (state, action) => {
      // state.eBooks = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentEBookFocus,
  updateCurrentItemFocus,
  updateItemTypes,
  updateEBooks,
} = eBooksSlice.actions;

export default eBooksSlice.reducer;
