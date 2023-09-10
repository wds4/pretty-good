import { useDispatch } from 'react-redux';
import { nip19 } from 'nostr-tools';
import { NavLink } from 'react-router-dom';
import {
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
} from 'renderer/window1/redux/features/nostr/settings/slice';

const ListNameCell = (props) => {
  const dispatch = useDispatch();
  const naddr = nip19.naddrEncode({
    pubkey: props.value.event.pubkey,
    kind: props.value.event.kind,
    identifier: props.value.listName,
    relays: [],
  });

  return (
    <>
      <NavLink
        onClick={() => {
          dispatch(updateNaddrListFocus(naddr));
          dispatch(updateNip51ListFocusEventId(props.value.event.id));
        }}
        to="/NIP51Home/NIP51List"
        style={{ textDecoration: 'none' }}
      >
        {props.value.listName}
      </NavLink>
    </>
  )
}
export default ListNameCell;
