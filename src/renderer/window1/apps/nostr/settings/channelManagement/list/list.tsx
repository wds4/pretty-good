import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { useDispatch, useSelector } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { secsToTime } from 'renderer/window1/lib/pg';
import { addNip51ListToSqlAndReduxStore } from 'renderer/window1/redux/features/nip51/lists/slice';
import { updateNip51ListFocusEventId } from 'renderer/window1/redux/features/nostr/settings/slice';
import MiniProfile from './miniProfile'; // for the curator of the list
import ToggleShowItems from './toggleShowItems';
import ShowNotesPanel from './showNotesPanel';
import ShowPeoplePanel from './showPeoplePanel';
import ShowTagsPanel from './showTagsPanel';
import ShowListsPanel from './showListsPanel';
import { populateListItemArrays } from './populateListItemArrays';
// import AddItemToThisList from './addItemToThisList';
// import PublishUpdatedListPanel from './publishUpdatedListPanel';
import ToggleRawListEvent from './toggleRawListEvent';

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

const ListInDatabase = ({nip51ListFocusEventId}) => {
  const [editListState, setEditListState] = useState(false);
  const [notesPanelState, setNotesPanelState] = useState('closed');
  const [peoplePanelState, setPeoplePanelState] = useState('closed');
  const [tagsPanelState, setTagsPanelState] = useState('closed');
  const [listsPanelState, setListsPanelState] = useState('closed');

  // arrays of strings to denote new tags to add to the list
  const [aTagsToAddA, setATagsToAddA] = useState([]);
  const [aTagsToAddE, setATagsToAddE] = useState([]);
  const [aTagsToAddP, setATagsToAddP] = useState([]);
  const [aTagsToAddT, setATagsToAddT] = useState([]);
  // aTagToAddOnDeck is the next tag, formatted as: ["x", <string>], which has already
  // been vetted using the function: addItemToThisList (below), immediately after being entered into the textarea.
  // If the string in the textarea is invalid, aTagToAddOnDeck is set to empty.
  // When the add button is clicked, confirmAddItemToList is triggerd
  // so that aTagsToAddT gets added to the appropriate aTagsToAddX, and
  // the new list event gets updated.
  // TODO: ? rename addItemToThisList
  const [aTagToAddOnDeck, setATagToAddOnDeck] = useState([]);

  // arrays of strings to denote tags marked for deletion
  const [aTagsToDeleteA, setATagsToDeleteA] = useState([]);
  const [aTagsToDeleteE, setATagsToDeleteE] = useState([]);
  const [aTagsToDeleteP, setATagsToDeleteP] = useState([]);
  const [aTagsToDeleteT, setATagsToDeleteT] = useState([]);

  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { event } = oNip51Lists[nip51ListFocusEventId];

  const [updatedEvent, setUpdatedEvent] = useState(event);

  return (
    <>
      <ListInDatabaseB
        nip51ListFocusEventId={nip51ListFocusEventId}

        editListState={editListState}
        setEditListState={setEditListState}
        notesPanelState={notesPanelState}
        setNotesPanelState={setNotesPanelState}
        peoplePanelState={peoplePanelState}
        setPeoplePanelState={setPeoplePanelState}
        tagsPanelState={tagsPanelState}
        setTagsPanelState={setTagsPanelState}
        listsPanelState={listsPanelState}
        setListsPanelState={setListsPanelState}

        aTagsToAddA={aTagsToAddA}
        setATagsToAddA={setATagsToAddA}
        aTagsToAddE={aTagsToAddE}
        setATagsToAddE={setATagsToAddE}
        aTagsToAddP={aTagsToAddP}
        setATagsToAddP={setATagsToAddP}
        aTagsToAddT={aTagsToAddT}
        setATagsToAddT={setATagsToAddT}

        aTagToAddOnDeck={aTagToAddOnDeck}
        setATagToAddOnDeck={setATagToAddOnDeck}

        aTagsToDeleteA={aTagsToDeleteA}
        setATagsToDeleteA={setATagsToDeleteA}
        aTagsToDeleteE={aTagsToDeleteE}
        setATagsToDeleteE={setATagsToDeleteE}
        aTagsToDeleteP={aTagsToDeleteP}
        setATagsToDeleteP={setATagsToDeleteP}
        aTagsToDeleteT={aTagsToDeleteT}
        setATagsToDeleteT={setATagsToDeleteT}

        updatedEvent={updatedEvent}
        setUpdatedEvent={setUpdatedEvent}
      />
    </>
  );
}

const ListInDatabaseB = ({
  nip51ListFocusEventId,

  editListState,
  setEditListState,
  notesPanelState,
  setNotesPanelState,
  peoplePanelState,
  setPeoplePanelState,
  tagsPanelState,
  setTagsPanelState,
  listsPanelState,
  setListsPanelState,

  aTagsToAddA,
  setATagsToAddA,
  aTagsToAddE,
  setATagsToAddE,
  aTagsToAddP,
  setATagsToAddP,
  aTagsToAddT,
  setATagsToAddT,

  aTagToAddOnDeck,
  setATagToAddOnDeck,

  aTagsToDeleteA,
  setATagsToDeleteA,
  aTagsToDeleteE,
  setATagsToDeleteE,
  aTagsToDeleteP,
  setATagsToDeleteP,
  aTagsToDeleteT,
  setATagsToDeleteT,

  updatedEvent,
  setUpdatedEvent,
}) => {
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  const { event } = oNip51Lists[nip51ListFocusEventId];

  // const myNostrProfile = useSelector((state) => state.myNostrProfile);
  // const myPrivkey = myNostrProfile.privkey;
  const autoImportNip51 = true;
  const oNaddrLookup = useSelector(
    (state) => state.nip51.naddrLookup
  );

  const { kind } = event;
  const displayTime = secsToTime(event.created_at);

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = '';
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }

  const { aTags_a, aTags_e, aTags_p, aTags_t } = populateListItemArrays(event, autoImportNip51, oNaddrLookup, oNip51Lists);

  /*
  const resetAllUpdates = () => {
    setATagsToAddA([]);
    setATagsToAddE([]);
    setATagsToAddP([]);
    setATagsToAddT([]);

    setATagsToDeleteA([]);
    setATagsToDeleteE([]);
    setATagsToDeleteP([]);
    setATagsToDeleteT([]);
  }

  const confirmAddItemToList = (
    oTagUpdates,
    aTagsToAddA,
    aTagsToAddE,
    aTagsToAddP,
    aTagsToAddT
  ) => {
    console.log("confirmAddItemToList; oTagUpdates: "+JSON.stringify(oTagUpdates))
    const e = document.getElementById("nip19IdFieldTextarea");
    if (e) {
      e.value = "";
    }
    if (aTagToAddOnDeck) {
      const whichTypeOfItem = aTagToAddOnDeck[0];
      if (whichTypeOfItem=='a') {
        let aCopied = JSON.parse(JSON.stringify(oTagUpdates.aTagsToAddA));
        let alreadyPresent = false;
        for (let x=0; x<oTagUpdates.aTagsToAddA.length; x++ ) {
          const aFoo = oTagUpdates.aTagsToAddA[x];
          if (aFoo[1] == aTagToAddOnDeck[1]) {
            alreadyPresent = true;
          }
        }
        if (!alreadyPresent) {
          aCopied.push(aTagToAddOnDeck);
          setATagsToAddA(aCopied);
          // setATagsToAddA([...oTagUpdates.aTagsToAddA, ...aTagToAddOnDeck]);
          // TODO: this step updates oTagUpdates.aTagsToAddA for use in recalculateUpdatedListEventAfterDeletion,
          // but not for repeated use in this function (confirmAddItemToList)
          // Hacky solution: store oTagUpdates.aTagsToAddA in DOM and fetch it for use in this function
          // non-hacky solution: find out why the fuck it works in recalculateUpdatedListEventAfterDeletion but not here
        }
      }
      if (whichTypeOfItem=='e') {
        let aCopied = JSON.parse(JSON.stringify(oTagUpdates.aTagsToAddE));
        let alreadyPresent = false;
        for (let x=0; x<oTagUpdates.aTagsToAddE.length; x++ ) {
          const aFoo = oTagUpdates.aTagsToAddE[x];
          if (aFoo[1] == aTagToAddOnDeck[1]) {
            alreadyPresent = true;
          }
        }
        if (!alreadyPresent) {
          aCopied.push(aTagToAddOnDeck);
          setATagsToAddE(aCopied);
        }
      }
      if (whichTypeOfItem=='p') {
        let aCopied = JSON.parse(JSON.stringify(oTagUpdates.aTagsToAddP));
        let alreadyPresent = false;
        for (let x=0; x<oTagUpdates.aTagsToAddP.length; x++ ) {
          const aFoo = oTagUpdates.aTagsToAddP[x];
          if (aFoo[1] == aTagToAddOnDeck[1]) {
            alreadyPresent = true;
          }
        }
        if (!alreadyPresent) {
          aCopied.push(aTagToAddOnDeck);
          setATagsToAddP(aCopied);
        }
      }
      if (whichTypeOfItem=='t') {
        let aCopied = JSON.parse(JSON.stringify(oTagUpdates.aTagsToAddT));
        let alreadyPresent = false;
        // not yet fully implemented
      }
    }
    recalculateUpdatedListEventAfterAddition(oTagUpdates);
  }

  const recalculateUpdatedListEventAfterAddition = (oTagUpdates) => {
    console.log("recalculateUpdatedListEventAfterAddition A; oTagUpdates: "+JSON.stringify(oTagUpdates,null,4));

    const currentTags = JSON.parse(JSON.stringify(event.tags));
    const aNewTags = [];
    // first, remove tags marked for deletion
    for (let x=0; x<currentTags.length; x++) {
      const aNextTag = currentTags[x];
      let includeThisTag = true;
      if ((aNextTag[0] == "a") && (oTagUpdates.aTagsToDeleteA.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "e") && (oTagUpdates.aTagsToDeleteE.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "p") && (oTagUpdates.aTagsToDeleteP.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "t") && (oTagUpdates.aTagsToDeleteT.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if (includeThisTag) {
        aNewTags.push(aNextTag);
      }
    }
    // second, add in new tags
    const aNewTags2 = [...aNewTags, ...oTagUpdates.aTagsToAddA, ...oTagUpdates.aTagsToAddE, ...oTagUpdates.aTagsToAddP, ...oTagUpdates.aTagsToAddT, oTagUpdates.aTagToAddOnDeck];

    createEventWithUpdatedTags(aNewTags2);
  }

  const addItemToThisList = (nip19id) => {
    setATagToAddOnDeck([]);
    try {
      const { type, data } = nip19.decode(nip19id);
      console.log("addItemToThisList; type: "+type)
      if (type == "naddr") {
        const stringForTag = data;
        console.log("addItemToThisList add to aTagsToAddA")
        // test to see whether item is already in aTagsToAddA
        // if not, add it to 'on deck'
        // if add button is cllicked, then add on deck into array using setATagsToAddA
        const listName = data.identifier;
        const pubkey = data.pubkey;
        const kind = data.kind;
        const sNaddr = `${kind}:${pubkey}:${listName}`;
        let alreadyInAddList = false;
        for (let x=0; x<aTagsToAddA.length; x++){
          const aNextTag = aTagsToAddA[x];
          const sNext = aNextTag[1];
          if (sNext == sNaddr) {
            // already present
            alreadyInAddList = true;
          }
        }
        if (!alreadyInAddList) {
          // add to add list
          setATagToAddOnDeck(["a",sNaddr]);
        }
      }
      if ((type == "npub") || (type == "nprofile")) {
        console.log("addItemToThisList add to aTagsToAddP");
        const pk = data;
        let alreadyInAddList = false;
        for (let x=0; x<aTagsToAddP.length; x++){
          const aNextTag = aTagsToAddP[x];
          const sNext = aNextTag[1];
          if (sNext == pk) {
            // already present
            alreadyInAddList = true;
          }
        }
        console.log("addItemToThisList add to aTagsToAddP alreadyInAddList: "+alreadyInAddList);
        if (!alreadyInAddList) {
          // add to add list
          console.log("addItemToThisList add to aTagsToAddP setATagToAddOnDeck: ");
          setATagToAddOnDeck(["p",pk]);
        }
      }
      if ((type == "note") || (type == "nevent")) {
        console.log("addItemToThisList add to aTagsToAddE");
        const eventID = data;
        let alreadyInAddList = false;
        for (let x=0; x<aTagsToAddE.length; x++){
          const aNextTag = aTagsToAddE[x];
          const sNext = aNextTag[1];
          if (sNext == eventID) {
            // already present
            alreadyInAddList = true;
          }
        }
        if (!alreadyInAddList) {
          // add to add list
          setATagToAddOnDeck(["e",eventID]);
        }
      }
    } catch (err) {
      setATagToAddOnDeck([]);
    }
  }

  const removeThisItemFromDeleteListA = (foo) => {
    // foo is a string of the form: kind:pubkey:listName
    if (aTagsToDeleteA.includes(foo)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteA));
      const item = newArray.indexOf(foo);
      newArray.splice(item,1);
      setATagsToDeleteA(newArray);
      recalculateUpdatedListEventAfterDeletion("a",newArray);
    }
  }
  const removeThisItemFromDeleteListE = (eventID) => {
    if (aTagsToDeleteE.includes(eventID)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteE));
      const item = newArray.indexOf(eventID);
      newArray.splice(item,1);
      setATagsToDeleteE(newArray);
      recalculateUpdatedListEventAfterDeletion("e",newArray);
    }
  }
  const removeThisItemFromDeleteListP = (pubkey) => {
    if (aTagsToDeleteP.includes(pubkey)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteP));
      const item = newArray.indexOf(pubkey);
      newArray.splice(item,1);
      setATagsToDeleteP(newArray);
      recalculateUpdatedListEventAfterDeletion("p",newArray);
    }
  }
  const removeThisItemFromDeleteListT = (tag) => {
    if (aTagsToDeleteT.includes(tag)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteT));
      const item = newArray.indexOf(tag);
      newArray.splice(item,1);
      setATagsToDeleteT(newArray);
      recalculateUpdatedListEventAfterDeletion("t",newArray);
    }
  }

  const createEventWithUpdatedTags = (aNewTags) => {
    const newEvent: NostrEvent = {
      content: event.content,
      kind: event.kind,
      tags: aNewTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = getSignature(newEvent, myPrivkey);

    setUpdatedEvent(newEvent);
    console.log("createEventWithUpdatedTags");
  }

  const recalculateUpdatedListEventAfterDeletion = (updatedListType, newArray) => {
    console.log("recalculateUpdatedListEventAfterDeletion A");
    let aTagsToDeleteA_ = JSON.parse(JSON.stringify(aTagsToDeleteA));
    let aTagsToDeleteE_ = JSON.parse(JSON.stringify(aTagsToDeleteE));
    let aTagsToDeleteP_ = JSON.parse(JSON.stringify(aTagsToDeleteP));
    let aTagsToDeleteT_ = JSON.parse(JSON.stringify(aTagsToDeleteT));
    if (updatedListType == "a") {
      aTagsToDeleteA_ = JSON.parse(JSON.stringify(newArray));
    }
    if (updatedListType == "e") {
      aTagsToDeleteE_ = JSON.parse(JSON.stringify(newArray));
    }
    if (updatedListType == "p") {
      aTagsToDeleteP_ = JSON.parse(JSON.stringify(newArray));
    }
    if (updatedListType == "t") {
      aTagsToDeleteT_ = JSON.parse(JSON.stringify(newArray));
    }
    const currentTags = JSON.parse(JSON.stringify(event.tags));
    const aNewTags = [];
    for (let x=0; x<currentTags.length; x++) {
      const aNextTag = currentTags[x];
      let includeThisTag = true;
      if ((aNextTag[0] == "a") && (aTagsToDeleteA_.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "e") && (aTagsToDeleteE_.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "p") && (aTagsToDeleteP_.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if ((aNextTag[0] == "t") && (aTagsToDeleteT_.includes(aNextTag[1])) ) {
        includeThisTag = false;
      }
      if (includeThisTag) {
        aNewTags.push(aNextTag);
      }
    }
    // add new tags to aNewTags
    const aNewTags2 = [...aNewTags, ...aTagsToAddA, ...aTagsToAddE, ...aTagsToAddP, ...aTagsToAddT];

    createEventWithUpdatedTags(aNewTags2);
  }

  const addThisItemToDeleteListA = (foo) => {
    if (!aTagsToDeleteA.includes(foo)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteA));
      newArray.push(foo);
      setATagsToDeleteA(newArray);
      recalculateUpdatedListEventAfterDeletion("a", newArray);
    }
  }
  const addThisItemToDeleteListE = (eventID) => {
    if (!aTagsToDeleteE.includes(eventID)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteE));
      newArray.push(eventID);
      setATagsToDeleteE(newArray);
      recalculateUpdatedListEventAfterDeletion("e", newArray);
    }
  }
  const addThisItemToDeleteListP = (pubkey) => {
    if (!aTagsToDeleteP.includes(pubkey)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteP));
      newArray.push(pubkey);
      setATagsToDeleteP(newArray);
      recalculateUpdatedListEventAfterDeletion("p", newArray);
    }
  }
  const addThisItemToDeleteListT = (tag) => {
    if (!aTagsToDeleteP.includes(tag)) {
      const newArray = JSON.parse(JSON.stringify(aTagsToDeleteT));
      newArray.push(tag);
      setATagsToDeleteT(newArray);
      recalculateUpdatedListEventAfterDeletion("t", newArray);
    }
  }
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

  const oTagUpdates = {
    aTagToAddOnDeck,
    aTagsToAddA,
    aTagsToAddE,
    aTagsToAddP,
    aTagsToAddT,
    aTagsToDeleteA,
    aTagsToDeleteE,
    aTagsToDeleteP,
    aTagsToDeleteT,
  };

  // people
  let importedPeopleText = "";
  if (aTagsToAddP.length > 0) {
    importedPeopleText = " + "+aTagsToAddP.length;
  }

  let deletedPeopleText = "";
  if (aTagsToDeleteP.length > 0) {
    deletedPeopleText = " - "+aTagsToDeleteP.length;
  }

  // notes
  let importedBookmarksText = "";
  if (aTagsToAddE.length > 0) {
    importedBookmarksText = " + "+aTagsToAddE.length;
  }

  let deletedBookmarksText = "";
  if (aTagsToDeleteE.length > 0) {
    deletedBookmarksText = " - "+aTagsToDeleteE.length;
  }

  // tags
  let importedTagsText = "";
  if (aTagsToAddT.length > 0) {
    importedTagsText = " + "+aTagsToAddT.length;
  }

  let deletedTagsText = "";
  if (aTagsToDeleteT.length > 0) {
    deletedTagsText = " - "+aTagsToDeleteT.length;
  }

  // lists
  let importedListsText = "";
  if (aTagsToAddA.length > 0) {
    importedListsText = " + "+aTagsToAddA.length;
  }

  let deletedListsText = "";
  if (aTagsToDeleteA.length > 0) {
    deletedListsText = " - "+aTagsToDeleteA.length;
  }

  const naddr = nip19.naddrEncode({
    pubkey: event.pubkey,
    kind: event.kind,
    identifier: listName,
    relays: [],
  });

  return (
    <>
      <center>
        <div
          style={{
            textAlign: 'left',
            marginTop: '20px',
            paddingBottom: '10px',
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
                fontSize: '14px',
                color: 'grey',
                textAlign: 'right',
              }}
            >
              <div style={{marginBottom: '5px'}}>{listType} ({kind})</div>
            </div>
          </div>
          <MiniProfile pubkey={event.pubkey} />
        </div>

        <div style={{display: 'none', width: '700px', textAlign: 'left'}}>
          <ToggleRawListEvent event={event} />
        </div>

        <div style={{ width: '600px', textAlign: 'left', marginBottom: '20px' }}>
          <div
            style={{
              color: 'grey',
              padding: '10px',
              fontSize: '22px',
            }}
          >
            <div style={{ display: 'inline-block' }}>
              {numItems} {numItemsText}, {numLists} imported {numListsText}
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
                marginTop: '10px',
              }}
            >
              people ({aTags_p.length}
              <span style={{ color: 'green' }}>{importedPeopleText}</span>
              <span style={{ color: 'red' }}>{deletedPeopleText}</span>)
            </div>
            <div >
              <div
                style={{
                  width: 'calc(100% - 50px)',
                  float: 'right',
                }}
              >
                <ShowPeoplePanel
                  peoplePanelState={peoplePanelState}
                  aTags_p={aTags_p}
                  naddr={naddr}
                />
              </div>
            </div>
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
                marginTop: '10px',
              }}
            >
              imported lists (
                {aTags_a.length}
                <span style={{color: 'green'}}>{importedListsText}</span>
                <span style={{color: 'red'}}>{deletedListsText}</span>
                )
            </div>
            <div>
              <div
                style={{
                  width: 'calc(100% - 50px)',
                  float: 'right',
                }}
              >
                <ShowListsPanel
                  listsPanelState={listsPanelState}
                  aTags_a={aTags_a}
                />
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

const CheckForUpdatedList = ({oCurrentEvent}) => {
  // start with existing eventID and event
  // search for updated list using pubkey, listName, and kind
  // If found, then add the new event and update nip51ListFocusEventId

  const dispatch = useDispatch();

  let listName = "foo";
  const aTags_d = oCurrentEvent.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }

  const filter = {
    kinds: [oCurrentEvent.kind],
    authors: [oCurrentEvent.pubkey],
    "#d": [listName],
  };

  const { events } = useNostrEvents({
    filter,
  });
  for (let x=0; x<events.length;x++) {
    const event = events[x];
    if (oCurrentEvent.created_at < event.created_at) {
      dispatch(addNip51ListToSqlAndReduxStore(event));
      dispatch(updateNip51ListFocusEventId(event.id));
    }
  }

  return <></>;
}

const List = ({nip51ListFocusEventId}) => {
  const oNip51Lists = useSelector((state) => state.nip51.lists);
  if ( (!nip51ListFocusEventId) || (!oNip51Lists[nip51ListFocusEventId]) ) {
    return (
      <>
        <div>nip51ListFocusEventId: {nip51ListFocusEventId}</div>
        <ListNotInDatabase />
      </>
    )
  }
  const oCurrentEvent = oNip51Lists[nip51ListFocusEventId].event;
  return (
    <>
      <CheckForUpdatedList oCurrentEvent={oCurrentEvent} />
      <ListInDatabase nip51ListFocusEventId={nip51ListFocusEventId} />
    </>

  )
};

export default List;
