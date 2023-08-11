const ImportListSpecifyListname = ({setExistingListName}) => {
  const updateListName = () => {
    const e = document.getElementById("anotherListListNameTextarea");
    if (e) {
      const updatedListName = e.value;
      setExistingListName(updatedListName)
    }
  }
  return (
    <>
      <textarea
        placeholder="Enter the name of the list, e.g. 'Nostr Devs'."
        onChange={updateListName}
        id="anotherListListNameTextarea"
        style={{
          padding: '5px',
          width: '100%',
          height: '50px',
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '26px',
          fontFamily: 'Arial',
        }}
      />
    </>
  )
}
export default ImportListSpecifyListname;
