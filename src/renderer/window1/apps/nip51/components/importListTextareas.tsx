const ImportListTextareas = ({
  processNewItemText,
  newListKind,
  newItemGroup,
}) => {
  if (newItemGroup != "anotherList") return ( <></> )
  const placeholderText =
    "Switch to selector: naddr, nevent or note of event, or person plus list name. Enter the NIP-19 identifier ('nevent' or 'note') of another nip51 list. The event type must be 10000, 10001, 30000 or 30001. OR enter the NIP-19 identifier of a person ('npub' or 'nprofile' and then add the title of the desired list.) ";
  const updateAnotherListSearchTerm = () => {
    const e = document.getElementById('anotherListSearchTermTextarea');
    if (e) {
      const searchText = e.value;
      processNewItemText(searchText);
    }
  };
  return (
    <>
      <textarea
        placeholder={placeholderText}
        onChange={updateAnotherListSearchTerm}
        id="anotherListSearchTermTextarea"
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: '50px',
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: 'Arial',
        }}
      />
    </>
  );
};
export default ImportListTextareas;
