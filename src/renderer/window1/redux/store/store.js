import { configureStore } from '@reduxjs/toolkit';
import myProfileReducer from '../features/myProfile/myProfileSlice';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    myProfile: myProfileReducer,
  }
});
