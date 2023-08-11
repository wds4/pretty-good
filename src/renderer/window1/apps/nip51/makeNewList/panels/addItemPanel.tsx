import AddItemButton from '../components/addItemButton';
import NewItemIdentifier from '../components/newItemIdentifier';
import NewItemPlainText from '../components/newItemPlainText';
import ItemTypeSelector from '../components/itemTypeSelector';
import AnotherListIdentificationMethodSelector from '../components/anotherListIdentificationMethodSelector';
import ShowSingleItem from '../showSingleItem';
import ImportListTextareas from '../components/importListTextareas';
import ImportListSpecifyListname from '../components/importListSpecifyListname';
import ExistingListTypeSelector from '../components/existingListTypeSelector';

const Title = ({ aItems }) => {
  if (aItems.length == 0) {
    return (
      <>
        <div style={{textAlign: "left"}}>add the first item, or import items from another list</div>
      </>
    );
  }
  return (
    <>
      <div style={{textAlign: "left"}}>add another item, or import items from another list</div>
    </>
  );
};

const NewItemTextareaContainer = ({
  processNewItemText,
  setIsNewItemValid,
  newListKind,
  newItemGroup,
  setNewItemText,
  setExistingListName,
  setExistingListRetrievalMethod,
}) => {
  if (newItemGroup === 'anotherList') { return <></>; }
  return (
    <>
      <div
        style={{
          minWidth: '200px',
          flexGrow: '999',
        }}
      >
        <NewItemTextarea
          processNewItemText={processNewItemText}
          setIsNewItemValid={setIsNewItemValid}
          newListKind={newListKind}
          newItemGroup={newItemGroup}
          setNewItemText={setNewItemText}
          setExistingListName={setExistingListName}
          setExistingListRetrievalMethod={setExistingListRetrievalMethod}
        />
      </div>
    </>
  )
}

const NewItemTextarea = ({
  processNewItemText,
  setIsNewItemValid,
  newListKind,
  newItemGroup,
  setNewItemText,
  setExistingListName,
  setExistingListRetrievalMethod,
}) => {
  if (newItemGroup.includes("nip19identifier")) {
    return (
      <>
        <NewItemIdentifier
          processNewItemText={processNewItemText}
          newListKind={newListKind}
          newItemGroup={newItemGroup}
        />
      </>
    );
  }
  if (newItemGroup == 'plainText') {
    return (
      <>
        <NewItemPlainText
          processNewItemText={processNewItemText}
        />
      </>
    );
  }
  return <></>;
};

const ImportListNip19TextareaContainer = ({
  processNewItemText,
  newListKind,
  newItemGroup,
  existingListRetrievalMethod,
}) => {
  if (newItemGroup != "anotherList") return ( <></> )
  return (
    <>
      <div
        style={{
          minWidth: '200px',
          flexGrow: '999',
        }}
      >
        <ImportListTextareas
          processNewItemText={processNewItemText}
          newListKind={newListKind}
          newItemGroup={newItemGroup}
          existingListRetrievalMethod={existingListRetrievalMethod}
        />
      </div>
    </>
  )
}

const ImportListSpecifyListnameContainer = ({
  existingListRetrievalMethod,
  setExistingListName,
}) => {
  if (existingListRetrievalMethod != "authorAndListName") { return <></> }
  return (
    <>
      <div
        style={{
          width: '100%',
          flexGrow: '999',
        }}
      >
        <ImportListSpecifyListname
          setExistingListName={setExistingListName}
        />
      </div>
    </>
  )
}

const ExistingListTypeSelectorContainer = ({
  newItemGroup,
  existingListRetrievalMethod
}) => {
  if (newItemGroup=="anotherList" && existingListRetrievalMethod=="authorAndListName") {
    return (
      <>
        <div
          style={{
            width: '300px',
            flexGrow: '1',
          }}
        >
          <ExistingListTypeSelector
          />
        </div>
      </>
    )
  }
  return <></>;
}

const AnotherListIdentificationMethodSelectorContainer = ({
  processNewItemText,
  newListKind,
  setExistingListRetrievalMethod,
  newItemGroup,
}) => {
  if (newItemGroup == "anotherList") {
    return (
      <>
        <div
          style={{
            minWidth: '50%',
            flexGrow: '999',
          }}
        >
          <AnotherListIdentificationMethodSelector
            processNewItemText={processNewItemText}
            newListKind={newListKind}
            setExistingListRetrievalMethod={setExistingListRetrievalMethod}
          />
        </div>
      </>
    )
  }
  return <></>;
}

const AddItemPanel = ({
  processNewItemText,
  resetNewItemInput,
  setIsNewItemValid,
  aItems,
  addItem,
  newListKind,
  whichStep,
  startOver,
  setNewItemGroup,
  setNewItemText,
  setExistingListName,
  setExistingListRetrievalMethod,
  newItemGroup,
  newItemText,
  newItemType,
  newItemData,
  isNewItemValid,
  isNewItemAlreadyOnList,
  existingListRetrievalMethod,
  existingListName,
  existingListAuthorPubkey,
}) => {
  if (whichStep == 0) {
    return <></>;
  }
  let aItem = [];
  if (newItemGroup=="plainText") {
    aItem = [newItemText, newItemGroup];
  }
  if (newItemGroup=="anotherList") {
    aItem = [newItemText, newItemGroup, existingListName, existingListAuthorPubkey];
  }
  if ( (newItemGroup.includes("nip19identifier")) && (isNewItemValid == "yes") ) {
    if (newItemData) {
      aItem = [newItemText, newItemType, newItemData];
    }
  }
  const showDeleteButton = false;
  return (
    <>
      <div
        style={{
          width: '100%',
          marginTop: '20px',
          borderRadius: '10px',
        }}
      >
        <div className="h4" style={{ fontSize: '26px', marginBottom: '10px' }}>
          <Title aItems={aItems} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '175px',
              flexGrow: '1',
            }}
          >
            <ItemTypeSelector
              setNewItemText={setNewItemText}
              setNewItemGroup={setNewItemGroup}
              resetNewItemInput={resetNewItemInput}
              newListKind={newListKind}
            />
          </div>
          <AnotherListIdentificationMethodSelectorContainer
            processNewItemText={processNewItemText}
            newListKind={newListKind}
            setExistingListRetrievalMethod={setExistingListRetrievalMethod}
            newItemGroup={newItemGroup}
          />
          <ImportListSpecifyListnameContainer
            existingListRetrievalMethod={existingListRetrievalMethod}
            setExistingListName={setExistingListName}
          />
          <ImportListNip19TextareaContainer
            processNewItemText={processNewItemText}
            newListKind={newListKind}
            newItemGroup={newItemGroup}
            existingListRetrievalMethod={existingListRetrievalMethod}
          />
          <ExistingListTypeSelectorContainer
            newItemGroup={newItemGroup}
            existingListRetrievalMethod={existingListRetrievalMethod}
          />
          <NewItemTextareaContainer
            processNewItemText={processNewItemText}
            setIsNewItemValid={setIsNewItemValid}
            newListKind={newListKind}
            newItemGroup={newItemGroup}
            setNewItemText={setNewItemText}
            setExistingListName={setExistingListName}
            setExistingListRetrievalMethod={setExistingListRetrievalMethod}
          />

          <div
            style={{
              width: '50px',
              flexGrow: '1',
            }}
          >
            <AddItemButton
              isNewItemValid={isNewItemValid}
              newItemGroup={newItemGroup}
              newItemText={newItemText}
              addItem={addItem}
              isNewItemAlreadyOnList={isNewItemAlreadyOnList}
              existingListRetrievalMethod={existingListRetrievalMethod}
              existingListName={existingListName}
            />
          </div>
        </div>

        <div
          style={{
            width: '100%',
            marginTop: "10px",
          }}
        >
          <IsNewItemAlreadyOnList isNewItemAlreadyOnList={isNewItemAlreadyOnList} />
          <ShowSingleItem
            isNewItemAlreadyOnList={isNewItemAlreadyOnList}
            item={aItem}
            kind={newListKind}
            showDeleteButton={showDeleteButton}
            newItemGroup={newItemGroup}
            existingListRetrievalMethod={existingListRetrievalMethod}
            existingListName={existingListName}
            isNewItemValid={isNewItemValid}
            existingListAuthorPubkey={existingListAuthorPubkey}
          />
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
export default AddItemPanel;

const IsNewItemAlreadyOnList = ({isNewItemAlreadyOnList}) => {
  if (isNewItemAlreadyOnList == "no") { return <></>; }
  return (
    <div
      style={{
        border: '1px solid grey',
        borderRadius: '5px',
        boxSizing: 'border-box',
        width: '100%',
        height: '50px',
        padding: '10px',
        fontSize: '18px',
        marginBottom: '5px',
      }}
    >This item is already on the list!</div>
  )
}
