import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';

const DMConvoHeader = () => {
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivKey = myNostrProfile.privkey;
  return (
    <>
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <MiniProfile pubkey={pubkey} />
        <div
          style={{
            position: 'absolute',
            right: '0px',
            top: '0px',
            width: '40%',
            height: '65px',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '10px',
            textAlign: 'center',
            fontSize: '26px',
          }}
        >
          ME
        </div>
      </div>
    </>
  );
};

export default DMConvoHeader;
