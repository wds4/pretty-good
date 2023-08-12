import NewListEventContainer from './components/newListEventContainer';
import MakeNewListTitle from './components/makeNewListTitle';
import InitListPanel from './panels/initListPanel';
import AddItemPanel from './panels/addItemPanel';
import ShowItemsPanel from './panels/showItemsPanel';
import ButtonsPanel from './panels/buttonsPanel';

const PageLayout = ({
  processNewItemText,
  handleToggleWhichStep,
  startOver,
  addItem,
  startNewList,
  resetNewItemInput,
  removeSingleItem,

  setNewListName,
  setIsNewItemValid,
  setNewItemGroup,
  setNewItemText,
  setNewListKind,
  setExistingListName,
  setExistingListRetrievalMethod,

  newListKind,
  newListName,
  newItemGroup,
  newItemText,
  newItemType,
  newItemData,
  isNewItemValid,
  isNewItemAlreadyOnList,
  existingListRetrievalMethod,
  existingListName,
  existingListAuthorPubkey,
  whichStep,
  aItems,
}) => {
  return (
    <>
      <center>
        <div
          className="mainPageElement"
          style={{
            maxWidth: '800px',
            minWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
            fontFamily: 'Arial',
          }}
        >
          <div
            className="titlePanel"
            style={{
              width: '100%',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                height: '50px',
                display: "inline-block",
              }}
            >
              <div
                style={{
                  height: "50px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <MakeNewListTitle />
              </div>
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
              <ButtonsPanel
                startOver={startOver}
                aItems={aItems}
                whichStep={whichStep}
                newListKind={newListKind}
              />
            </div>
          </div>

          <div
            className="initListPanel"
            style={{
              width: '100%',
            }}
          >
            <InitListPanel
              newListKind={newListKind}
              newListName={newListName}
              whichStep={whichStep}
              setNewListName={setNewListName}
              handleToggleWhichStep={handleToggleWhichStep}
              startOver={startOver}
              setNewListKind={setNewListKind}
            />
          </div>

          <div
            className="addItemsPanel"
            style={{
              width: '100%',
              paddingBottom: '20px',
            }}
          >
            <AddItemPanel
              processNewItemText={processNewItemText}
              aItems={aItems}
              addItem={addItem}
              resetNewItemInput={resetNewItemInput}
              setIsNewItemValid={setIsNewItemValid}
              setNewItemGroup={setNewItemGroup}
              setNewItemText={setNewItemText}
              setExistingListName={setExistingListName}
              setExistingListRetrievalMethod={setExistingListRetrievalMethod}
              newListKind={newListKind}
              whichStep={whichStep}
              startOver={startOver}
              newItemGroup={newItemGroup}
              newItemText={newItemText}
              newItemType={newItemType}
              newItemData={newItemData}
              isNewItemValid={isNewItemValid}
              isNewItemAlreadyOnList={isNewItemAlreadyOnList}
              existingListRetrievalMethod={existingListRetrievalMethod}
              existingListName={existingListName}
              existingListAuthorPubkey={existingListAuthorPubkey}
            />
          </div>

          <center>
            <div
              className="showItemsPanel"
              style={{
                width: '80%',
              }}
            >
              <ShowItemsPanel
                removeSingleItem={removeSingleItem}
                aItems={aItems}
                newListKind={newListKind}
              />
            </div>
          </center>

          <div style={{ display: 'none' }}>
            <NewListEventContainer
              aItems={aItems}
              newListKind={newListKind}
              newListName={newListName}
            />
          </div>
        </div>
      </center>
    </>
  );
};
export default PageLayout;
