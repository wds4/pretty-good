import { useSelector } from 'react-redux';
import MainProfile from './mainProfile';
import UserPanel from './userPanel';

const Profile = () => {
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  return (
    <>
      <div style={{paddingBottom: '20px'}}>
        <MainProfile pubkey={pubkey} />
        <UserPanel pubkey={pubkey} />
      </div>
    </>
  );
};

export default Profile;
