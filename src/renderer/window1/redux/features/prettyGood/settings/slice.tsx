import { createSlice } from '@reduxjs/toolkit';

export const prettyGoodGlobalStateSlice = createSlice({
  name: 'prettyGoodGlobalState',
  initialState: {
    devMode: false,
    numBackSteps: 1,
    currentPage: null,
  },
  reducers: {
    updateDevMode: (state, action) => {
      state.devMode = action.payload;
    },
    resetNumBackSteps: (state) => {
      state.numBackSteps = 1;
    },
    setTwoBackSteps: (state) => {
      state.numBackSteps = 2;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function

export const {
  updateDevMode,
  resetNumBackSteps,
  setTwoBackSteps,
  setCurrentPage,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
