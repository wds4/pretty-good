import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { secsToTime } from 'renderer/window1/lib/pg';
import MiniProfile from './miniProfile'; // for the curator of the list
import ToggleShowItems from './toggleShowItems';
import ShowNotesPanel from './showNotes.Panel';
import ShowPeoplePanel from './showPeoplePanel';
import ShowTagsPanel from './showTagsPanel';
import ShowListsPanel from './showListsPanel';

const List = () => {
  const dispatch = useDispatch();

  const [notesPanelState, setNotesPanelState] = useState('closed');
  const [peoplePanelState, setPeoplePanelState] = useState('closed');
  const [tagsPanelState, setTagsPanelState] = useState('closed');
  const [listsPanelState, setListsPanelState] = useState('closed');

  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { naddrListFocus, nip51ListFocusEventId } = useSelector(
    (state) => state.nostrSettings
  );
  const oNaddr = nip19.decode(naddrListFocus);
  const { event } = oNip51Lists[nip51ListFocusEventId];

  const { kind } = event;
  const displayTime = secsToTime(event.created_at);

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = '';
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');

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

  return (
    <>
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
              {aTags_a.length + aTags_e.length + aTags_p.length + aTags_t.length}{' '}
              items
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
              last updated {displayTime} ago
            </div>
          </div>

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
                marginTop: '10px'
              }}
            >
              people ({aTags_p.length})
            </div>
            <ShowPeoplePanel
              peoplePanelState={peoplePanelState}
              aTags_p={aTags_p}
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
            <ShowTagsPanel tagsPanelState={tagsPanelState} aTags_t={aTags_t} />
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
            />
          </div>
        </div>
      </center>
    </>
  );
};

export default List;
