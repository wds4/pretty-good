import { useDispatch, useSelector } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import MiniProfile from './miniProfile';

const DirectMessagesProfileButton = ({ pubkey, resetConvoPubkey }) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const selectConvo = (pubkey) => {
    dispatch(updateNostrProfileFocus(pubkey));
  }
  return (
    <>
      <div
        className="dmProfileButtonContainer"
        onClick={() => selectConvo(pubkey)}
      >
        <MiniProfile pubkey={pubkey} />
      </div>
    </>
  );
};

export default DirectMessagesProfileButton;
