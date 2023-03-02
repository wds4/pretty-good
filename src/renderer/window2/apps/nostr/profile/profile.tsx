import { useSelector } from 'react-redux';
import MainProfile from './mainProfile';
import UserPanel from './userPanel';

const Profile = () => {
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  return (
    <>
      <MainProfile pubkey={pubkey} />
      <UserPanel pubkey={pubkey} />
    </>
  );
};

export default Profile;
