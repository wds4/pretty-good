const ButtonActive = ({addItem}) => {
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
        onClick={addItem}
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
  addItem
}) => {
  const isNewItemAlreadyOnList = "no";
  const isNewItemValid = "yes";
  if (isNewItemAlreadyOnList == 'yes') {
    return (
      <>
        <ButtonInActive />
      </>
    );
  }
  if (isNewItemValid == 'yes') {
    return (
      <>
        <ButtonActive addItem={addItem} />
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
