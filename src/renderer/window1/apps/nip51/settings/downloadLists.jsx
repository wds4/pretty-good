import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  addNip51ListToSqlAndReduxStore,
} from 'renderer/window1/redux/features/nip51/lists/slice';

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

  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      // dispatch(addList(event));
      dispatch(addNip51ListToSqlAndReduxStore(event));
    }
  }

  return (
    <>
      <div style={{display: 'inline-block', color: 'grey', fontSize: '12px'}}>
        # notes {events.length}
      </div>
    </>
  )
}

const DownloadLists = ({kind, downloading, title}) => {
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

export default DownloadLists;
