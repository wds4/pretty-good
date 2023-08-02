const LockListNameButton = ({
  newListKind,
  newListName,
  whichStep,
  startNewList,
}) => {
  let readyToProceed = 0;
  if ((newListKind != 0) && (newListName)) {
    readyToProceed = 1;
  }
  if (readyToProceed == 0) {
    return <></>;
  }
  if (whichStep == 0) {
    return (
      <>
        <button
          type="button"
          style={{
            border: '2px solid green',
            color: 'black',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '26px',
            marginTop: '15px',
          }}
          onClick={startNewList}
        >
          next: add items
        </button>
      </>
    );
  }
  return <></>;
};
export default LockListNameButton;
