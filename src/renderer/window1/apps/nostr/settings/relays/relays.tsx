import { useSelector, useDispatch } from 'react-redux';
import { updateNostrRelayStoreAndSql, addNostrRelay, removeNostrRelay } from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNewRelayToSql, deleteRelayUrlFromSql } from 'renderer/window1/lib/pg/sql';
import EndorseRelayMessage from './endorseRelayMessage';
import { noteEncode } from 'nostr-tools/nip19';

const RelaysSettings = () => {
  return (
    <>
      RelaysSettings
    </>
  );
};
export default RelaysSettings;
