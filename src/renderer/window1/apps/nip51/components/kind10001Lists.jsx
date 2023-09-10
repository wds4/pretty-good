import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const Kind10001Lists = () => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const filter = {
    kinds: [10001],
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
      <div>Kind10001Lists; number of events: {events.length}</div>
    </>
  )
};

export default Kind10001Lists;
