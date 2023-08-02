const NewListName = ({ newListKind, updateListName, v }) => {
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
  if (v == '10000') {
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
  if (v == '10001') {
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
          onChange={updateListName()}
          id="newListTitle"
          placeholder="give your new list a name"
          style={{ backgroundColor: '#FFFFFF' }}
        />
      </div>
    </>
  );
};

export default NewListName;
