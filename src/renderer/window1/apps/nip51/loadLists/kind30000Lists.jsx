import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  addNip51ListToSqlAndReduxStore,
} from 'renderer/window1/redux/features/nip51/lists/slice';

const Kind30000Lists = ({title}) => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const filter = {
    kinds: [30000],
    since: 0,
    "#d": [ title ],
  };
  const { events } = useNostrEvents({
    filter,
  });

  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      // dispatch(addList(event));
      dispatch(addNip51ListToSqlAndReduxStore(event));
    }
  }

  return (
    <>
      <div>Kind30000Lists; number of events: {events.length}</div>
    </>
  )
};

export default Kind30000Lists;
