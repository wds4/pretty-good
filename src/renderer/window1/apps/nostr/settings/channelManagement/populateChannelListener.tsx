import { useSelector } from 'react-redux';
import { nip19 } from 'nostr-tools';
import List from './list/list';

const PopulateChannelListener = ({naddr}) => {
  const oNaddrLookup = useSelector(
    (state) => state.nip51.naddrLookup
  );
  const { type, data } = nip19.decode(naddr);
  const listName = data.identifier;
  const pubkey = data.pubkey;
  const kind = data.kind;
  const sNaddr = kind+":"+pubkey+":"+listName;
  const naddrEventID = oNaddrLookup[sNaddr];
  return (
    <>
      <div>
        <List nip51ListFocusEventId={naddrEventID} />
      </div>
    </>
  )
}
export default PopulateChannelListener;
