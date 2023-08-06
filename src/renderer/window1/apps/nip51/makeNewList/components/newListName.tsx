const NewListName = ({ newListKind, setNewListName }) => {
  const updateNewListName = () => {
    const e = document.getElementById('newListTitle');
    if (e) {
      setNewListName(e.value);
    }
  }
  if (newListKind == '0') {
    return (
      <>
        <div>
          <textarea
            className="newListTitleTextareaNip51"
            id="newListTitle"
            style={{ display: 'none' }}
          />
        </div>
      </>
    );
  }
  if (newListKind == '10000') {
    setNewListName('mute');
    return (
      <>
        <textarea
          className="newListTitleTextareaNip51"
          id="newListTitle"
          readOnly
          value="mute"
          style={{ backgroundColor: '#DFDFDF' }}
        />
      </>
    );
  }
  if (newListKind == '10001') {
    setNewListName('pin');
    return (
      <>
        <textarea
          className="newListTitleTextareaNip51"
          id="newListTitle"
          readOnly
          value="pin"
          style={{ backgroundColor: '#DFDFDF' }}
        />
      </>
    );
  }
  return (
    <>
      <div>
        <textarea
          className="newListTitleTextareaNip51"
          onChange={updateNewListName}
          id="newListTitle"
          placeholder="give your new list a name"
          style={{ backgroundColor: '#FFFFFF' }}
        />
      </div>
    </>
  );
};

export default NewListName;
