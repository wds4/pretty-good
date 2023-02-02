import { useSelector, useDispatch } from 'react-redux';
import { nip19 } from 'nostr-tools';
import {
  deleteRowFromMyNostrProfiles,
  updateMyNostrProfileSetActiveInSql,
} from '../../../../lib/pg/sql';
import { fetchMyProfile } from '../../../../redux/features/myNostrProfile/slice';
import { noProfilePicUrl } from '../../../../const';

export default function AllCurrentProfiles({
  aMyProfileData,
  updateMyProfile,
}) {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  const showPrivkey = (id) => () => {
    const e1 = document.getElementById(`privkeyContainer1_${id}`);
    const e2 = document.getElementById(`privkeyContainer2_${id}`);
    if (e1 && e2) {
      e1.style.display = 'none';
      e2.style.display = 'block';
    }
  };

  const updateSelectedProfile = (sqlId, index) => async () => {
    updateMyProfile(index);
    const result = await updateMyNostrProfileSetActiveInSql(sqlId);
    dispatch(fetchMyProfile());
  };

  const processFirstDeleteButton = (sqlId, index) => () => {
    const e = document.getElementById(`finalChanceDeleteContainerId_${sqlId}`);
    if (e) {
      e.style.display = 'inline-block';
    }
  };

  const processSecondDeleteButton = (sqlId, index) => async () => {
    console.log('processSecondDeleteButton');
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
      {aMyProfileData.map((oNextProfile: Object, index) => {
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
          avatarUrl = oNextProfile.picture_url
        }
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
                    onClick={processSecondDeleteButton(oNextProfile.id, index)}
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

                <div style={{ marginBottom: '5px' }}>
                  <div style={{ color: 'grey' }}>pubkey (hex):</div>
                  {oNextProfile.pubkey}
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <div style={{ color: 'grey' }}>pubkey (bech32):</div>
                  {nip19.npubEncode(oNextProfile.pubkey)}
                </div>

                <button
                  className="showPrivkeyButton doSomethingButton"
                  type="button"
                  onClick={showPrivkey(oNextProfile.id)}
                >
                  Show privkey (caution!)
                </button>
                <div
                  id={`privkeyContainer1_${oNextProfile.id}`}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    marginBottom: '5px',
                    height: '40px',
                    fontSize: '18px',
                  }}
                >
                  privkey (hidden)
                </div>
                <div
                  id={`privkeyContainer2_${oNextProfile.id}`}
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginBottom: '5px',
                    height: '40px',
                    display: 'none',
                  }}
                >
                  <div style={{ color: 'grey' }}>privkey:</div>
                  {oNextProfile.privkey}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
