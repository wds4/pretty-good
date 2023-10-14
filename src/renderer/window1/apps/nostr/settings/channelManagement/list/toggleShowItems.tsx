import PlusImage from 'renderer/window1/assets/plus.png';
import MinusImage from 'renderer/window1/assets/minus.png';

const ToggleShowItems = ({ showItemsState, setShowItemsState }) => {
  let toggleButtonImage = PlusImage;
  if (showItemsState == 'open') {
    toggleButtonImage = MinusImage;
  }
  if (showItemsState == 'closed') {
    toggleButtonImage = PlusImage;
  }
  const updateLowerPanelState = () => {
    console.log('updateLowerPanelState');
    if (showItemsState == 'open') {
      setShowItemsState('closed');
    }
    if (showItemsState == 'closed') {
      setShowItemsState('open');
    }
  };
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '50px',
          height: '50px',
        }}
        onClick={updateLowerPanelState}
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
    </>
  );
};
export default ToggleShowItems;
