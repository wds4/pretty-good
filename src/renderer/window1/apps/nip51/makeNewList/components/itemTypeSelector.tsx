const ItemTypeSelector = ({
  setNewItemText,
  resetNewItemInput,
  setNewItemGroup,
  newListKind,
}) => {
  const updateItemType = () => {
    const e = document.getElementById('newItemGroupSelector');
    if (e) {
      const updatedValue = e.value;
      setNewItemGroup(updatedValue);
      resetNewItemInput();
      setNewItemText('');
    }
  };
  let disabled = null;
  if (newListKind=='30000') {
    disabled = true;
  }
  return (
    <>
      <select
        id="newItemGroupSelector"
        style={{
          fontSize: '26px',
          width: '100%',
          height: '50px',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
        onChange={updateItemType}
      >
        <option value="nip19identifier_person">person</option>
        <option
          value="nip19identifier_nostrNote"
          disabled={disabled}
        >
          nostr note
        </option>
        <option value="plainText" disabled={disabled} >
          tag / plain text
        </option>
        <option value="anotherList">
          import items
        </option>
      </select>
    </>
  );
};
export default ItemTypeSelector;
