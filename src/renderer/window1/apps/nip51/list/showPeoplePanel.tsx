import { useState } from 'react';
import MiniProfile from '../makeNewList/showSingleItem/miniProfile'; // for items on the list
import DeleteButton from './deleteButton';

const SinglePersonPanel = ({pubkey, editListState}) => {
  const [deleteThisItem, setDeleteThisItem] = useState(false);
  let border = '1px solid grey';
  let backgroundColor = '#EFEFEF';
  if (deleteThisItem) {
    border = '1px solid red';
    backgroundColor = '#CFCFCF';
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
      <DeleteButton editListState={editListState} deleteThisItem={deleteThisItem} setDeleteThisItem={setDeleteThisItem} />
    </div>
  )
}

const ShowPeoplePanel = ({ peoplePanelState, aTags_p, editListState }) => {
  if (peoplePanelState == 'open') {
    return (
      <>
        <div>
          {aTags_p.map((oPubkey) => {
            return (
              <>
                <SinglePersonPanel pubkey={oPubkey[1]} editListState={editListState} />
              </>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowPeoplePanel;
