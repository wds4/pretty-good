import { useState } from 'react';
import PlusImage from 'renderer/window1/assets/plus.png';
import MinusImage from 'renderer/window1/assets/minus.png';
import AddItemButton from './addItemButton';

const NewItemPanel = ({addItemPanelState}) => {
  if (addItemPanelState=="closed") {
    return <></>;
  }
  const placeholderText = "Enter a NIP-19 identifier";
  const updateNip19IdField = () => {
    console.log("updateNip19IdField")
  }
  const addItem = () => {
    console.log("addItem")
  }
  return (
    <>
      <div style={{display: 'flex'}}>
        <div
          style={{
            minWidth: '200px',
            flexGrow: '999',
          }}
        >
          <textarea
            placeholder={placeholderText}
            onChange={updateNip19IdField}
            id="nip19IdFieldTextarea"
            style={{
              padding: '5px',
              width: '100%',
              height: '50px',
              boxSizing: 'border-box',
              border: '2px solid purple',
              borderRadius: '5px',
              fontSize: '14px',
              fontFamily: 'Arial',
            }}
          />
        </div>
        <div
          style={{
            flexGrow: '1',
            marginLeft: '5px',
          }}
        >
          <AddItemButton addItem={addItem} />
        </div>
      </div>
    </>
  )
}

const AddItemToThisList = ({editListState}) => {
  const [addItemPanelState, setAddItemPanelState] = useState('closed');
  let toggleButtonImage = PlusImage;
  if (addItemPanelState == 'open') {
    toggleButtonImage = MinusImage;
  }
  if (addItemPanelState == 'closed') {
    toggleButtonImage = PlusImage;
  }
  const updateAddItemPanelState = () => {
    console.log('updateAddItemPanelState');
    if (addItemPanelState == 'open') {
      setAddItemPanelState('closed');
    }
    if (addItemPanelState == 'closed') {
      setAddItemPanelState('open');
    }
  };
  if (!editListState) {
    return <></>;
  }
  return (
    <>
      <div style={{border: '1px solid grey', borderRadius: '5px', backgroundColor: '#DFDFDF', padding: '5px'}}>
        <div>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
            onClick={updateAddItemPanelState}
          >
            <img
              src={toggleButtonImage}
              alt=""
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '250px',
                width: '50%',
                height: '50%',
                margin: '0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          <div style={{display: 'inline-block', fontSize: '22px', paddingTop: '12px'}}>Add item to this list</div>
        </div>
        <NewItemPanel addItemPanelState={addItemPanelState} />
      </div>
    </>
  )
}
export default AddItemToThisList;
