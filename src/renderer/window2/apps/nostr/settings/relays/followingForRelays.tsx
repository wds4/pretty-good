import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';
import MiniProfile from './miniProfile';

const FollowingForRelays = () => {
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
            return (
              <>
              <div>
                <MiniProfile
                  pubkey={pk}
                />
              </div>
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
