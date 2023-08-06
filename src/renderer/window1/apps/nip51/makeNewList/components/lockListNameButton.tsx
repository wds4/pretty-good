const LockListNameButton = ({
  newListKind,
  newListName,
  whichStep,
  startNewList,
}) => {
  let readyToProceed = 0;
  if (newListKind != 0 && newListName) {
    readyToProceed = 1;
  }
  if (newListKind == '0') {
    return <></>;
  }
  if (readyToProceed == 0) {
    return (
      <>
        <button
          type="button"
          style={{
            border: '2px solid grey',
            color: 'black',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '22px',
            boxSizing: 'border-box',
            height: '50px',
            width: '100%',
          }}
        >
          ✔️
        </button>
      </>
    );
  }
  if (whichStep == 0) {
    return (
      <>
        <button
          type="button"
          className="nip51Button"
          style={{
            border: '2px solid green',
            color: 'green',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '22px',
            boxSizing: 'border-box',
            height: '50px',
            width: '100%',
          }}
          onClick={startNewList}
        >
          ✔️
        </button>
      </>
    );
  }
  return <></>;
};
export default LockListNameButton;
