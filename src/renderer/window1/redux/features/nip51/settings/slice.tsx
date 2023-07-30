import { createSlice } from '@reduxjs/toolkit';

export const nip51SettingsSlice = createSlice({
  name: 'nip51Settings',
  initialState: {
    foo: false,
  },
  reducers: {

  }
});

// Action creators are generated for each case reducer function

export const {
} = nip51SettingsSlice.actions;

export default nip51SettingsSlice.reducer;
