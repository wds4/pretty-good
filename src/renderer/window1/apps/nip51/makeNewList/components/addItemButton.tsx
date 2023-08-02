const AddItemButton = ({isItemValid, addItemParent}) => {
  if (isItemValid != "yes") { return <></>; }
  return (
    <>
      <button
        type="button"
        className="doSomethingButton"
        style={{
          border: '1px solid grey',
          borderRadius: '5px',
          fontSize: '26px',
        }}

        onClick={addItemParent}
      >
        add item
      </button>
    </>
  )
}
export default AddItemButton;
