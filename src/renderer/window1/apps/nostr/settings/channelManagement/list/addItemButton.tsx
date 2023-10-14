const ButtonActive = ({
  confirmAddItemToList,
  oTagUpdates,
  aTagsToAddA,
  aTagsToAddE,
  aTagsToAddP,
  aTagsToAddT,
  updateNip19IdField,
}) => {
  const processButtonClick = () => {
    confirmAddItemToList(oTagUpdates, aTagsToAddA, aTagsToAddE, aTagsToAddP, aTagsToAddT);
    updateNip19IdField();
  }
  return (
    <>
      <button
        type="button"
        className="nip51Button"
        style={{
          border: '2px solid GREEN',
          color: 'black',
          padding: '5px',
          borderRadius: '5px',
          fontSize: '22px',
          boxSizing: 'border-box',
          height: '50px',
          width: '50px',
        }}
        onClick={processButtonClick}
      >
        ✔️
      </button>
    </>
  )
}

const ButtonInActive = () => {
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
          width: '50px',
        }}
      >
        ✔️
      </button>
    </>
  )
}

const AddItemButton = ({
  isNip19IdValid,
  confirmAddItemToList,
  oTagUpdates,
  aTagsToAddA,
  aTagsToAddE,
  aTagsToAddP,
  aTagsToAddT,
  updateNip19IdField,
}) => {
  if (isNip19IdValid) {
    return (
      <>
        <ButtonActive
          confirmAddItemToList={confirmAddItemToList}
          oTagUpdates={oTagUpdates}
          aTagsToAddA={aTagsToAddA}
          aTagsToAddE={aTagsToAddE}
          aTagsToAddP={aTagsToAddP}
          aTagsToAddT={aTagsToAddT}
          updateNip19IdField={updateNip19IdField}
        />
      </>
    );
  }
  return (
    <>
      <ButtonInActive />
    </>
  );
};
export default AddItemButton;
