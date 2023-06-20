import { createSlice } from '@reduxjs/toolkit';

export const channelsSettingsSlice = createSlice({
  name: 'channelsSettings',
  initialState: {
    foo: null,
    activateChannelsBackgroundListener: true, // activates channels listener (all relevant notes) in curatedLists masthead
  },
  reducers: {
    updateFoo: (state, action) => {
      state.foo = action.payload;
    },
    updateBackgroundListener: (state, action) => {
      if (action.payload == "true") {
        state.activateChannelsBackgroundListener = true;
      }
      if (action.payload == "false") {
        state.activateChannelsBackgroundListener = false;
      }
      state.activateChannelsBackgroundListener = action.payload;
    },
  }
});

export const {
  updateFoo,
  updateBackgroundListener,
} = channelsSettingsSlice.actions;

export default channelsSettingsSlice.reducer;
