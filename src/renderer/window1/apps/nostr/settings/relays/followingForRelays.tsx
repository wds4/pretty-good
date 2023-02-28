import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';

const FollowingForRelays = () => {
  const { publish } = useNostr();
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  return (
    <>
      <div style={{ display: 'inline-block', border: '1px dashed grey' }}>
      <center>Following for relays</center>
      list of profiles I am following
      </div>
    </>
  );
};
export default FollowingForRelays;
