import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const Kind10000Lists = () => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const filter = {
    kinds: [10000],
    since: 0
  };
  const { events } = useNostrEvents({
    filter,
  });

  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      dispatch(addList(event));
    }
  }

  return (
    <>
      <div>Kind10000Lists; number of events: {events.length}</div>
    </>
  )
};

export default Kind10000Lists;
