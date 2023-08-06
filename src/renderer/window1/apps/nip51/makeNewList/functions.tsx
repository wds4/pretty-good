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
  setIsNewItemValid,
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
  isNewItemValid,
  whichStep,
  aItems,
}) => {
  const resetNewItemInput = () => {
    setIsNewItemValid('no');
    // setNewItemText('');
    setNewItemType('');
    setNewItemDataType('');
    setNewItemData('');
    setNewItemHex('');
  }
  const processNewItemText = (inputText) => {
    if (!inputText) {
      resetNewItemInput();
    }
    if (inputText) {
      setNewItemText(inputText);
      try {
        // console.log("qwerty processNewItemText B; inputText: "+inputText)
        const { type, data } = nip19.decode(inputText);
        // console.log(`qwerty nip19 decode: ${inputText}; type: ${type}`);
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
      } catch (error) {
        resetNewItemInput()
      }
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

  return (
    <>
      <PageLayout
        processNewItemText={processNewItemText}
        handleToggleWhichStep={handleToggleWhichStep}
        startOver={startOver}
        addItem={addItem}
        startNewList={startNewList}
        resetNewItemInput={resetNewItemInput}

        setIsNewItemValid={setIsNewItemValid}
        setNewListName={setNewListName}
        setNewItemGroup={setNewItemGroup}
        setNewItemText={setNewItemText}
        setNewListKind={setNewListKind}

        newListKind={newListKind}
        newListName={newListName}
        newItemGroup={newItemGroup}
        newItemText={newItemText}
        newItemType={newItemType}
        newItemData={newItemData}
        isNewItemValid={isNewItemValid}
        whichStep={whichStep}
        aItems={aItems}
      />
    </>
  );
};
export default MakeNewListFunctions;
