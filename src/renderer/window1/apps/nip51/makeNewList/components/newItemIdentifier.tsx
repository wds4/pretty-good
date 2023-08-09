import { nip19 } from 'nostr-tools';

const NewItemIdentifier = ({
  processNewItemText,
  newListKind,
}) => {
  let placeholderText = "enter the NIP-19 identifier for a person (should start with 'npub' or 'nprofile') OR for a nostr note (should start with 'nevent' or 'note')";
  if (newListKind == 10000 || newListKind == 30000) {
    placeholderText = "enter the NIP-19 identifier for a person (should start with 'npub' or 'nprofile')";
  }
  const updateNewItemText = () => {
    const e = document.getElementById('listItemTextarea');
    if (e) {
      const searchText = e.value;
      processNewItemText(searchText);
    }
  };
  return (
    <>
      <textarea
        id="listItemTextarea"
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: "50px",
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: 'Arial',
        }}
        onChange={updateNewItemText}
        placeholder={placeholderText}
        data-nip19data=""
        data-nip19type=""
        data-isitemvalid=""
      />
    </>
  );
};

export default NewItemIdentifier;
