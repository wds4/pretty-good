import { useState } from 'react';
import DeleteButton from './deleteButton';

const SingleTagPanel = ({
  tag,
  aTagsToDeleteT,
  editListState,
  removeThisItemFromDeleteListT,
  addThisItemToDeleteListT,
}) => {
  let initState = false;
  if (aTagsToDeleteT.includes(tag)) {
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
    removeThisItemFromDeleteListT(tag);
  }
  const addItemToDeleteList = () => {
    addThisItemToDeleteListT(tag);
  }
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
            backgroundColor,
            fontSize: '26px',
            padding: '5px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
        >
          {tag}
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
};

const ShowTagsPanel = ({
  tagsPanelState,
  aTags_t,
  aTagsToDeleteT,
  editListState,
  removeThisItemFromDeleteListT,
  addThisItemToDeleteListT,
  oTagUpdates,
}) => {
  if (tagsPanelState == 'open') {
    return (
      <>
        <div>
          {aTags_t.map((oTag) => {
            const tag = oTag[1];
            return (
              <>
                <SingleTagPanel
                  tag={tag}
                  aTagsToDeleteT={aTagsToDeleteT}
                  editListState={editListState}
                  removeThisItemFromDeleteListT={removeThisItemFromDeleteListT}
                  addThisItemToDeleteListT={addThisItemToDeleteListT}
                />
              </>
            )
          })}
          <div style={{border: '2px solid green', borderRadius: '5px', padding: '5px', backgroundColor: 'white'}}>
            <center style={{color: 'green'}}>added tags</center>
            {oTagUpdates.aTagsToAddT.map((oTag) => {
            const tag = oTag[1];
            return (
              <>
                <SingleTagPanel
                  tag={tag}
                  aTagsToDeleteT={aTagsToDeleteT}
                  editListState={editListState}
                  removeThisItemFromDeleteListT={removeThisItemFromDeleteListT}
                  addThisItemToDeleteListT={addThisItemToDeleteListT}
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
export default ShowTagsPanel;
