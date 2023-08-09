import { nip19 } from 'nostr-tools';
import PageLayout from './pageLayout';

const MakeNewListFunctions = ({
  setNewListKind,
  setNewListName,
  setNewItemGroup,
  setNewItemText,
  setNewItemType,
  setNewItemData,
  setNewItemDataType,
  setNewItemHex,
  setExistingListSearchTerm,
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
  existingListSearchTerm,
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
  }

  const processNewItemText_anotherList = (inputText) => {
    console.log("processNewItemText_anotherList; inputText: "+inputText)
    // first, search existing lists and look for matches
    // Then show all matches in the preview field
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
      setIsNewItemAlreadyOnList('no')
    }
    if (inputText) {
      setNewItemText(inputText);
      if ((newItemGroup == "nip19identifier") || (newItemGroup == "plainText")) {
        processNewItemText_nip19identifier_or_plainText(inputText);
      }
      if (newItemGroup == "anotherList") {
        processNewItemText_anotherList(inputText)
      }

      /*
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
              if (newListKind == 10001 || newListKind == 30001) {
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
              if (newListKind == 10001 || newListKind == 30001) {
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
              if (newListKind == 10001 || newListKind == 30001) {
                setIsNewItemValid('no');
              }
            }
            if (type == 'nprofile') {
              setNewItemData(JSON.stringify(data));
              setNewItemHex(data.pubkey);
              setNewItemDataType(typeof data);
              if (newListKind == 10000 || newListKind == 30000) {
                setIsNewItemValid('yes');
              }
              if (newListKind == 10001 || newListKind == 30001) {
                setIsNewItemValid('no');
              }
            }
          }
        } catch (error) {
          resetNewItemInput();
        }
      }
      */


    }
  }

  const addItem = () => {
    if (newItemGroup=="nip19identifier") {
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
        setExistingListSearchTerm={setExistingListSearchTerm}

        newListKind={newListKind}
        newListName={newListName}
        newItemGroup={newItemGroup}
        newItemText={newItemText}
        newItemType={newItemType}
        newItemData={newItemData}
        isNewItemValid={isNewItemValid}
        isNewItemAlreadyOnList={isNewItemAlreadyOnList}
        whichStep={whichStep}
        aItems={aItems}
      />
    </>
  );
};
export default MakeNewListFunctions;
