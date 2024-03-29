import { configureStore } from '@reduxjs/toolkit';
import myProfileReducer from '../features/nostr/myNostrProfile/slice';
import counterReducer from '../features/counter/slice';
import startupReducer from '../features/startup/slice';
import nostrSettingsReducer from '../features/nostr/settings/slice';
import nostrProfilesReducer from '../features/nostr/profiles/slice';
import nostrDirectMessagesReducer from '../features/nostr/directMessages/slice';
import prettyGoodGlobalStateReducer from '../features/prettyGood/settings/slice';
import nostrGrapevineTrustRatingPresetsReducer from '../features/grapevine/grapevineTrustRatingPresets/slice';
import nostrNotesReducer from '../features/nostr/notes/slice';
import listCurationReducer from '../features/grapevine/listCuration/slice';
import controlPanelSettingsReducer from '../features/grapevine/controlPanelSettings/slice';
import compositeTrustScoresReducer from '../features/grapevine/compositeTrustScores/slice';
import curatedListsReducer from '../features/curatedLists/lists/slice';
import curatedListsSettingsReducer from '../features/curatedLists/settings/slice';
import nip51Reducer from '../features/nip51/lists/slice';
import nip51SettingsReducer from '../features/nip51/settings/slice';
import eBooksReducer from '../features/eBooks/slice';

import channelsReducer from '../features/curatedChannels/channels/slice';
import channelsSettingsReducer from '../features/curatedChannels/settings/slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    startup: startupReducer,
    myNostrProfile: myProfileReducer,
    nostrSettings: nostrSettingsReducer,
    nostrProfiles: nostrProfilesReducer,
    nostrDirectMessages: nostrDirectMessagesReducer,
    prettyGoodGlobalState: prettyGoodGlobalStateReducer,
    nostrGrapevineTrustRatingPresets: nostrGrapevineTrustRatingPresetsReducer,
    nostrNotes: nostrNotesReducer,
    listCuration: listCurationReducer,
    controlPanelSettings: controlPanelSettingsReducer,
    compositeTrustScores: compositeTrustScoresReducer,
    curatedLists: curatedListsReducer,
    curatedListsSettings: curatedListsSettingsReducer,
    nip51: nip51Reducer,
    nip51Settings: nip51SettingsReducer,
    eBooks: eBooksReducer,
    channels: channelsReducer,
    channelsSettings: channelsSettingsReducer,
  }
});
export default store;

//
