import AddItemButton from '../components/addItemButton';
import NewItemIdentifier from '../components/newItemIdentifier';
import NewItemPlainText from '../components/newItemPlainText';
import ItemTypeSelector from '../components/itemTypeSelector';
import AnotherListSelector from '../components/anotherListSelector';
import ShowSingleItem from '../showSingleItem';
import ImportListTextareas from '../../components/importListTextareas';

const Title = ({ aItems }) => {
  if (aItems.length == 0) {
    return (
      <>
        <div style={{textAlign: "left"}}>add the first item</div>
      </>
    );
  }
  return (
    <>
      <div style={{textAlign: "left"}}>add another item</div>
    </>
  );
};

const NewItemTextarea = ({
  processNewItemText,
  setIsNewItemValid,
  newListKind,
  newItemGroup,
  setNewItemText,
  setExistingListSearchTerm,
}) => {
  if (newItemGroup == 'nip19identifier') {
    return (
      <>
        <NewItemIdentifier
          processNewItemText={processNewItemText}
          newListKind={newListKind}
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
  if (newItemGroup == "anotherList") {
    return (
      <>
        <AnotherListSelector
          processNewItemText={processNewItemText}
          newListKind={newListKind}
        />
      </>
    )
  }
  return <></>;
};

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
  setExistingListSearchTerm,
  newItemGroup,
  newItemText,
  newItemType,
  newItemData,
  isNewItemValid,
  isNewItemAlreadyOnList,
}) => {
  if (whichStep == 0) {
    return <></>;
  }
  let aItem = [];
  if (newItemGroup=="plainText") {
    aItem = [newItemText, newItemGroup];
  }
  if ( (newItemGroup=="nip19identifier") && (isNewItemValid == "yes") ) {
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
            />
          </div>
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
              setExistingListSearchTerm={setExistingListSearchTerm}
            />
          </div>
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
            />
          </div>
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
          <ShowSingleItem isNewItemAlreadyOnList={isNewItemAlreadyOnList} item={aItem} kind={newListKind} showDeleteButton={showDeleteButton} />
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
