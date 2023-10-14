import { useState } from 'react';
import PlusImage from 'renderer/window1/assets/plus.png';
import MinusImage from 'renderer/window1/assets/minus.png';

const ShowEvent = ({showRawListEvent, event}) => {
  if (!showRawListEvent) {
    return <></>;
  }
  return (
    <>
      <div style={{fontSize: '10px'}}>{JSON.stringify(event,null,4)}</div>
    </>
  )
}

const ToggleRawListEvent = ({ event }) => {
  const [showRawListEvent, setShowRawListEvent] = useState(false);
  let toggleButtonImage = PlusImage;
  if (showRawListEvent == true) {
    toggleButtonImage = MinusImage;
  }
  if (showRawListEvent == false) {
    toggleButtonImage = PlusImage;
  }

  const updateShowRawListEvent = () => {
    if (showRawListEvent == true) {
      setShowRawListEvent(false);
    }
    if (showRawListEvent == false) {
      setShowRawListEvent(true);
    }
  };
  return (
    <>
      <div style={{ borderBottom: '2px solid grey' }}>
        <div>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
            onClick={updateShowRawListEvent}
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
          <div
            style={{
              display: 'inline-block',
              marginLeft: '10px',
              fontSize: '16px',
              paddingTop: '12px',
            }}
          >
            show list event raw data
          </div>
        </div>

        <div style={{}}>
          <ShowEvent showRawListEvent={showRawListEvent} event={event} />
        </div>
      </div>
    </>
  );
};
export default ToggleRawListEvent;
