const NewItemPlainText = ({
  processNewItemText,
}) => {
  const placeholderText = 'enter your plain text item';
  const updateNewItemText = () => {
    const e = document.getElementById('listItemPlainTextTextarea');
    if (e) {
      const searchText = e.value;
      processNewItemText(searchText);
    }
  };
  return (
    <>
      <textarea
        id="listItemPlainTextTextarea"
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: "50px",
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '24px',
          fontFamily: 'Arial',
        }}
        onChange={updateNewItemText}
        placeholder={placeholderText}
        data-nip19data=""
        data-nip19type=""
        data-isitemvalid=""
      />
    </>
  )
}

export default NewItemPlainText;
