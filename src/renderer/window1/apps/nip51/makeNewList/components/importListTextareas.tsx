const ImportListTextareas = ({
  processNewItemText,
  newListKind,
  newItemGroup,
  existingListRetrievalMethod,
}) => {
  let placeholderText =
    "Switch to selector: naddr, nevent or note of event, or person plus list name. Enter the NIP-19 identifier ('nevent' or 'note') of another nip51 list. The event type must be 10000, 10001, 30000 or 30001. OR enter the NIP-19 identifier of a person ('npub' or 'nprofile' and then add the title of the desired list.) ";
  placeholderText = "";
  if (existingListRetrievalMethod == "authorAndListName") {
    placeholderText = "Enter the NIP-19 identifier (starts with 'npub' or 'nprofile') of the list author/curator.";
  }
  if (existingListRetrievalMethod == "nip51identifier") {
    placeholderText = "Enter the NIP-19 identifier (starts with 'nevent', 'note' or 'naddr') of another NIP-51 list.";
  }
  const updateAnotherListSearchTerm = () => {
    const e = document.getElementById('anotherListSearchTermTextarea');
    if (e) {
      const searchText = e.value;
      processNewItemText(searchText);
    }
  };
  if (existingListRetrievalMethod=="") return <></>;
  return (
    <>
      <textarea
        placeholder={placeholderText}
        onChange={updateAnotherListSearchTerm}
        id="anotherListSearchTermTextarea"
        style={{
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
