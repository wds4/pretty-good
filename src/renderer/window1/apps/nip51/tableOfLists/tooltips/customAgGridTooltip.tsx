import { useMemo } from 'react';
import { nip19 } from 'nostr-tools';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
} from 'renderer/window1/redux/features/nostr/settings/slice';

const ShowListButton = ({ pubkey, naddr, eventID, setShowListBelowTableTrue }) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const showThisListBelow = () => {
    console.log('showThisListBelow');
    dispatch(updateNaddrListFocus(naddr));
    dispatch(updateNip51ListFocusEventId(eventID));
    setShowListBelowTableTrue();
  };
  if (myPubkey == pubkey) {
    return (
      <>
        <div style={{ marginTop: '10px' }}>
          <button
            type="button"
            onClick={showThisListBelow}
            style={{ fontSize: '16px' }}
          >
            show this list below
          </button>
        </div>
      </>
    );
  }
  return <></>;
};

export default (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );
  const rowIndex = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).rowIndex,
    []
  );
  const colId = useMemo(() => props.column.colId, []);

  const oAuthor = useMemo(() => props.data.author, []);
  const oListName = useMemo(() => props.data.listName, []);

  // const setShowListBelowTableTrue = useMemo(() => props.setShowListBelowTableTrue, []);

  if (colId == 'listName') {
    const naddr = nip19.naddrEncode({
      pubkey: oListName.event.pubkey,
      kind: oListName.event.kind,
      identifier: oListName.listName,
      relays: [],
    });
    const copyNaddr = () => {
      navigator.clipboard.writeText(naddr);
      // Alert the copied text
      alert(`Copied the text: ${naddr}`);
    };
    return (
      <>
        <div
          style={{
            padding: '5px',
            border: '2px solid purple',
            borderRadius: '5px',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{ fontSize: '20px', color: 'purple', marginBottom: '5px' }}
          >
            {oListName.listName}
          </div>
          <div
            style={{ fontSize: '16px', color: 'grey', marginBottom: '10px' }}
          >
            {oAuthor.name} {oAuthor.displayName}
          </div>
          <button
            type="button"
            style={{ fontSize: '16px' }}
            onClick={copyNaddr}
          >
            copy list naddr id
          </button>
          <ShowListButton
            pubkey={oListName.event.pubkey}
            naddr={naddr}
            eventID={oListName.event.id}
            setShowListBelowTableTrue={props.setShowListBelowTableTrue}
          />
        </div>
      </>
    );
  }
  if (colId == 'author') {
    const npub = nip19.npubEncode(oAuthor.pubkey);
    const copyUserNpub = () => {
      navigator.clipboard.writeText(npub);
      // Alert the copied text
      alert(`Copied the text: ${npub}`);
    };
    return (
      <>
        <div
          style={{
            padding: '5px',
            border: '2px solid purple',
            borderRadius: '5px',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{ fontSize: '20px', color: 'purple', marginBottom: '10px' }}
          >
            {oAuthor.name} {oAuthor.displayName}
          </div>
          <button
            type="button"
            style={{ fontSize: '16px' }}
            onClick={copyUserNpub}
          >
            copy npub
          </button>
        </div>
      </>
    );
  }

  console.log('qwerty ', props);

  return (
    <div
      className="custom-tooltip"
      style={{ backgroundColor: props.color || 'white' }}
    >
      <p>
        <span>rowIndex: {rowIndex}</span>
      </p>
      <p>
        <span>colId: {colId}</span>
      </p>
      <p>
        <span>data: {JSON.stringify(data)}</span>
      </p>
    </div>
  );
};
