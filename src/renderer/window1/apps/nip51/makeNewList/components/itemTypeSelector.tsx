const ItemTypeSelector = ({setNewItemText, resetNewItemInput, setNewItemGroup}) => {
  const updateItemType = () => {
    const e = document.getElementById("newItemGroupSelector");
    if (e) {
      const updatedValue = e.value;
      setNewItemGroup(updatedValue);
      resetNewItemInput();
      setNewItemText('');
    }
  }
  return (
    <>
      <select
        id="newItemGroupSelector"
        style={{
          fontSize: '26px',
          width: '100%',
          height: "50px",
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
        onChange={updateItemType}
      >
        <option value="nip19identifier">person</option>
        <option value="nip19identifier">nostr event</option>
        <option value="plainText">plain text</option>
        <option value="anotherList">import list</option>
      </select>
    </>
  )
}
export default ItemTypeSelector;
