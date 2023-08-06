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

const AddItemButton = ({ isNewItemValid, newItemGroup, newItemText, addItem }) => {
  if (newItemGroup=="nip19identifier") {
    if (isNewItemValid != 'yes') {
      return (
        <>
          <ButtonInActive />
        </>
      );
    }
    return (
      <>
        <ButtonActive addItem={addItem} />
      </>
    );
  }
  if (newItemGroup=="plainText") {
    if (newItemText) {
      return (
        <>
          <ButtonActive addItem={addItem} />
        </>
      )
    }
    return (
      <>
        <ButtonInActive />
      </>
    )
  }
  return <></>;

};
export default AddItemButton;
