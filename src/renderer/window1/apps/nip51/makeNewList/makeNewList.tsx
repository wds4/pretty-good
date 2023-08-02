import React, { useState } from 'react';
import ShowSingleItem from './showSingleItem';
import AddItemButton from './components/addItemButton';
import NewListName from './components/newListName';
import NewItemIdentifier from './components/newItemIdentifier';
import NewListTypeSelector from './components/newListTypeSelector';
import LockListNameButton from './components/lockListNameButton';
import PublishButton from './components/publishButton';
import StartOverButton from './components/startOverButton';
import PublicOrPrivateSelector from './components/publicOrPrivateSelector';
import NewListEventContainer from './components/newListEventContainer';

const NewListDescriptors = ({
  newListKind,
  newListName,
  whichStep,
  resetNewName,
  handleToggleWhichStep,
  startOver,
}) => {
  const updateListName = () => {
    const e2 = document.getElementById('newListTitle');
    if (e2) {
      resetNewName();
    }
  };

  const startNewList = () => {
    handleToggleWhichStep();
    startOver();
  };
  return (
    <>
      <div style={{}}>
        <div style={{marginBottom: '20px'}}>
          <NewListTypeSelector />
          <PublicOrPrivateSelector />
        </div>
        <div style={{ width: '80%' }}>
          <NewListName
            newListKind={newListKind}
            updateListName={updateListName}
            v={newListKind}
          />
        </div>
        <div style={{  }}>
          <LockListNameButton
            newListKind={newListKind}
            newListName={newListName}
            whichStep={whichStep}
            startNewList={startNewList}
          />
        </div>
      </div>
    </>
  );
};

const AddItem = ({setIsItemValid_yes, setIsItemValid_no, aItems, addItemParent, newListKind, whichStep }) => {
  let isItemValid = null;
  const e2 = document.getElementById("listItemTextarea");
  if (e2) {
    isItemValid = e2.dataset.isitemvalid;
  }

  const e = document.getElementById('newListTypeSelector');
  let kind = '0';
  if (e) {
    kind = e.options[e.selectedIndex].value;
  }
  const resetItems = () => {
    console.log('resetItems');
    setAItems([]);
  };
  if (whichStep == 0) {
    return <></>;
  }
  return (
    <>
      <div
        style={{
          width: '800px',
          border: '0px solid grey',
          borderRadius: '10px',
        }}
      >
        <div className="h4" style={{ fontSize: '26px', marginBottom: '10px' }}>
          add items, using{' '}
          <a
            href="https://github.com/nostr-protocol/nips/blob/master/19.md"
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            NIP-19
          </a>{' '}
          identifiers
        </div>
        <div style={{width:"80%"}}>
          <div style={{ display: "inline-block", width: '80%' }}>
            <NewItemIdentifier
              setIsItemValid_yes={setIsItemValid_yes}
              setIsItemValid_no={setIsItemValid_no}
              newListKind={newListKind}
            />
          </div>
          <div style={{ display: "inline-block", width: '20%' }}>
            <AddItemButton
              isItemValid={isItemValid}
              addItemParent={addItemParent}
            />
          </div>
        </div>
        <div
          id="itemInputFieldErrorBox"
          style={{ textAlign: 'left', color: 'red', display: 'none' }}
        >
          Item must be a valid NIP-19 identifier:
          <li>npub or nprofile for Mute or People lists</li>
          <li>nevent or note for Pin or Bookmark lists</li>
        </div>
      </div>
    </>
  );
};

const PublishAndStartOverButtons = ({ startOver, aItems, whichStep, postList }) => {
  if (aItems.length == 0) {
    return <></>
  }
  if (whichStep == 1) {
    return (
      <>
        <PublishButton postList={postList} />
        <StartOverButton startOver={startOver} />
      </>
    );
  }
  return <></>;
};

const MakeNewList = () => {
  const [newListKind, setNewListKind] = useState(0);
  const [newListName, setNewListName] = useState('');
  const [whichStep, setWhichStep] = useState(0); // whether or not to show new items panel
  const [aItems, setAItems] = useState([]); // an array of all items in the current list
  const [isItemValid, setIsItemValid] = useState("no");

  const setIsItemValid_yes = () => {
    setIsItemValid("yes")
  }
  const setIsItemValid_no = () => {
    setIsItemValid("no")
  }

  const startOver = () => {
    setAItems([]);
    handleToggleWhichStep();
  }

  const addItem = () => {
    const newItem = document.getElementById('listItemTextarea').value;
    const newItemType = document.getElementById("listItemTextarea").dataset.nip19type;
    const sNewItemData = document.getElementById("listItemTextarea").dataset.nip19data;
    const isItemValidX = document.getElementById("listItemTextarea").dataset.isitemvalid;
    if ( (isItemValidX=="no") || (isItemValidX=="") ) {
      document.getElementById("itemInputFieldErrorBox").style.display = "block";
      setIsItemValid("no")
    }
    if (isItemValidX=="yes") {
      setIsItemValid("yes")
      if (sNewItemData) {
        const aNewItem = [newItem, newItemType, sNewItemData]
        setAItems(aItems.concat([aNewItem]));
        // reset new item data
        document.getElementById("nip19IdentifierTypeContainer").innerHTML = "";
        document.getElementById("dataContainer").innerHTML = "";
        document.getElementById("hexContainer").innerHTML = "";
        document.getElementById('listItemTextarea').value = "";
        document.getElementById("isItemValidContainer").innerHTML = "";
        document.getElementById("listItemTextarea").dataset.nip19type = "";
        document.getElementById("listItemTextarea").dataset.nip19data = "";
        document.getElementById("listItemTextarea").dataset.isitemvalid = "";
        setIsItemValid("no")
        updateMessageHopeToDeprecate();
      }
    }
  };

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

  const postList = () => {
    console.log('postList');
  };

  const resetNewName = () => {
    const e2 = document.getElementById('newListTitle');
    if (e2) {
      setNewListName(e2.value);
    }
  };

  const updateMessageHopeToDeprecate = () => {
    const newListTitle = document.getElementById('newListTitle').value;
    const aTags = [];
    aTags.push(['d', newListTitle]);

    const aitems = JSON.parse(document.getElementById("aItemsContainer").dataset.aitems);

    const aFoo = document.getElementsByClassName("singleItemDataContainer")

    for (let x=0; x<aitems.length; x++) {
      const aItem = aitems[x];
      const type = aitems[1];
      const aTab = ["p",type];
      aTags.push(aTab);
    }

    const e1 = document.getElementById('newListTypeSelector');
    let kind = 0;
    if (e1) {
      kind = e1.options[e1.selectedIndex].value;
      setNewListKind(kind);
    }

    if (kind >= 30000) {
      const e2 = document.getElementById('newListTitle');
      if (e2) {
        setNewListName(e2.value);
      }
    }
    if (kind == 0) {
      setNewListName('');
      setWhichStep(0);
    }
    if (kind == 10000) {
      setNewListName('mute');
    }
    if (kind == 10001) {
      setNewListName('pin');
    }
  };

  return (
    <>
      <div>
        <div
          id="aItemsContainer"
          data-aitems={JSON.stringify(aItems)}
          style={{display: "none"}}
        >
        aItems: {JSON.stringify(aItems)};<br/> {aItems.map((item)=>{
          return (
            <>
            <div>{JSON.stringify(item)}</div>
            </>
          )
        })}
        </div>
        <div className="h3" style={{ fontSize: '26px', marginBottom: '20px' }}>
          Make New{' '}
          <a
            href="https://github.com/nostr-protocol/nips/blob/master/51.md"
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            NIP-51
          </a>{' '}
          List
        </div>
        <center>
          <div style={{ position: 'relative', display: 'inline-block'}}>
            <div
              onChange={updateMessageHopeToDeprecate}
              style={{
                width: '800px',
                borderRadius: '10px',
              }}
            >
              <NewListDescriptors
                newListKind={newListKind}
                newListName={newListName}
                whichStep={whichStep}
                resetNewName={resetNewName}
                handleToggleWhichStep={handleToggleWhichStep}
                startOver={startOver}
              />
            </div>
            <AddItem
              aItems={aItems}
              addItemParent={addItem}
              setIsItemValid_yes={setIsItemValid_yes}
              setIsItemValid_no={setIsItemValid_no}
              newListKind={newListKind}
              whichStep={whichStep}
            />
            <PublishAndStartOverButtons startOver={startOver} aItems={aItems} whichStep={whichStep} postList={postList} />
          </div>
          <div id="listItemsContainer">
            <div style={{fontSize: "22px", textAlign: "left", marginBottom: "10px"}}>Items on this list ({aItems.length}):</div>
            {aItems.map((item) => {
              return (<><ShowSingleItem item={item} kind={newListKind} /></>)
            })}
          </div>
        </center>
        <NewListEventContainer aItems={aItems} newListKind={newListKind} newListName={newListName} />
      </div>
    </>
  );
};
export default MakeNewList;
