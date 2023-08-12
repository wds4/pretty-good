const AnotherListIdentificationMethodSelector = ({
  processNewItemText,
  newListKind,
  setExistingListRetrievalMethod,
}) => {
  const updateExistingListRetrievalMethod = () => {
    const e = document.getElementById("listRetrievalMethodSelector");
    if (e) {
      setExistingListRetrievalMethod(e.value);
    }
  }
  return (
    <>
      <select
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: '50px',
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '26px',
          fontFamily: 'Arial',
        }}
        id="listRetrievalMethodSelector"
        onChange={updateExistingListRetrievalMethod}
      >
        <option value="">select how to specify the import list</option>
        <option value="authorAndListName">list name, author/curator, & event kind</option>
        <option value="nip51identifier">NIP-51 id (nevent, note, or naddr)</option>
      </select>
    </>
  );
};
export default AnotherListIdentificationMethodSelector;
