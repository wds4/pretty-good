import { configureStore } from '@reduxjs/toolkit';
import myProfileReducer from '../features/myNostrProfile/slice';
import counterReducer from '../features/counter/slice';
import startupReducer from '../features/startup/slice';
import nostrGlobalStateReducer from '../features/nostr/settings/slice';
import prettyGoodGlobalStateReducer from '../features/prettyGood/settings/slice';

/*
export default configureStore({
  reducer: {
    counter: counterReducer,
    startup: startupReducer,
    myNostrProfile: myProfileReducer,
  }
});
*/

const store = configureStore({
  reducer: {
    counter: counterReducer,
    startup: startupReducer,
    myNostrProfile: myProfileReducer,
    nostrGlobalState: nostrGlobalStateReducer,
    prettyGoodGlobalState: prettyGoodGlobalStateReducer,
  }
});
export default store;
