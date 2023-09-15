import { useState } from 'react';
import MiniProfile from '../makeNewList/showSingleItem/miniProfile'; // for items on the list
import DeleteButton from './deleteButton';

const SinglePersonPanel = ({
  pubkey,
  aTagsToDeleteP,
  editListState,
  removeThisItemFromDeleteListP,
  addThisItemToDeleteListP,
}) => {
  let initState = false;
  if (aTagsToDeleteP.includes(pubkey)) {
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
    removeThisItemFromDeleteListP(pubkey);
  }
  const addItemToDeleteList = () => {
    addThisItemToDeleteListP(pubkey);
  }
  return (
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
        <MiniProfile pubkey={pubkey} />
      </div>
      <DeleteButton
        editListState={editListState}
        deleteThisItem={deleteThisItem}
        setDeleteThisItem={setDeleteThisItem}
        removeItemFromDeleteList={removeItemFromDeleteList}
        addItemToDeleteList={addItemToDeleteList}
      />
    </div>
  )
}

const ShowPeoplePanel = ({
  peoplePanelState,
  aTags_p,
  aTagsToDeleteP,
  editListState,
  removeThisItemFromDeleteListP,
  addThisItemToDeleteListP,
  oTagUpdates,
}) => {
  if (peoplePanelState == 'open') {
    return (
      <>
        <div>
          {aTags_p.map((oPubkey) => {
            return (
              <>
                <SinglePersonPanel
                  pubkey={oPubkey[1]}
                  aTagsToDeleteP={aTagsToDeleteP}
                  editListState={editListState}
                  removeThisItemFromDeleteListP={removeThisItemFromDeleteListP}
                  addThisItemToDeleteListP={addThisItemToDeleteListP}
                />
              </>
            );
          })}
          <div style={{border: '2px solid green', borderRadius: '5px', padding: '5px', backgroundColor: 'white'}}>
          <center style={{color: 'green'}}>added people</center>
          {oTagUpdates.aTagsToAddP.map((oPubkey) => {
          return (
            <>
              <SinglePersonPanel
                pubkey={oPubkey[1]}
                aTagsToDeleteP={aTagsToDeleteP}
                editListState={editListState}
                removeThisItemFromDeleteListP={removeThisItemFromDeleteListP}
                addThisItemToDeleteListP={addThisItemToDeleteListP}
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
export default ShowPeoplePanel;
