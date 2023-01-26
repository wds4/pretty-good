import { createSlice } from '@reduxjs/toolkit';

const initState = {
  value: 0,
  publicKey: undefined,
  privateKey: undefined,
  name: 'default name',
  display_name: 'default display name',
  relays: {},
  follows: [],
  notifications: [],
  readNotifications: new Date().getTime(),
  dms: [],
} as LoginStore;

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState: initState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = myProfileSlice.actions

export default myProfileSlice.reducer;
