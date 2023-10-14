import { useState } from 'react';
import { useNostrEvents } from 'nostr-react';
import DeleteButton from './deleteButton';
import Post from 'renderer/window1/apps/nip51/makeNewList/showSingleItem/post';

const SingleNotePanel = ({
  eventID,
  aTagsToDeleteE,
  editListState,
  removeThisItemFromDeleteListE,
  addThisItemToDeleteListE,
}) => {
  let initState = false;
  if (aTagsToDeleteE.includes(eventID)) {
    initState = true;
  }
  const [deleteThisItem, setDeleteThisItem] = useState(initState);
  let border = '1px solid grey';
  let backgroundColor = '#EFEFEF';
  if (editListState && deleteThisItem) {
    border = '1px solid red';
    backgroundColor = '#CFCFCF';
  }
  const removeItemFromDeleteList = () => {
    removeThisItemFromDeleteListE(eventID);
  }
  const addItemToDeleteList = () => {
    addThisItemToDeleteListE(eventID);
  }

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
              border,
              borderRadius: '5px',
              marginBottom: '10px',
              backgroundColor,
            }}
          >
            <Post event={events[0]} />
          </div>
          <DeleteButton
            editListState={editListState}
            deleteThisItem={deleteThisItem}
            setDeleteThisItem={setDeleteThisItem}
            removeItemFromDeleteList={removeItemFromDeleteList}
            addItemToDeleteList={addItemToDeleteList}
          />
        </div>
      </>
    );
  }
  return <></>;
}

const ShowNotesPanel = ({
  notesPanelState,
  aTags_e,
  aTagsToDeleteE,
  editListState,
  removeThisItemFromDeleteListE,
  addThisItemToDeleteListE,
  oTagUpdates,
}) => {
  if (notesPanelState == 'open') {
    return (
      <>
        <div>
          {aTags_e.map((obj) => {
            const eventID = obj[1];
            return (
              <>
                <SingleNotePanel
                  eventID={eventID}
                  aTagsToDeleteE={aTagsToDeleteE}
                  editListState={editListState}
                  removeThisItemFromDeleteListE={removeThisItemFromDeleteListE}
                  addThisItemToDeleteListE={addThisItemToDeleteListE}
                />
              </>
            )
          })}
          <div style={{border: '2px solid green', borderRadius: '5px', padding: '5px', backgroundColor: 'white'}}>
          <center style={{color: 'green'}}>added bookmarks</center>
          {oTagUpdates.aTagsToAddE.map((obj) => {
          const eventID = obj[1];
          return (
            <>
              <SingleNotePanel
                eventID={eventID}
                aTagsToDeleteE={aTagsToDeleteE}
                editListState={editListState}
                removeThisItemFromDeleteListE={removeThisItemFromDeleteListE}
                addThisItemToDeleteListE={addThisItemToDeleteListE}
              />
            </>
          );
        })}
        </div>
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowNotesPanel;
