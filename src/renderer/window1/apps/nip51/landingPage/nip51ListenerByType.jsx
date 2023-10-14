import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  addNip51ListToSqlAndReduxStore,
} from 'renderer/window1/redux/features/nip51/lists/slice';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const ActiveDownload = ({kind, title}) => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  let filter = {
    kinds: [parseInt(kind)],
    since: 0,
  };

  if (title) {
    filter["#d"] = [ title ];
  }

  const { events } = useNostrEvents({
    filter,
  });

  /*
  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      // dispatch(addList(event));
      // console.log("qwerty; NOT LOADED aListEventIDs.length: "+aListEventIDs.length)
      dispatch(addNip51ListToSqlAndReduxStore(event));
    }
  }
  */

  asyncForEach(events, async (event) => {
    if (!aListEventIDs.includes(event.id)) {
      dispatch(addNip51ListToSqlAndReduxStore(event));
    }
  });

  return (
    <>
      <div style={{display: 'inline-block', color: 'grey', fontSize: '12px'}}>
        # notes {events.length}
      </div>
    </>
  )
}

const Nip51ListenerByType = ({kind, downloading, title}) => {
  if (downloading == 'no') {
    return <></>;
  }
  if (downloading == 'yes') {
    return (
      <>
        <ActiveDownload kind={kind} title={title} />
      </>
    )
  }
  return <></>;
};

export default Nip51ListenerByType;
