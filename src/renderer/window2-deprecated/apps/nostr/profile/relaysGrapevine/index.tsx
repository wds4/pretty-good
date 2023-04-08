import FollowRelaysButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/followRelaysButton';
import EndorseAsRelaysPickerButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerButton';
import EndorseAsRelaysPickerHunterButton from 'renderer/window1/apps/nostr/profile/relaysGrapevine/endorseAsRelaysPickerHunterButton';

const RelaysCurationBox = ({pubkey}) => {

  return (
    <>
      <div style={{ display: 'inline-block', border: '1px solid purple', padding: '5px' }}>
        <center>Relay List Curation</center>
        <div >
          <FollowRelaysButton pubkey={pubkey} />
        </div>
        <div >
          <EndorseAsRelaysPickerButton pubkey={pubkey} />
        </div>
        <div >
          <EndorseAsRelaysPickerHunterButton pubkey={pubkey} />
        </div>
      </div>
    </>
  );
};
export default RelaysCurationBox;
