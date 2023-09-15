import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { useNostr, useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNip51ListToSqlAndReduxStore } from 'renderer/window1/redux/features/nip51/lists/slice';
import PlusImage from 'renderer/window1/assets/plus.png';
import MinusImage from 'renderer/window1/assets/minus.png';
import MiniProfile from 'renderer/window1/apps/nip51/makeNewList/showSingleItem/miniProfile';
import Post from 'renderer/window1/apps/nip51/makeNewList/showSingleItem/post';
import AddItemButton from './addItemButton';

const SingleNotePanel = ({
  eventID,
}) => {
  const filter = {
    ids: [eventID],
  };
  const { events } = useNostrEvents({
    filter,
  });
  if (events.length == 1) {
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
              border: '1px solid grey',
              borderRadius: '5px',
              marginBottom: '10px',
              backgroundColor: 'white',
            }}
          >
            <Post event={events[0]} />
          </div>
        </div>
      </>
    );
  }
  return <></>;
}

const ShowItemsPanel = ({ event }) => {
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');
  return (
    <>
      <div style={{ color: 'grey', fontSize: '22px' }}>
        <span>{aTags_p.length} people,</span>{' '}
        <span>{aTags_e.length} bookmarks,</span>{' '}
        <span>{aTags_t.length} tags,</span>{' '}
        <span>{aTags_a.length} imported lists</span>
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
        <div style={{padding: '0px', marginBottom: '5px'}}>
          <NavLink
            onClick={() => {
              dispatch(updateNaddrListFocus(naddr));
              dispatch(updateNip51ListFocusEventId(event.id));
            }}
            to="/NIP51Home/NIP51List"
            style={{ textDecoration: 'none', marginBottom: '0px' }}
          >
            <div style={{ fontSize: '22px' }}>
              {listName}
              <div
                style={{
                  fontSize: '12px',
                  float: 'right',
                  display: 'inline-block',
                }}
              >
                {event.kind}
              </div>
            </div>
          </NavLink>
        </div>

        <div style={{}}>
          <MiniProfile pubkey={event.pubkey} />
        </div>

        <ShowItemsPanel event={event} />
      </div>
    </>
  );
};

const ShowSingleListAlreadyInDatabase = ({nip19Data}) => {
  const listName = nip19Data.identifier;
  const pubkey = nip19Data.pubkey;
  const kind = nip19Data.kind;
  const sNaddr = `${kind}:${pubkey}:${listName}`;
  const oNaddrLookup = useSelector((state) => state.nip51.naddrLookup);
  const eventID = oNaddrLookup[sNaddr];
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { event } = oNip51Lists[eventID];
  return (
    <>
      <ShowList event={event} listName={listName} />
    </>
  )
}

const ShowSingleListNotInDatabase = ({nip19Data}) => {
  const dispatch = useDispatch();
  const listName = nip19Data.identifier;
  const pubkey = nip19Data.pubkey;
  const kind = nip19Data.kind;
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
      <div>could not fetch list with above filter</div>
    </>
  );
}

const ShowSingleList = ({ nip19Data }) => {
  const listName = nip19Data.identifier;
  const pubkey = nip19Data.pubkey;
  const kind = nip19Data.kind;
  const sNaddr = `${kind}:${pubkey}:${listName}`;
  const oNaddrLookup = useSelector((state) => state.nip51.naddrLookup);
  if (oNaddrLookup[sNaddr]) {
    return (
      <>
        <ShowSingleListAlreadyInDatabase
          nip19Data={nip19Data}
        />
      </>
    )
  }
  return <ShowSingleListNotInDatabase nip19Data={nip19Data} />;
};

const NewItemDisplay = ({ nip19Type, nip19Data }) => {
  if ((nip19Type == "npub") || (nip19Type == "nprofile")) {
    // nip19Data = pubkey
    const pubkey = nip19Data;
    return (
      <>
        <MiniProfile pubkey={pubkey} />
      </>
    )
  }
  if ((nip19Type == "note") || (nip19Type == "nevent")) {
    // nip19Data = event id
    const eventID = nip19Data;
    return (
      <>
        <SingleNotePanel eventID={eventID} />
      </>
    )
  }
  if (nip19Type == "naddr") {
    return (
      <>
        <ShowSingleList nip19Data={nip19Data} />
      </>
    )
  }
  return (
    <>
      <div style={{fontSize: '22px', color: 'grey', border: '1px solid grey', borderRadius: '5px', padding: '10px'}}>
        Enter a valid nip-19 identifier (naddr, npub, nprofile, note, nevent) in the field above.
      </div>
    </>
  )
}
const NewItemPanel = ({
  addItemPanelState,
  addItemToThisList,
  oTagUpdates,
  aTagsToAddA,
  aTagsToAddE,
  aTagsToAddP,
  aTagsToAddT,
  confirmAddItemToList,
}) => {
  if (addItemPanelState=="closed") {
    return <></>;
  }
  const placeholderText = "Enter a NIP-19 identifier";
  const [nip19Type, setNip19Type] = useState("");
  const [nip19Data, setNip19Data] = useState("");
  const [isNip19IdValid, setIsNip19IdValid] = useState(false);
  const updateNip19IdField = (val) => {
    console.log("updateNip19IdField; val: "+val)
    try {
      const { type, data } = nip19.decode(val);
      console.log("updateNip19IdField; type: "+type)
      setNip19Type(type);
      setNip19Data(data);
      setIsNip19IdValid(true);
      addItemToThisList(val);
    } catch (err) {
      // console.log("updateNip19IdField err: ",err)
      setNip19Type("");
      setNip19Data("");
      setIsNip19IdValid(false);
    }
  }
  return (
    <>
      <div style={{display: 'flex'}}>
        <div
          style={{
            minWidth: '200px',
            flexGrow: '999',
          }}
        >
          <textarea
            placeholder={placeholderText}
            onChange={(e)=>updateNip19IdField(e.target.value)}
            id="nip19IdFieldTextarea"
            style={{
              padding: '5px',
              width: '100%',
              height: '50px',
              boxSizing: 'border-box',
              border: '2px solid purple',
              borderRadius: '5px',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
        </div>
        <div
          style={{
            flexGrow: '1',
            marginLeft: '5px',
          }}
        >
          <AddItemButton
            isNip19IdValid={isNip19IdValid}
            confirmAddItemToList={confirmAddItemToList}
            oTagUpdates={oTagUpdates}
            aTagsToAddA={aTagsToAddA}
            aTagsToAddE={aTagsToAddE}
            aTagsToAddP={aTagsToAddP}
            aTagsToAddT={aTagsToAddT}
            updateNip19IdField={updateNip19IdField}
          />
        </div>
      </div>
      <div style={{}}>
        <NewItemDisplay nip19Type={nip19Type} nip19Data={nip19Data} />
      </div>
    </>
  )
}

const AddItemToThisList = ({
  addItemToThisList,
  oTagUpdates,
  aTagsToAddA,
  aTagsToAddE,
  aTagsToAddP,
  aTagsToAddT,
  editListState,
  confirmAddItemToList,
  updatedEvent,
  resetAllUpdates,
  refreshTable,
}) => {
  const [addItemPanelState, setAddItemPanelState] = useState('closed');
  let toggleButtonImage = PlusImage;
  if (addItemPanelState == 'open') {
    toggleButtonImage = MinusImage;
  }
  if (addItemPanelState == 'closed') {
    toggleButtonImage = PlusImage;
  }
  const updateAddItemPanelState = () => {
    console.log('updateAddItemPanelState');
    if (addItemPanelState == 'open') {
      setAddItemPanelState('closed');
    }
    if (addItemPanelState == 'closed') {
      setAddItemPanelState('open');
    }
  };
  if (!editListState) {
    return <></>;
  }
  return (
    <>
      <div style={{border: '1px solid grey', borderRadius: '5px', backgroundColor: '#DFDFDF', padding: '5px'}}>
        <div>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
            onClick={updateAddItemPanelState}
          >
            <img
              src={toggleButtonImage}
              alt=""
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '250px',
                width: '50%',
                height: '50%',
                margin: '0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          <div style={{display: 'inline-block', fontSize: '22px', paddingTop: '12px'}}>
            Add item to this list
          </div>
          <SubmitChangesPanel
            oTagUpdates={oTagUpdates}
            updatedEvent={updatedEvent}
            resetAllUpdates={resetAllUpdates}
            refreshTable={refreshTable}
          />
        </div>
        <NewItemPanel
          addItemPanelState={addItemPanelState}
          addItemToThisList={addItemToThisList}
          oTagUpdates={oTagUpdates}
          aTagsToAddA={aTagsToAddA}
          aTagsToAddE={aTagsToAddE}
          aTagsToAddP={aTagsToAddP}
          aTagsToAddT={aTagsToAddT}
          confirmAddItemToList={confirmAddItemToList}
        />
      </div>
    </>
  )
}
export default AddItemToThisList;

const SubmitChangesPanel = ({oTagUpdates, updatedEvent, resetAllUpdates, refreshTable}) => {
  const { publish } = useNostr();
  const submitChanges = async () => {
    // console.log("qwerty submitChanges; updatedEvent: "+JSON.stringify(updatedEvent,null,4))
    publish(updatedEvent);
    resetAllUpdates();
    refreshTable();
  }
  const numUpdates = oTagUpdates.aTagsToAddA.length
    + oTagUpdates.aTagsToAddE.length
    + oTagUpdates.aTagsToAddP.length
    + oTagUpdates.aTagsToAddT.length
    + oTagUpdates.aTagsToDeleteA.length
    + oTagUpdates.aTagsToDeleteE.length
    + oTagUpdates.aTagsToDeleteP.length
    + oTagUpdates.aTagsToDeleteT.length;
  if (numUpdates == 0) {
    return <></>;
  }
  return (
    <>
      <button
        type="button"
        style={{
          float: 'right',
          fontSize: '22px',
          marginTop: '10px',
          marginRight: '10px',
        }}
        onClick={submitChanges}
      >
        Submit changes
      </button>
    </>
  )
}
