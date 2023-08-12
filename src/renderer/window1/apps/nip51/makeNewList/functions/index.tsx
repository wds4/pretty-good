import { nip19 } from 'nostr-tools';
import PageLayout from '../pageLayout';

const checkForItemDuplication = (aItems, data, type) => {
  let itemDuplication = false;
  for (let x=0;x<aItems.length;x++) {
    const aItem = aItems[x];
    const itemType = aItem[1];
    if ((itemType == "nevent") && (type == "note")) {
      if (JSON.parse(aItem[2]).id == data) {
        itemDuplication = true;
      }
    }
    if ((itemType == "note") && (type == "nevent")) {
      if (aItem[2] == data.id) {
        itemDuplication = true;
      }
    }
    if ((itemType == "nprofile") && (type == "npub")) {
      if (JSON.parse(aItem[2]).pubkey == data) {
        itemDuplication = true;
      }
    }
    if ((itemType == "npub") && (type == "nprofile")) {
      if (aItem[2] == data.pubkey) {
        itemDuplication = true;
      }
    }
    // if itemType == type, then the duplication would have been caught in earlier step, bc newItemText would be a duplicate
  }
  return itemDuplication;
}

const MakeNewListFunctions = ({
  setNewListKind,
  setNewListName,
  setNewItemGroup,
  setNewItemText,
  setNewItemType,
  setNewItemData,
  setNewItemDataType,
  setNewItemHex,
  setExistingListKind,
  setExistingListName,
  setExistingListAuthorPubkey,
  setExistingListRetrievalMethod,
  setIsNewItemValid,
  setIsNewItemAlreadyOnList,
  setWhichStep,
  setAItems,

  newListKind,
  newListName,
  newItemGroup,
  newItemText,
  newItemType,
  newItemData,
  newItemDataType,
  newItemHex,
  existingListKind,
  existingListName,
  existingListAuthorPubkey,
  existingListRetrievalMethod,
  isNewItemValid,
  isNewItemAlreadyOnList,
  whichStep,
  aItems,
}) => {
  const resetNewItemInput = () => {
    setIsNewItemValid('no');
    // setNewItemText('');
    // setIsNewItemAlreadyOnList('no');
    setNewItemType('');
    setNewItemDataType('');
    setNewItemData('');
    setNewItemHex('');
    setExistingListName('');
    setExistingListKind('');
    setExistingListAuthorPubkey('');
    const e = document.getElementById("anotherListSearchTermTextarea");
    if (e) { e.value = '' }
  }

  const processNewItemText_anotherList = (inputText) => {
    console.log("qwerty processNewItemText_anotherList; inputText: "+inputText+"; existingListRetrievalMethod: "+existingListRetrievalMethod)
    // first, search existing lists and look for matches
    let inputTextDuplication = false;
    setIsNewItemAlreadyOnList('no');
    // TO DO: check for duplicates
    for (let x=0;x<aItems.length;x++) {
      const aItem = aItems[x];
      const itemText = aItem[0];
      if (inputText == itemText) {
        inputTextDuplication = true;
        resetNewItemInput();
        setIsNewItemAlreadyOnList('yes');
      }
    }

    // Then show all matches in the preview field
    if (!inputTextDuplication) {
      try {
        const oNip19Foo = nip19.decode(inputText);
        console.log("qwerty processNewItemText_anotherList; oNip19Foo: "+JSON.stringify(oNip19Foo))
        const { type, data } = nip19.decode(inputText);
        console.log("qwerty processNewItemText_anotherList; type: "+type)
        const itemDuplication = checkForItemDuplication(aItems, data, type);
        console.log("qwerty processNewItemText_anotherList; itemDuplication: "+itemDuplication)
        if (itemDuplication) {
          resetNewItemInput();
          setIsNewItemAlreadyOnList('yes');

        }
        if (!itemDuplication) {
          setNewItemType(type);
          if (existingListRetrievalMethod=="authorAndListName") { // type should be npub or nprofile
            if (type == 'npub') {
              setIsNewItemValid('yes');
              setExistingListAuthorPubkey(data);
            }
            if (type == 'nprofile') {
              setIsNewItemValid('yes');
              setExistingListAuthorPubkey(data.pubkey);
            }
          }
          if (existingListRetrievalMethod=="nip51identifier") { // type should be nevent, note, or naddr
            if (type == 'naddr') {
              setIsNewItemValid('yes');
              setNewItemData(JSON.stringify(data));
              setExistingListName(data.identifier);
              setExistingListAuthorPubkey(data.pubkey);
              setExistingListKind(data.kind);
            }
          }
        }
      } catch (error) {
        console.log("qwerty error: "+JSON.stringify(error))
        setIsNewItemValid('no');
        setExistingListAuthorPubkey('');
        setExistingListKind('');
      }
    }
  }

  const processNewItemText_nip19identifier_or_plainText = (inputText) => {
    let inputTextDuplication = false;
    setIsNewItemAlreadyOnList('no');
    for (let x=0;x<aItems.length;x++) {
      const aItem = aItems[x];
      const itemText = aItem[0];
      if (inputText == itemText) {
        inputTextDuplication = true;
        resetNewItemInput();
        setIsNewItemAlreadyOnList('yes');
      }
    }
    if (!inputTextDuplication) {
      try {
        const { type, data } = nip19.decode(inputText);
        // iterate through existing items to make sure the current one is not a duplicate
        const itemDuplication = checkForItemDuplication(aItems, data, type);
        if (itemDuplication) {
          resetNewItemInput();
          setIsNewItemAlreadyOnList('yes');
        }
        if (!itemDuplication) {
          setNewItemType(type);
          if (type == 'nevent') {
            setNewItemData(JSON.stringify(data));
            setNewItemHex(data.id);
            setNewItemDataType(typeof data);
            if (newListKind == 10000 || newListKind == 30000) {
              setIsNewItemValid('no');
            }
            if (newListKind == 10001) {
              setIsNewItemValid('yes');
            }
            if (newListKind == 30001) {
              setIsNewItemValid('yes');
            }
          }
          if (type == 'note') {
            setNewItemData(data);
            setNewItemHex(data);
            setNewItemDataType(typeof data);
            if (newListKind == 10000 || newListKind == 30000) {
              setIsNewItemValid('no');
            }
            if (newListKind == 10001) {
              setIsNewItemValid('yes');
            }
            if (newListKind == 30001) {
              setIsNewItemValid('yes');
            }
          }
          if (type == 'npub') {
            setNewItemData(data);
            setNewItemHex(data);
            setNewItemDataType(typeof data);
            if (newListKind == 10000 || newListKind == 30000) {
              setIsNewItemValid('yes');
            }
            if (newListKind == 10001) {
              setIsNewItemValid('no');
            }
            if (newListKind == 30001) {
              setIsNewItemValid('yes');
            }
          }
          if (type == 'nprofile') {
            setNewItemData(JSON.stringify(data));
            setNewItemHex(data.pubkey);
            setNewItemDataType(typeof data);
            if (newListKind == 10000 || newListKind == 30000) {
              setIsNewItemValid('yes');
            }
            if (newListKind == 10001) {
              setIsNewItemValid('no');
            }
            if (newListKind == 30001) {
              setIsNewItemValid('yes');
            }
          }
        }
      } catch (error) {
        resetNewItemInput();
      }
    }
  }

  const processNewItemText = (inputText) => {
    if (!inputText) {
      resetNewItemInput();
      setNewItemText('');
      setIsNewItemAlreadyOnList('no');
    }
    if (inputText) {
      setNewItemText(inputText);
      if ((newItemGroup.includes("nip19identifier")) || (newItemGroup == "plainText")) {
        processNewItemText_nip19identifier_or_plainText(inputText);
      }
      if (newItemGroup == "anotherList") {
        processNewItemText_anotherList(inputText);
      }
    }
  }
  const addItem = () => {
    if (newItemGroup=="anotherList") {
      if (isNewItemValid == 'yes') {
        if (existingListRetrievalMethod=="authorAndListName" || existingListRetrievalMethod=="nip51identifier") {
          const aNewItem = [
            newItemText,
            'anotherList',
            existingListName,
            existingListAuthorPubkey,
            existingListKind,
          ];
          setAItems(aItems.concat([aNewItem]));
          // reset new list item input field and analysis
          resetNewItemInput();
          setNewItemText('');
          setIsNewItemAlreadyOnList('no');
        }
      }
    }
    if (newItemGroup.includes("nip19identifier")) {
      if (isNewItemValid == 'yes') {
        if (newItemData) {
          const aNewItem = [newItemText, newItemType, newItemData];
          setAItems(aItems.concat([aNewItem]));
          // reset new list item input field and analysis
          resetNewItemInput();
          setNewItemText('');
          setIsNewItemAlreadyOnList('no');
          const e = document.getElementById('listItemTextarea');
          if (e) {
            e.value = "";
          }
        }
      }
    }
    if (newItemGroup=="plainText") {
      if (newItemText) {
        const aNewItem = [newItemText, "plainText"];
        setAItems(aItems.concat([aNewItem]));
        // reset new list item input field and analysis
        resetNewItemInput();
        setNewItemText('');
        setIsNewItemAlreadyOnList('no');
        const e = document.getElementById('listItemPlainTextTextarea');
        if (e) {
          e.value = "";
        }
      }
    }
  };

  // Need this function? simplify?
  const handleToggleWhichStep = () => {
    if (whichStep == 0) {
      setWhichStep(1);
      const e1 = document.getElementById('newListTypeSelector');
      e1.disabled = true;

      const e3 = document.getElementById('publicOrPrivateSelector');
      e3.disabled = true;

      const e2 = document.getElementById('newListTitle');
      e2.readOnly = true;
      e2.style.backgroundColor = '#DFDFDF';
    } else {
      setWhichStep(0);
      setNewListKind(0);
      setNewListName('');

      const e1 = document.getElementById('newListTypeSelector');
      e1.selectedIndex = 0;
      e1.disabled = false;

      const e3 = document.getElementById('publicOrPrivateSelector');
      e3.disabled = false;

      const e2 = document.getElementById('newListTitle');
      e2.value = '';
      e2.readOnly = false;
      e2.style.backgroundColor = '#FFFFFF';
    }
  };

  const startOver = () => {
    handleToggleWhichStep();
    // reset all hooks to their defaults
    setNewListKind(0);
    setNewListName('');
    setNewItemGroup('nip19identifier');
    setNewItemText('');
    setIsNewItemAlreadyOnList('no');
    setNewItemType('');
    setNewItemData('');
    setNewItemDataType('');
    setNewItemHex('');
    setIsNewItemValid('no');
    setWhichStep(0);
    setAItems([]);
    setExistingListName('');
    setExistingListAuthorPubkey('');
  };

  const startNewList = () => {
    handleToggleWhichStep();
    startOver();
  };

  const removeSingleItem = (itemNumber) => {
    const aUpdatedItems = [];
    for (let x=0;x<aItems.length;x++) {
      if (x != itemNumber) {
        aUpdatedItems.push(aItems[x]);
      }
    }
    setAItems(aUpdatedItems);
  }

  return (
    <>
      <PageLayout
        processNewItemText={processNewItemText}
        handleToggleWhichStep={handleToggleWhichStep}
        startOver={startOver}
        addItem={addItem}
        startNewList={startNewList}
        resetNewItemInput={resetNewItemInput}
        removeSingleItem={removeSingleItem}

        setIsNewItemValid={setIsNewItemValid}
        setNewListName={setNewListName}
        setNewItemGroup={setNewItemGroup}
        setNewItemText={setNewItemText}
        setNewListKind={setNewListKind}
        setExistingListName={setExistingListName}
        setExistingListRetrievalMethod={setExistingListRetrievalMethod}

        newListKind={newListKind}
        newListName={newListName}
        newItemGroup={newItemGroup}
        newItemText={newItemText}
        newItemType={newItemType}
        newItemData={newItemData}
        isNewItemValid={isNewItemValid}
        isNewItemAlreadyOnList={isNewItemAlreadyOnList}
        existingListRetrievalMethod={existingListRetrievalMethod}
        existingListName={existingListName}
        existingListAuthorPubkey={existingListAuthorPubkey}
        whichStep={whichStep}
        aItems={aItems}
      />
    </>
  );
};
export default MakeNewListFunctions;
