import { configureStore } from '@reduxjs/toolkit';
import myProfileReducer from '../features/nostr/myNostrProfile/slice';
import counterReducer from '../features/counter/slice';
import startupReducer from '../features/startup/slice';
import nostrSettingsReducer from '../features/nostr/settings/slice';
import nostrProfilesReducer from '../features/nostr/profiles/slice';
import nostrDirectMessagesReducer from '../features/nostr/directMessages/slice';
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
    nostrSettings: nostrSettingsReducer,
    nostrProfiles: nostrProfilesReducer,
    nostrDirectMessages: nostrDirectMessagesReducer,
    prettyGoodGlobalState: prettyGoodGlobalStateReducer,
  }
});
export default store;
