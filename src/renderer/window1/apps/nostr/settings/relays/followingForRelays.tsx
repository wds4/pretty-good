import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';
import MiniProfile from './miniProfile';

const FollowingForRelays = () => {
  const oKind3ProfilesData = useSelector((state) => state.nostrProfiles.kind3NostrProfiles);
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const { publish } = useNostr();
  const dispatch = useDispatch();
  const aFollowingForRelays = myNostrProfile.followingForRelays;
  return (
    <>
      <div style={{ width: '100%', border: '1px dashed grey' }}>
        <div className="h4">Recommended Relays Pickers</div>
        list of the relays lists I am following; number: {aFollowingForRelays.length}
        <div>
          {aFollowingForRelays.map((pk) => {
            let oRelays = {};
            if (oKind3ProfilesData.hasOwnProperty(pk)) {
              const oKind3Event = oKind3ProfilesData[pk];
              if (oKind3Event.hasOwnProperty('content') && oKind3Event.content) {
                oRelays = JSON.parse(oKind3Event.content);
              }
            }
            return (
              <>
              <div>
                <MiniProfile
                  pubkey={pk}
                />
              </div>
              {JSON.stringify(oRelays)}
              </>
            )
          })}
        </div>

        <div className="h4">Recommended Relays</div>
      </div>
    </>
  );
};
export default FollowingForRelays;
