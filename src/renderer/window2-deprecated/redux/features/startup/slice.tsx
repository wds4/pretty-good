import { createSlice } from '@reduxjs/toolkit';

export const startupSlice = createSlice({
  name: 'startup',
  initialState: {
    runInitsCalled: false
  },
  reducers: {
    resetRunInitsCalledStatus: (state, action) => {
      state.runInitsCalled = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetRunInitsCalledStatus } = startupSlice.actions

export default startupSlice.reducer;
