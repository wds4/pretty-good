import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  addNip51ListToSqlAndReduxStore,
} from 'renderer/window1/redux/features/nip51/lists/slice';

const Kind30001Lists = ({title}) => {
  const dispatch = useDispatch();
  /*
  const aListEventIDs = useSelector(
    (state) => state.nip51.aListEventIDs
  );
  */

  let aListEventIDs_running = [];

  const title1 = "Nostr Devs";
  const title2 = "imported Nostr Devs";

  const filter = {
    kinds: [30001],
    since: 0,
    "#d": [ title1, title2 ],
  };
  const { events } = useNostrEvents({
    filter,
  });

  // console.log("qwerty Kind30001Lists events.length: "+events.length)
  for (let x=0; x<events.length; x++) {
    const event = events[x];
    // if (!aListEventIDs.includes(event.id)) {
      // dispatch(addList(event));
      dispatch(addNip51ListToSqlAndReduxStore(event));
    // }
  }

  return (
    <>
      <div>Kind30001Lists; number of events: {events.length}</div>
    </>
  )
};

export default Kind30001Lists;
