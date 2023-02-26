import { useSelector, useDispatch } from 'react-redux';
import { nip19, getPublicKey } from 'nostr-tools';
import {
  deleteRowFromMyNostrProfiles,
  updateMyNostrProfileSetActiveInSql,
} from 'renderer/window1/lib/pg/sql';
import { checkPrivkeyHexValidity } from 'renderer/window1/lib/nostr';
import { fetchMyProfile } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
// import ActivateNostrRelaysOfCurrentUser from 'renderer/window1/redux/features/nostr/settings/slice';

import { noProfilePicUrl } from '../../../../const';

const ActivateNostrRelaysOfCurrentUser = () => {
  const dispatch = useDispatch();
  // fetch relays from the currently active nostr user
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const oRelays = myNostrProfile.relays;
  // then transfer those settings to the nostr settings store, which makes them the active relay list
  dispatch(resetNostrSettingsNostrRelays(oRelays));
  return (
    <>
    </>
  )
}

export default function AllCurrentProfiles({
  aMyProfilesData,
  updateMyProfile,
}) {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  const showPrivkeyHex = (id) => () => {
    const e1 = document.getElementById(`privkeyHexContainer1_${id}`);
    const e2 = document.getElementById(`privkeyHexContainer2_${id}`);
    if (e1 && e2) {
      e1.style.display = 'none';
      e2.style.display = 'block';
    }
  };

  const showPrivkeyBech32 = (id) => () => {
    const e1 = document.getElementById(`privkeyBech32Container1_${id}`);
    const e2 = document.getElementById(`privkeyBech32Container2_${id}`);
    if (e1 && e2) {
      e1.style.display = 'none';
      e2.style.display = 'block';
    }
  };

  const updateSelectedProfile = (sqlId, index) => async () => {
    console.log("updateSelectedProfile; sqlId: "+sqlId+"; index: "+index)
    updateMyProfile(index); // updates which profile has active=true in state; that's it
    const result = await updateMyNostrProfileSetActiveInSql(sqlId); // updates which profile has active=true in sql; that's it
    dispatch(fetchMyProfile());


    // activateNostrRelaysOfCurrentUser();
    // dispatch(resetNostrSettingsNostrRelays(myNostrProfile.relays));

  };

  const processFirstDeleteButton = (sqlId, index) => () => {
    const e = document.getElementById(`finalChanceDeleteContainerId_${sqlId}`);
    if (e) {
      e.style.display = 'inline-block';
    }
  };

  const processSecondDeleteButton = (sqlId, index) => async () => {
    await deleteRowFromMyNostrProfiles(sqlId);
    const e = document.getElementById(`deletedNoticeContainer_${sqlId}`);
    if (e) {
      e.style.display = 'inline-block';
    }
    const e2 = document.getElementById(`containerId_${sqlId}`);
    if (e2) {
      e2.style.backgroundColor = '#AFAFAF';
    }
  };
  return (
    <div className="infoBox">
      <div className="h4">All of my Nostr Profiles</div>
      <ActivateNostrRelaysOfCurrentUser />
      {aMyProfilesData.map((oNextProfile: Object, index) => {
        const containerId = `containerId_${oNextProfile.id}`;
        const finalChanceDeleteContainerId = `finalChanceDeleteContainerId_${oNextProfile.id}`;
        const deletedNoticeContainerId = `deletedNoticeContainer_${oNextProfile.id}`;
        let singleProfileDataContainerClassName =
          'singleProfileDataContainer singleProfileDataContainer_inactive';
        let isChecked = false;
        if (oNextProfile.active) {
          isChecked = true;
          singleProfileDataContainerClassName =
            'singleProfileDataContainer singleProfileDataContainer_active';
        }
        let avatarUrl = noProfilePicUrl;
        if (oNextProfile.picture_url) {
          avatarUrl = oNextProfile.picture_url;
        }
        const privkeyHex = oNextProfile.privkey;
        const isPkValid = checkPrivkeyHexValidity(privkeyHex);

        let sMultiClientAccess = 'DISABLED';
        let multiClientAccessClassName = 'mcaDisabled';
        if (oNextProfile.multiClientAccess) {
          sMultiClientAccess = 'ENABLED';
          multiClientAccessClassName = 'mcaEnabled';
        }

        const oRelays = JSON.parse(oNextProfile.relays)
        let numRelaysRead = 0;
        let numRelaysWrite = 0;
        for (let x=0;x<Object.keys(oRelays).length;x++) {
          const url = Object.keys(oRelays)[x];
          if (oRelays[url].read) { numRelaysRead += 1 }
          if (oRelays[url].write) { numRelaysWrite += 1 }
        }

        if (!isPkValid) {
          deleteRowFromMyNostrProfiles(oNextProfile.id);
          return (
            <>
              <div className={singleProfileDataContainerClassName}>
                INVALID PRIVKEY ... BEING DELETED
              </div>
            </>
          );
        }
        if (isPkValid) {
          const privkeyBech32 = nip19.nsecEncode(privkeyHex);
          let pubkeyHex = oNextProfile.pubkey;
          // console.log("pubkeyHex: "+pubkeyHex)

          if (pubkeyHex == 'undefined') {
            pubkeyHex = getPublicKey(privkeyHex);
          }
          // console.log("pubkeyHex: "+pubkeyHex)
          const pubkeyBech32 = nip19.npubEncode(pubkeyHex);
          return (
            <>
              <div
                id={containerId}
                className={singleProfileDataContainerClassName}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '20%',
                  }}
                >
                  <button
                    type="button"
                    onClick={processFirstDeleteButton(oNextProfile.id, index)}
                    className="deleteFirstTryButton doSomethingButton_small"
                  >
                    DELETE
                  </button>
                  <br />
                  Delete this profile, including keys, from local storage.
                  <br />
                  This cannot be undone!
                  <br />
                  <br />
                  <div
                    style={{ display: 'none' }}
                    id={finalChanceDeleteContainerId}
                  >
                    Are you sure???
                    <br />
                    <button
                      type="button"
                      onClick={processSecondDeleteButton(
                        oNextProfile.id,
                        index
                      )}
                      className="deleteLastChanceButton doSomethingButton_small"
                    >
                      YES, DELETE!
                    </button>
                    <div
                      id={deletedNoticeContainerId}
                      style={{ display: 'none' }}
                    >
                      DELETED
                    </div>
                  </div>
                </div>
                <div style={{ width: '5%', display: 'inline-block' }}>
                  <input
                    type="radio"
                    checked={isChecked}
                    className="activeProfileRadioButton"
                    name="myActiveProfile"
                    data-pubkey={oNextProfile.pubkey}
                    onChange={updateSelectedProfile(oNextProfile.id, index)}
                  />
                </div>
                <div style={{ width: '80%', display: 'inline-block' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      width: '75px',
                      height: '75px',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={avatarUrl}
                      className="myProfileAvatarImgSmall"
                      alt=""
                    />
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <div style={{ color: 'grey' }}>
                        sql id: {oNextProfile.id}
                      </div>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <div style={{ color: 'grey' }}>display name:</div>
                      {oNextProfile.display_name}
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <div style={{ color: 'grey' }}>name:</div>
                      {oNextProfile.name}
                    </div>
                  </div>

                  <div style={{ marginBottom: '5px', color: 'grey' }}>
                    multi client access:{' '}
                    <span className={multiClientAccessClassName}>
                      {sMultiClientAccess}
                    </span>
                  </div>

                  <div style={{ marginBottom: '5px', color: 'grey' }}>
                    <span style={{color: 'blue'}}>
                      {Object.keys(JSON.parse(oNextProfile.relays)).length}
                    </span>
                    {' '} relays ({numRelaysRead} read, {numRelaysWrite} write)
                  </div>

                  <div style={{ marginBottom: '5px' }}>
                    <div style={{ color: 'grey' }}>pubkey (hex):</div>
                    {pubkeyHex}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <div style={{ color: 'grey' }}>pubkey (bech32):</div>
                    {pubkeyBech32}
                  </div>

                  <button
                    className="showPrivkeyButton doSomethingButton"
                    style={{ marginLeft: '0px' }}
                    type="button"
                    onClick={showPrivkeyHex(oNextProfile.id)}
                  >
                    Show privkey (hex format) (caution!)
                  </button>
                  <div
                    id={`privkeyHexContainer1_${oNextProfile.id}`}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      marginBottom: '5px',
                      height: '40px',
                      fontSize: '18px',
                    }}
                  >
                    privkey, hex format (hidden)
                  </div>
                  <div
                    id={`privkeyHexContainer2_${oNextProfile.id}`}
                    style={{
                      border: '1px solid black',
                      padding: '5px',
                      marginBottom: '5px',
                      height: '40px',
                      display: 'none',
                    }}
                  >
                    <div style={{ color: 'grey' }}>privkey (hex):</div>
                    {oNextProfile.privkey}
                  </div>

                  <button
                    className="showPrivkeyButton doSomethingButton"
                    style={{ marginLeft: '0px' }}
                    type="button"
                    onClick={showPrivkeyBech32(oNextProfile.id)}
                  >
                    Show privkey (bech32 format; should start with nsec)
                    (caution!)
                  </button>
                  <div
                    id={`privkeyBech32Container1_${oNextProfile.id}`}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      marginBottom: '5px',
                      height: '40px',
                      fontSize: '18px',
                    }}
                  >
                    privkey, bech32 format (hidden)
                  </div>
                  <div
                    id={`privkeyBech32Container2_${oNextProfile.id}`}
                    style={{
                      border: '1px solid black',
                      padding: '5px',
                      marginBottom: '5px',
                      height: '40px',
                      display: 'none',
                    }}
                  >
                    <div style={{ color: 'grey' }}>privkey (bech32):</div>
                    {privkeyBech32}
                  </div>
                </div>
              </div>
            </>
          );
        }
      })}
    </div>
  );
}
