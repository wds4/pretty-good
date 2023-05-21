import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';
import ToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { updateNostrRelaysForActiveUserInReduxAndNostr } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrRelaysForActiveUserInSql } from 'renderer/window1/lib/pg/sql';
import SingleUserRelaysList from './singleUserRelaysList';

const CuratedRelaysList = () => {
  const dispatch = useDispatch();
  const { publish } = useNostr();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const oRelaysFromMyFollowingList = useSelector(
    (state) => state.myNostrProfile.relaysFromMyFollowingList
  );
  const followingReviewedForRelaysList = useSelector(
    (state) => state.myNostrProfile.followingReviewedForRelaysList
  );
  const oMyRelays = myNostrProfile.relays;
  const aMyRelays = Object.keys(oMyRelays);

  const processStateChange = async (newState, url) => {
    console.log(`processStateChange; url: ${url}; newState: ${newState}`);

    const oRelaysUpdated = JSON.parse(JSON.stringify(myNostrProfile.relays));
    if (newState) {
      oRelaysUpdated[url] = { read: true, write: true };
    } else {
      delete oRelaysUpdated[url];
    }
    // update relays list for active user in redux store and broadcast to the nostr network
    dispatch(
      updateNostrRelaysForActiveUserInReduxAndNostr(
        oRelaysUpdated,
        myNostrProfile,
        publish
      )
    );
    // then transfer updated settings to the nostr settings store, which makes them the active relay list
    updateNostrRelaysForActiveUserInSql(oRelaysUpdated);
    dispatch(resetNostrSettingsNostrRelays(oRelaysUpdated));
  };

  const aRelaysFromMyFollowingList = Object.keys(oRelaysFromMyFollowingList);
  aRelaysFromMyFollowingList.sort(function (a, b) {
    return (
      oRelaysFromMyFollowingList[b].length -
      oRelaysFromMyFollowingList[a].length
    );
  });

  return (
    <>
      <div className="h4">Curated Relays List</div>
      <div style={{fontSize:'14px', backgroundColor: 'white',padding:'4px',margin: '5px 0px 5px 0px'}}>
        This is a list of relays currently in use by the users in my follower
        list, ranked by the number of profiles using that relay. The toggle
        button allows you to add / remove that relay from your current list of
        active relays.
      </div>
      <div style={{textAlign: 'center', marginBottom: '5px'}}># of relays: {aRelaysFromMyFollowingList.length}</div>
      <div style={{textAlign: 'center', marginBottom: '5px'}}>
        # following relay lists checked: {followingReviewedForRelaysList.length} / {aFollowing.length}
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'grey',
          color: 'white',
          padding: '3px',
        }}
      >
        <div
          style={{ textAlign: 'center', display: 'inline-block', width: '50%', overflow: 'scroll' }}
        >
          relay url
        </div>
        <div style={{ display: 'inline-block', width: '30px' }}>
          #
        </div>
        <div
          className="singleRelayUrlRWContainer"
          style={{ display: 'inline-block', width: '40%' }}
        >
          add to / remove from my relays list
        </div>
      </div>
      {aRelaysFromMyFollowingList.map((relayUrl) => {
        const aProfiles = oRelaysFromMyFollowingList[relayUrl];
        const numProfiles = aProfiles.length;
        const toggleSwitchLabel = relayUrl;
        let initState = false;
        if (aMyRelays.includes(relayUrl)) {
          initState = true;
        }
        return (
          <>
            <div style={{ fontSize: '14px', padding: '2px', marginTop: '5px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '50%',
                  overflow: 'scroll',
                }}
              >
                {relayUrl}
              </div>
              <div style={{ display: 'inline-block', width: '30px' }}>
                {numProfiles}
              </div>
              <div
                className="singleRelayUrlRWContainer"
                style={{ display: 'inline-block', width: '100px' }}
              >
                <ToggleSwitch
                  label={toggleSwitchLabel}
                  processStateChange={(newState) =>
                    processStateChange(newState, relayUrl)
                  }
                  initState={initState}
                />
              </div>
            </div>
          </>
        );
      })}
      {aFollowing.map((pk) => {
        if (!followingReviewedForRelaysList.includes(pk)) {
          return (
            <>
              <SingleUserRelaysList pubkey={pk} />
            </>
          );
        }
      })}
    </>
  );
};
export default CuratedRelaysList;
