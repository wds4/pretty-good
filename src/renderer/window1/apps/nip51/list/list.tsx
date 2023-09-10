import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNostrEvents } from 'nostr-react';
import { secsToTime } from 'renderer/window1/lib/pg';
import { addNip51ListToSqlAndReduxStore } from 'renderer/window1/redux/features/nip51/lists/slice';
import MiniProfile from './miniProfile'; // for the curator of the list
import ToggleShowItems from './toggleShowItems';
import ShowNotesPanel from './showNotesPanel';
import ShowPeoplePanel from './showPeoplePanel';
import ShowTagsPanel from './showTagsPanel';
import ShowListsPanel from './showListsPanel';
import { populateListItemArrays } from './populateListItemArrays';
import ProcessImportsToggle from './processImportsToggle';
import EditButtonToggle from './editButtonToggle';
import AddItemToThisList from './addItemToThisList';

const TopControlPanel = ({aTags_a, author_pk, editListState, setEditListState}) => {
  return (
    <>
      <div style={{textAlign: 'right'}}>
        <ProcessImportsToggle aTags_a={aTags_a} />
        <EditButtonToggle author_pk={author_pk} editListState={editListState} setEditListState={setEditListState} />
      </div>
    </>
  )
}
const ListNotInDatabase = () => {
  const dispatch = useDispatch();
  const { naddrListFocus, nip51ListFocusEventId } = useSelector(
    (state) => state.nostrSettings
  );
  const filter = {
    ids: [nip51ListFocusEventId],
  };
  const { events } = useNostrEvents({
    filter,
  });
  let event = {};
  if (events.length > 0) {
    event = events[0];
    dispatch(addNip51ListToSqlAndReduxStore(event));
  }
  return (
    <>
     <div>list with event id: {nip51ListFocusEventId} not in database; need to search for it</div>
     <div>found {events.length} events</div>
     <div>{JSON.stringify(event,null,4)}</div>
    </>
  )
}

const ListInDatabase = () => {
  const { naddrListFocus, nip51ListFocusEventId } = useSelector(
    (state) => state.nostrSettings
  );
  const autoImportNip51 = useSelector(
    (state) => state.myNostrProfile.autoImportNip51
  );
  const oNaddrLookup = useSelector(
    (state) => state.nip51.naddrLookup
  );

  const [editListState, setEditListState] = useState(false);

  const [notesPanelState, setNotesPanelState] = useState('closed');
  const [peoplePanelState, setPeoplePanelState] = useState('closed');
  const [tagsPanelState, setTagsPanelState] = useState('closed');
  const [listsPanelState, setListsPanelState] = useState('closed');

  const oNip51Lists = useSelector((state) => state.nip51.lists);

  const { event } = oNip51Lists[nip51ListFocusEventId];

  const { kind } = event;
  const displayTime = secsToTime(event.created_at);

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = '';
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }

  const { aTags_a, aTags_e, aTags_p, aTags_t } = populateListItemArrays(event, autoImportNip51, oNaddrLookup, oNip51Lists);

  /*
  const [aTagsA, setATagsA] = useState(aTags_a);
  const [aTagsE, setATagsE] = useState(aTags_e);
  const [aTagsP, setATagsP] = useState(aTags_p);
  const [aTagsT, setATagsT] = useState(aTags_t);
  */

  let listType = '';
  if (kind == 10000) {
    listType = 'Mute';
  }
  if (kind == 10001) {
    listType = 'Pin';
  }
  if (kind == 30000) {
    listType = 'People';
  }
  if (kind == 30001) {
    listType = 'Bookmarks';
  }

  const numItems = aTags_e.length + aTags_p.length + aTags_t.length;
  let numItemsText = "items";
  if (numItems == 1) { numItemsText = "item" }

  const numLists = aTags_a.length;
  let numListsText = "lists";
  // if (numLists == 0) { numListsText = "" }
  if (numLists == 1) { numListsText = "list" }
  return (
    <>
      <TopControlPanel aTags_a={aTags_a} author_pk={event.pubkey} editListState={editListState} setEditListState={setEditListState} />
      <center>
        <div
          style={{
            textAlign: 'left',
            paddingBottom: '10px',
            marginBottom: '10px',
            marginTop: '10px',
            overflow: 'visible',
            width: '700px',
            fontSize: '36px',
            borderBottom: '2px solid grey',
          }}
        >
          <div>
            {listName}
            <div
              style={{
                display: 'inline-block',
                float: 'right',
                marginTop: '10px',
                fontSize: '14px',
                color: 'grey',
              }}
            >
              {listType} ({kind})
            </div>
          </div>
          <MiniProfile pubkey={event.pubkey} />
        </div>
      </center>

      <center>
        <div style={{ width: '600px', textAlign: 'left' }}>
          <div
            style={{
              color: 'grey',
              padding: '10px',
              fontSize: '22px',
            }}
          >
            <div style={{ display: 'inline-block' }}>
              {numItems} {numItemsText}, {numLists} {numListsText}
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
              last updated {displayTime} ago
            </div>
          </div>

          <AddItemToThisList editListState={editListState} />

          <div>
            <ToggleShowItems
              showItemsState={peoplePanelState}
              setShowItemsState={setPeoplePanelState}
            />
            <div
              style={{
                display: 'inline-block',
                fontSize: '24px',
                color: 'grey',
                marginTop: '10px',
              }}
            >
              people ({aTags_p.length})
            </div>
            <ShowPeoplePanel
              peoplePanelState={peoplePanelState}
              aTags_p={aTags_p}
              editListState={editListState}
            />
          </div>

          <div>
            <ToggleShowItems
              showItemsState={notesPanelState}
              setShowItemsState={setNotesPanelState}
            />
            <div
              style={{
                display: 'inline-block',
                fontSize: '24px',
                color: 'grey',
                marginTop: '10px'
              }}
            >
              notes ({aTags_e.length})
            </div>
            <ShowNotesPanel
              notesPanelState={notesPanelState}
              aTags_e={aTags_e}
              editListState={editListState}
            />
          </div>

          <div>
            <ToggleShowItems
              showItemsState={tagsPanelState}
              setShowItemsState={setTagsPanelState}
            />
            <div
              style={{
                display: 'inline-block',
                fontSize: '24px',
                color: 'grey',
                marginTop: '10px'
              }}
            >
              tags ({aTags_t.length})
            </div>
            <ShowTagsPanel
              tagsPanelState={tagsPanelState}
              aTags_t={aTags_t}
              editListState={editListState}
            />
          </div>

          <div>
            <ToggleShowItems
              showItemsState={listsPanelState}
              setShowItemsState={setListsPanelState}
            />
            <div
              style={{
                display: 'inline-block',
                fontSize: '24px',
                color: 'grey',
                marginTop: '10px'
              }}
            >
              other lists ({aTags_a.length})
            </div>
            <ShowListsPanel
              listsPanelState={listsPanelState}
              aTags_a={aTags_a}
              editListState={editListState}
            />
          </div>
        </div>
      </center>
    </>
  );
}

const List = () => {
  const { naddrListFocus, nip51ListFocusEventId } = useSelector(
    (state) => state.nostrSettings
  );
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  if ( (!nip51ListFocusEventId) || (!oNip51Lists[nip51ListFocusEventId]) ) {
    return (
      <ListNotInDatabase />
    )
  }
  return (
    <ListInDatabase />
  )
};

export default List;
