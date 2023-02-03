import { createSlice } from '@reduxjs/toolkit';

export const prettyGoodGlobalStateSlice = createSlice({
  name: 'prettyGoodGlobalState',
  initialState: {
    devMode: false,
  },
  reducers: {
    updateDevMode: (state, action) => {
      state.devMode = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function

export const {
  updateDevMode,
} = prettyGoodGlobalStateSlice.actions;

export default prettyGoodGlobalStateSlice.reducer;
