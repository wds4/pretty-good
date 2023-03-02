import { useSelector } from 'react-redux';
import { fetchConvoProfiles } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import DirectMessageProfileButton from './dmProfileButton';
import MessagesPanel from './messagesPanel';

const DirectMessages = () => {
  const pubkey_focus = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;

  const aInteractees = fetchConvoProfiles();
  return (
    <>
      <div className="dmLeftPanel">
        {aInteractees.map((pubkey) => {
          return (
            <div>
              <DirectMessageProfileButton
                pubkey={pubkey}
              />
            </div>
          );
        })}
      </div>
      <div className="dmMainPanel">
        <MessagesPanel
          pubkey={pubkey_focus}
        />
      </div>
    </>
  );
};

export default DirectMessages;
