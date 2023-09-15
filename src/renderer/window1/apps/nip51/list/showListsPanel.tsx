import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { NavLink } from 'react-router-dom';
import {
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNip51ListToSqlAndReduxStore } from 'renderer/window1/redux/features/nip51/lists/slice';
import MiniProfile from './miniProfile';
import DeleteButton from './deleteButton';

const ShowItemsPanel = ({ event }) => {
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');
  return (
    <>
      <div style={{ color: 'grey' }}>
        <span>{aTags_p.length} people,</span>{' '}
        <span>{aTags_e.length} bookmarks,</span>{' '}
        <span>{aTags_t.length} tags,</span>{' '}
        <span>{aTags_a.length} other lists</span>
      </div>
    </>
  );
};

const ShowList = ({event, listName}) => {
  const dispatch = useDispatch();
  const naddr = nip19.naddrEncode({
    pubkey: event.pubkey,
    kind: event.kind,
    identifier: listName,
    relays: [],
  });
  return (
    <>
      <div
        style={{
          border: '1px solid grey',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <NavLink
          onClick={() => {
            dispatch(updateNaddrListFocus(naddr));
            dispatch(updateNip51ListFocusEventId(event.id));
          }}
          to="/NIP51Home/NIP51List"
          style={{ textDecoration: 'none' }}
        >
          <div style={{ fontSize: '22px', display: 'inline-block' }}>
            {listName}
          </div>
        </NavLink>
        <div
          style={{
            fontSize: '12px',
            float: 'right',
            display: 'inline-block',
          }}
        >
          {event.kind}
        </div>
        <MiniProfile pubkey={event.pubkey} />
        <ShowItemsPanel event={event} />
      </div>
    </>
  );
}

const ShowSingleListNotInDatabase = ({ aListData }) => {
  const dispatch = useDispatch();
  const kind = aListData[0];
  const pubkey = aListData[1];
  const listName = aListData[2];
  const filter = {
    authors: [pubkey],
    kinds: [parseInt(kind)],
    '#d': [listName],
  };
  const { events } = useNostrEvents({
    filter,
  });
  if (events.length > 0) {
    const event = events[0];
    dispatch(addNip51ListToSqlAndReduxStore(event));
    return (
      <>
        <ShowList event={event} listName={listName} />
      </>
    );
  }
  return (
    <>
      <div>{JSON.stringify(filter, null, 4)}</div>
      <div>could not fetch aListData: {JSON.stringify(aListData)}</div>
    </>
  );
};

const ShowSingleListAlreadyInDatabase = ({
  aListData,
}) => {
  const kind = aListData[0];
  const pubkey = aListData[1];
  const listName = aListData[2];
  const sNaddr = `${kind}:${pubkey}:${listName}`;
  const oNaddrLookup = useSelector((state) => state.nip51.naddrLookup);
  const eventID = oNaddrLookup[sNaddr];
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { event } = oNip51Lists[eventID];
  return (
    <>
      <ShowList event={event} listName={listName} />
    </>
  );
};

const ShowSingleList = ({
  aListData,
  aTagsToDeleteA,
  editListState,
  removeThisItemFromDeleteListA,
  addThisItemToDeleteListA,
}) => {
  const kind = aListData[0];
  const pubkey = aListData[1];
  const listName = aListData[2];
  const sNaddr = `${kind}:${pubkey}:${listName}`;
  const oNaddrLookup = useSelector((state) => state.nip51.naddrLookup);
  if (oNaddrLookup[sNaddr]) {
    return (
      <>
        <ShowSingleListAlreadyInDatabase
          aListData={aListData}
        />
      </>
    )
  }
  return <ShowSingleListNotInDatabase aListData={aListData} />;
};

const ShowSingleListPre = ({
  aListData,
  aTagsToDeleteA,
  editListState,
  removeThisItemFromDeleteListA,
  addThisItemToDeleteListA,
}) => {
  const kind = aListData[0];
  const pubkey = aListData[1];
  const listName = aListData[2];
  const sNaddr = `${kind}:${pubkey}:${listName}`;

  let initState = false;
  if (aTagsToDeleteA.includes(sNaddr)) {
    initState = true;
  }
  const [deleteThisItem, setDeleteThisItem] = useState(initState);
  let border = '1px solid grey';
  let backgroundColor = '#EFEFEF';
  if (editListState && deleteThisItem) {
    border = '1px solid red';
    backgroundColor = '#CFCFCF';
  }

  const removeItemFromDeleteList = () => {
    removeThisItemFromDeleteListA(sNaddr);
  }
  const addItemToDeleteList = () => {
    addThisItemToDeleteListA(sNaddr);
  }
  return (
    <>
      <div style={{
        display: 'flex',
        gap: '5px',
      }}
      >
        <div
          style={{
            flexGrow: '999',
            border,
            borderRadius: '5px',
            marginBottom: '10px',
            backgroundColor,
          }}
        >
          <ShowSingleList
            aListData={aListData}
            aTagsToDeleteA={aTagsToDeleteA}
            editListState={editListState}
            removeThisItemFromDeleteListA={removeThisItemFromDeleteListA}
            addThisItemToDeleteListA={addThisItemToDeleteListA}
          />
        </div>
        <DeleteButton
          editListState={editListState}
          deleteThisItem={deleteThisItem}
          setDeleteThisItem={setDeleteThisItem}
          removeItemFromDeleteList={removeItemFromDeleteList}
          addItemToDeleteList={addItemToDeleteList}
        />
      </div>
    </>
  )
};

const ShowListsPanel = ({
  listsPanelState,
  aTags_a,
  aTagsToDeleteA,
  editListState,
  removeThisItemFromDeleteListA,
  addThisItemToDeleteListA,
  oTagUpdates,
}) => {
  // if listsPanelState is closed, the lists will still be rendered, just not displayed,
  // the purpose being that imported lists will be downloaded placed into the local database
  // if they are not already present
  let display = 'none';
  if (listsPanelState == 'open') {
    display = 'block';
  }
  return (
    <>
      <div style={{display}}>
        {aTags_a.map((oList) => {
          const aListData = oList[1].split(':');
          return (
            <>
              <ShowSingleListPre
                aListData={aListData}
                aTagsToDeleteA={aTagsToDeleteA}
                editListState={editListState}
                removeThisItemFromDeleteListA={removeThisItemFromDeleteListA}
                addThisItemToDeleteListA={addThisItemToDeleteListA}
              />
            </>
          );
        })}
        <div style={{border: '2px solid green', borderRadius: '5px', padding: '5px', backgroundColor: 'white'}}>
          <center style={{color: 'green'}}>added items</center>
          {oTagUpdates.aTagsToAddA.map((aTag) => {
          const aListData = aTag[1].split(':');
          return (
            <>
              <ShowSingleListPre
                aListData={aListData}
                aTagsToDeleteA={aTagsToDeleteA}
                editListState={editListState}
                removeThisItemFromDeleteListA={removeThisItemFromDeleteListA}
                addThisItemToDeleteListA={addThisItemToDeleteListA}
              />
            </>
          );
        })}
        </div>
      </div>
    </>
  );
};
export default ShowListsPanel;
