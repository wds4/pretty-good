

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
    if ((newItemGroup.includes("nip19identifier")) || (newItemGroup == "plainText")) {
      processNewItemText_nip19identifier_or_plainText(inputText);
    }
    if (newItemGroup == "anotherList") {
      processNewItemText_anotherList(inputText)
    }
  }
}

export default processNewItemText;
