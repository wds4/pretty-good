const DeleteButton = ({
  editListState,
  deleteThisItem,
  setDeleteThisItem,
  removeItemFromDeleteList,
  addItemToDeleteList,
}) => {
  if (!editListState) {
    return <></>;
  }
  const updateDeleteThisItem = () => {
    if (deleteThisItem) {
      setDeleteThisItem(false);
      removeItemFromDeleteList();
    } else {
      setDeleteThisItem(true);
      addItemToDeleteList();
    }
  };
  return (
    <>
      <div style={{ flexGrow: '1' }}>
        <button
          type="button"
          className="nip51Button"
          style={{
            border: '1px solid red',
            borderRadius: '5px',
            width: '50px',
            height: '50px',
            fontSize: '26px',
          }}
          onClick={updateDeleteThisItem}
        >
          ❌
        </button>
      </div>
    </>
  );
};
export default DeleteButton;
