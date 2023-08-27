import { useSelector } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import MiniProfile from './miniProfile';

const ShowSingleList = ({aListData}) => {
  const kind = aListData[0];
  const pubkey = aListData[1];
  const listName = aListData[2];
  const filter = {
    authors: [pubkey],
    kinds: [ parseInt(kind) ],
    "#d": [listName]
  };
  const { events } = useNostrEvents({
    filter,
  });
  if (events.length > 0) {
    return (
      <>
        <div>{JSON.stringify(events[0],null,4)}</div>
      </>
    );
  }
  return (
    <>
      <div>{JSON.stringify(filter,null,4)}</div>
      <div>
      could not fetch aListData: {JSON.stringify(aListData)}
      </div>
    </>
    )
}

const ImportItemsButton = ({}) => {
  return (
    <>
      <button>Import items</button>
    </>
  )
}

const ShowListsPanel = ({ listsPanelState, aTags_a }) => {
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { naddrListFocus, nip51ListFocusEventId } = useSelector(
    (state) => state.nostrSettings
  );
  if (listsPanelState == 'open') {
    return (
      <>
        <div>
          {aTags_a.map((oList) => {
            const aListData = oList[1].split(":");
            const kind = aListData[0];
            const pubkey = aListData[1];
            const listName = aListData[2];
            return (
              <>
                <div
                  style={{
                    border: '1px solid grey',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    padding: '10px',
                  }}
                >
                  <div style={{fontSize: '22px', display: 'inline-block'}}>{listName}</div>
                  <div style={{fontSize: '12px', float: 'right', display: 'inline-block'}}>{kind}</div>
                  <MiniProfile pubkey={pubkey} />
                  <ImportItemsButton />
                </div>
                <ShowSingleList aListData={aListData} />
              </>
            )
          })}
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowListsPanel;
