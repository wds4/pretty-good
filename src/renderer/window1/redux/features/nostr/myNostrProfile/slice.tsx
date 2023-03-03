import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import {
  addStringToArrayUniquely,
  removeStringFromArray,
} from 'renderer/window1/lib/pg/index';
import {
  fetchMyActiveNostrProfileFromSql,
  updateMyFullNostrProfileInSql,
} from 'renderer/window1/lib/pg/sql';
import { noProfilePicUrl, noBannerPicUrl } from 'renderer/window1/const';
import { oDefaultRelayUrls } from 'main/const/nostr';
import { dateToUnix } from 'nostr-react';
import {
  nip19,
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const initialState = {
  // booleans
  showWelcomeBox: false,
  multiClientAccess: false, // whether this profile will be managed from multiple clients or not; if yes, updates are autoimported from the network
  relaysAutoUpdate: false,
  relaysAutoMerge: false,

  // strings
  pubkey_hex: undefined,
  pubkey_bech32: undefined,
  privkey: undefined,
  name: 'Satoshi Nakamoto',
  display_name: 'satoshi',
  picture_url: noProfilePicUrl,
  banner_url: noBannerPicUrl,
  website: 'https://www.bitcointalk.org',
  about: 'inventor of bitcoin',
  nip05: undefined,
  lud06: undefined,

  // unix timestamps
  created_at: 0,
  lastUpdate: 0, // when nostr profile data was last updated locally (in sql), not including relays list or following list
  followingListLastUpdate: 0, // when following list was last updated (locally, in sql)
  relaysListLastUpdate: 0, // when relays list was last updated (locally, in sql)

  // arrays of pubkeys
  followers: [], // array of pubkeys
  following: [], // array of pubkeys
  extendedFollowing: [], // array of pubkeys
  followingForRelays: [], // array of pubkeys
  endorseAsRelaysPicker: [], // array of pubkeys
  endorseAsRelaysPickerHunter: [], // array of pubkeys

  // objects
  relays: oDefaultRelayUrls,

  // notifications: [],
  // readNotifications: new Date().getTime(),
  // dms: [],
} as MyProfileStore;

export const myProfileSlice = createSlice({
  name: 'myNostrProfile',
  initialState,
  reducers: {
    initMyActiveNostrProfile: (state, action) => {
      const oMyProfileData = action.payload;
      // console.log("initMyActiveNostrProfile; oMyProfileData: "+JSON.stringify(oMyProfileData))
      state.name = oMyProfileData?.name;
      // console.log("initMyActiveNostrProfile; oMyProfileData?.name: "+oMyProfileData?.name)
      state.display_name = oMyProfileData?.display_name;
      state.pubkey_hex = oMyProfileData?.pubkey;
      state.pubkey_bech32 = nip19.npubEncode(oMyProfileData?.pubkey);
      state.privkey = oMyProfileData?.privkey;
      state.website = oMyProfileData?.website;
      state.about = oMyProfileData?.about;
      state.nip05 = oMyProfileData?.nip05;
      state.lud06 = oMyProfileData?.lud06;
      state.created_at = oMyProfileData?.created_at;
      state.lastUpdate = oMyProfileData?.lastUpdate;
      state.relaysListLastUpdate = oMyProfileData?.relaysListLastUpdate;
      state.followingListLastUpdate = oMyProfileData?.followingListLastUpdate;

      // booleans
      state.multiClientAccess = oMyProfileData?.multiClientAccess;
      state.relaysAutoUpdate = oMyProfileData?.relaysAutoUpdate;
      state.relaysAutoMerge = oMyProfileData?.relaysAutoMerge;

      // arrays of pubkeys
      if (oMyProfileData?.followers) { state.followers = JSON.parse(oMyProfileData?.followers); }
      if (oMyProfileData?.following) { state.following = JSON.parse(oMyProfileData?.following); }
      if (oMyProfileData?.extendedFollowing) { state.extendedFollowing = JSON.parse(oMyProfileData?.extendedFollowing); }
      if (oMyProfileData?.followingForRelays) { state.followingForRelays = JSON.parse(oMyProfileData?.followingForRelays); }
      if (oMyProfileData?.endorseAsRelaysPicker) { state.endorseAsRelaysPicker = JSON.parse(oMyProfileData?.endorseAsRelaysPicker); }
      if (oMyProfileData?.endorseAsRelaysPickerHunter) { state.endorseAsRelaysPickerHunter = JSON.parse(oMyProfileData?.endorseAsRelaysPickerHunter); }

      if (oMyProfileData?.picture_url) {
        state.picture_url = oMyProfileData?.picture_url
      } else {
        state.picture_url = noProfilePicUrl;
      }

      if (oMyProfileData?.banner_url) {
        state.banner_url = oMyProfileData?.banner_url
      } else {
        state.banner_url = noBannerPicUrl;
      }

      if (oMyProfileData?.relays) {
        state.relays = JSON.parse(oMyProfileData?.relays)
      } else {
        state.relays = oDefaultRelayUrls;
      }
      if ( oMyProfileData?.relays === null || oMyProfileData?.relays === undefined) {
        // state.relays = {};
      }

    },
    updatePubkeyHex: (state, action) => {
      state.pubkey_hex = action.payload;
    },
    updatePubkeyBech32: (state, action) => {
      state.pubkey_bech32 = action.payload;
    },
    updatePrivkey: (state, action) => {
      state.privkey = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateDisplayName: (state, action) => {
      state.display_name = action.payload;
    },
    updatePictureUrl: (state, action) => {
      state.picture_url = action.payload;
    },
    updateBannerUrl: (state, action) => {
      state.banner_url = action.payload;
    },
    updateWebsite: (state, action) => {
      state.website = action.payload;
    },
    updateAbout: (state, action) => {
      state.about = action.payload;
    },
    updateNip05: (state, action) => {
      state.nip05 = action.payload;
    },
    updateLud06: (state, action) => {
      state.lud06 = action.payload;
    },

    // MANAGE TIMESTAMPS
    updateCreatedAt: (state, action) => {
      state.created_at = action.payload;
    },
    updateLastUpdate: (state, action) => {
      state.lastUpdate = action.payload;
    },
    updateFollowingListLastUpdate: (state, action) => {
      state.followingListLastUpdate = action.payload;
    },
    updateRelaysListLastUpdate: (state, action) => {
      state.relaysListLastUpdate = action.payload;
    },
    ///////////////////////////

    // UPDATE BOOLEAN VARS
    updateMultiClientAccess: (state, action) => {
      state.multiClientAccess = action.payload;
      const res = updateMyFullNostrProfileInSql(state);
    },
    updateRelaysAutoUpdate: (state, action) => {
      state.relaysAutoUpdate = action.payload;
      const res = updateMyFullNostrProfileInSql(state);
    },
    updateRelaysAutoMerge: (state, action) => {
      state.relaysAutoMerge = action.payload;
      const res = updateMyFullNostrProfileInSql(state);
    },
    updateShowWelcomeBox: (state, action) => {
      state.showWelcomeBox = action.payload;
    },
    ///////////////////////////

    updateExtendedFollowing: (state, action) => {
      let aExtendedFollowing = [];
      if (action.payload) {
        aExtendedFollowing = action.payload;
      }
      console.log("updateExtendedFollowing; aExtendedFollowing: "+JSON.stringify(aExtendedFollowing))
      state.extendedFollowing = aExtendedFollowing;
      const res = updateMyFullNostrProfileInSql(state);
    },

    // MANAGE FOLLOWERS
    updateFollowers: (state, action) => {
      let aFollowers = [];
      if (action.payload) {
        aFollowers = action.payload;
      }
      state.followers = aFollowers;
    },
    ///////////////////////////

    // MANAGE FOLLOWING
    addToFollowingList: (state, action) => {
      // pass in pubkey; add to following list if not already there
      if (!state.following) {
        state.following = [];
      }
      state.following = addStringToArrayUniquely(
        action.payload,
        state.following
      );
      const res = updateMyFullNostrProfileInSql(state);
    },
    removeFromFollowingList: (state, action) => {
      // pass in pubkey; remove from following list if it is currently there
      if (!state.following) {
        state.following = [];
      }
      state.following = removeStringFromArray(action.payload, state.following);
      const res = updateMyFullNostrProfileInSql(state);
    },
    updateFollowing: (state, action) => {
      // pass in a complete array of following by pubkey
      let aFollowing = [];
      if (action.payload) {
        aFollowing = action.payload;
      }
      console.log(`updateFollowing; action.payload: ${JSON.stringify(action.payload)}; aFollowing: ${JSON.stringify(aFollowing)}`)
      state.following = aFollowing;
    },
    ///////////////////////////

    // MANAGE followingForRelays
    addToFollowingForRelaysList: (state, action) => {
      // pass in pubkey; add to followingForRelays list if not already there
      console.log("qwerty addToFollowingForRelaysList; action.payload: "+action.payload);
      if (!state.followingForRelays) {
        state.followingForRelays = [];
      }
      console.log("qwerty addToFollowingForRelaysList; state.followingForRelays A: "+JSON.stringify(state.followingForRelays));
      state.followingForRelays = addStringToArrayUniquely(
        action.payload,
        state.followingForRelays
      );
      console.log("qwerty addToFollowingForRelaysList; state.followingForRelays B: "+JSON.stringify(state.followingForRelays));
      const res = updateMyFullNostrProfileInSql(state);
    },
    removeFromFollowingForRelaysList: (state, action) => {
      // pass in pubkey; remove from followingForRelays list if it is currently there
      if (!state.followingForRelays) {
        state.followingForRelays = [];
      }
      state.followingForRelays = removeStringFromArray(action.payload, state.followingForRelays);
      const res = updateMyFullNostrProfileInSql(state);
    },
    ///////////////////////////

    // MANAGE endorseAsRelaysPicker
    addToEndorseAsRelaysPickerList: (state, action) => {
      // pass in pubkey; add to following list if not already there
      if (!state.endorseAsRelaysPicker) {
        state.endorseAsRelaysPicker = [];
      }
      state.endorseAsRelaysPicker = addStringToArrayUniquely(
        action.payload,
        state.endorseAsRelaysPicker
      );
      const res = updateMyFullNostrProfileInSql(state);
    },
    removeFromEndorseAsRelaysPickerList: (state, action) => {
      // pass in pubkey; remove from following list if it is currently there
      if (!state.endorseAsRelaysPicker) {
        state.endorseAsRelaysPicker = [];
      }
      state.endorseAsRelaysPicker = removeStringFromArray(action.payload, state.endorseAsRelaysPicker);
      const res = updateMyFullNostrProfileInSql(state);
    },

    // MANAGE endorseAsRelaysPickerHunter
    addToEndorseAsRelaysPickerHunterList: (state, action) => {
      // pass in pubkey; add to following list if not already there
      if (!state.endorseAsRelaysPickerHunter) {
        state.endorseAsRelaysPickerHunter = [];
      }
      state.endorseAsRelaysPickerHunter = addStringToArrayUniquely(
        action.payload,
        state.endorseAsRelaysPickerHunter
      );
      const res = updateMyFullNostrProfileInSql(state);
    },
    removeFromEndorseAsRelaysPickerHunterList: (state, action) => {
      // pass in pubkey; remove from following list if it is currently there
      if (!state.endorseAsRelaysPickerHunter) {
        state.endorseAsRelaysPickerHunter = [];
      }
      state.endorseAsRelaysPickerHunter = removeStringFromArray(action.payload, state.endorseAsRelaysPickerHunter);
      const res = updateMyFullNostrProfileInSql(state);
    },

    // MANAGE RELAYS
    addNewRelay: (state, action) => {
      const url = action.payload;
      state.relays[url] = { read: true, write: true}
    },
    removeRelay: (state, action) => {
      const url = action.payload;
      delete state.relays[url];
    },
    updateRelays: (state, action) => {
      let oRelays = [];
      if (action.payload) {
        oRelays = action.payload;
      }
      state.relays = oRelays;
    },
    ///////////////////////////
  },
});

// Action creators are generated for each case reducer function
export const {
  initMyActiveNostrProfile,
  updatePubkeyHex,
  updatePubkeyBech32,
  updatePrivkey,
  updateName,
  updateDisplayName,
  updatePictureUrl,
  updateBannerUrl,
  updateWebsite,
  updateAbout,
  updateFollowers,
  updateRelays,
  updateNip05,
  updateLud06,
  updateCreatedAt,
  updateLastUpdate,
  updateFollowingListLastUpdate,
  updateRelaysListLastUpdate,

  updateMultiClientAccess,
  updateRelaysAutoUpdate,
  updateRelaysAutoMerge,

  addToFollowingList,
  removeFromFollowingList,
  updateFollowing,

  addToEndorseAsRelaysPickerList,
  removeFromEndorseAsRelaysPickerList,

  addToEndorseAsRelaysPickerHunterList,
  removeFromEndorseAsRelaysPickerHunterList,

  updateExtendedFollowing,

  addToFollowingForRelaysList,
  removeFromFollowingForRelaysList,

  addNewRelay,
  removeRelay,
  updateShowWelcomeBox,
} = myProfileSlice.actions;

export default myProfileSlice.reducer;

export const refreshMyActiveNostrProfile = () => async (dispatch) => {
  const oMyActiveNostrProfileData = await fetchMyActiveNostrProfileFromSql(false);
  // console.log(`refreshMyActiveNostrProfile; oMyProfileData: ${JSON.stringify(oMyProfileData, null, 4)}`);
  dispatch(initMyActiveNostrProfile(oMyActiveNostrProfileData));

  /*
  // dispatch(updateName(oMyProfileData.name));
  dispatch(updateFollowing(JSON.parse(oMyProfileData.following)));
  dispatch(updateFollowers(JSON.parse(oMyProfileData.followers)));
  if (oMyProfileData.relays !== null) {
    dispatch(updateRelays(JSON.parse(oMyProfileData.relays))); // UNCOMMENT THIS ONCE FULL SUPPORT ADDED: sql relays col exists, etc.
  } else {
    dispatch(updateRelays(oDefaultRelayUrls));
  }
  dispatch(updateDisplayName(oMyProfileData.display_name));
  dispatch(updatePubkeyHex(oMyProfileData.pubkey));
  dispatch(updatePubkeyBech32(nip19.npubEncode(oMyProfileData.pubkey)));

  dispatch(updatePrivkey(oMyProfileData.privkey));
  dispatch(updateWebsite(oMyProfileData.website));
  dispatch(updateAbout(oMyProfileData.about));
  if (!oMyProfileData.picture_url) {
    dispatch(updatePictureUrl(noProfilePicUrl));
  } else {
    dispatch(updatePictureUrl(oMyProfileData.picture_url));
  }
  if (!oMyProfileData.banner_url) {
    dispatch(updateBannerUrl(noBannerPicUrl));
  } else {
    dispatch(updateBannerUrl(oMyProfileData.banner_url));
  }

  dispatch(updateNip05(oMyProfileData.nip05));
  dispatch(updateLud06(oMyProfileData.lud06));
  dispatch(updateCreatedAt(oMyProfileData.created_at));
  dispatch(updateLastUpdate(oMyProfileData.lastUpdate));
  dispatch(
    updateFollowingListLastUpdate(oMyProfileData.followingListLastUpdate)
  );
  dispatch(updateRelaysListLastUpdate(oMyProfileData.relaysListLastUpdate));
  dispatch(updateMultiClientAccess(oMyProfileData.multiClientAccess));
  */
};

// used to update in sql but now does not
export const updateNostrRelaysForActiveUserInReduxAndNostr =
  (oRelaysUpdated,myNostrProfile,publish) => async (dispatch) => {
    // const { publish } = useNostr();
    // access following list and relays list from redux store and publish an event with current lists to nostr
    console.log(
      'updateNostrRelaysForActiveUserInReduxAndNostr; myNostrProfile B: ' +
        JSON.stringify(myNostrProfile)
    );
    console.log(
      'updateNostrRelaysForActiveUserInReduxAndNostr; oRelaysUpdated: ' +
        JSON.stringify(oRelaysUpdated)
    );
    // update in store: myNostrProfile for current user; this also updates in sql for current (active) user
    // NO LONGER UPDATES IN SQL
    dispatch(updateRelays(oRelaysUpdated));
    // broadcast to nostr
    const myPrivkey = myNostrProfile.privkey;
    const aCurrentFollowingList = myNostrProfile.following;
    console.log(
      'updateFollowingAndRelaysListsInNostr; oRelaysUpdated: ' +
        JSON.stringify(oRelaysUpdated) +
        '; aCurrentFollowingList: ' +
        JSON.stringify(aCurrentFollowingList)
    );
    const aFollowing = [];
    for (let x = 0; x < aCurrentFollowingList.length; x++) {
      const nextFollowing = aCurrentFollowingList[x];
      const aNext = [ 'p', nextFollowing ]
      aFollowing.push(aNext);
    }
    const event: NostrEvent = {
      created_at: dateToUnix(),
      kind: 3,
      tags: aFollowing,
      content: JSON.stringify(oRelaysUpdated),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    console.log(`updateFollowingAndRelaysListsInNostr; event: ${JSON.stringify(event)}`);

    publish(event);
  };
