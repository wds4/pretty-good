import { useState } from 'react';
import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addNip51ListToSqlAndReduxStore } from 'renderer/window1/redux/features/nip51/lists/slice';
import LoadLists from '../../loadLists/lists';

const DownloadingCurrentlyOffButton = ({setDownloading}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setDownloading('yes')}
        style={{}}
      >
        download
      </button>
    </>
  )
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const DownloadingCurrentlyOnButton = ({setDownloading}) => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const title1 = "Nostr Devs";
  const title2 = "imported Nostr Devs";

  const filter = {
    kinds: [30001, 30000, 10001, 10000],
    since: 0,
    // "#d": [ title1, title2 ],
  };
  const { events } = useNostrEvents({
    filter,
  });

  /*
  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
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
      <button
        type="button"
        onClick={() => setDownloading('no')}
        style={{}}
      >
        stop
      </button>
    </>
  )
}

const Nip51Listener = () => {
  const [downloading, setDownloading] = useState('no');
  if (downloading=='no') {
    return (
      <>
        <DownloadingCurrentlyOffButton setDownloading={setDownloading} />
      </>
    )
  }
  return (
    <>
      <DownloadingCurrentlyOnButton setDownloading={setDownloading} />
    </>
  )
};

export default Nip51Listener;
