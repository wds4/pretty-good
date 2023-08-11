const NewListName = ({ newListKind, setNewListName }) => {
  const updateNewListName = () => {
    if ((newListKind == 30000) || (newListKind == 30001) || (newListKind == 9901)) {
      const e = document.getElementById('newListTitle');
      if (e) {
        setNewListName(e.value);
      }
    }
  }

  let newListID = "newListTitle";
  let backgroundColor = '#FFFFFF';
  let display = 'block';
  let fixedValue = null;
  let isReadOnly = null;
  let placeholder=null;

  if (newListKind == '0') {
    display = 'none';
    newListID = "foo";
  }

  if (newListKind == '10000') {
    backgroundColor = '#DFDFDF';
    fixedValue = 'mute';
    isReadOnly=true;
    setNewListName('mute');
    newListID = "foo";
  }
  if (newListKind == '10001') {
    backgroundColor = '#DFDFDF';
    fixedValue = 'pin';
    isReadOnly=true;
    setNewListName('pin');
    newListID = "foo";
  }

  if (newListKind === '30000') {
    placeholder="give your new list of people a name";
  }
  if (newListKind === '30001') {
    placeholder="give your new list a name";
  }
  if (newListKind === '9901') {
    placeholder="give your new crowdsourced list a name";
  }

  if (newListKind === '0') {
    return (
      <>
        <div>
          <textarea
            className="newListTitleTextareaNip51"
            onChange={updateNewListName}
            id={newListID}
            style={{ display, backgroundColor }}
            readOnly={isReadOnly}
            value={fixedValue}
            placeholder={placeholder}
          />
        </div>
      </>
    );
  }

  if (newListKind == '10000') {
    return (
      <>
        <textarea
          className="newListTitleTextareaNip51"
          onChange={updateNewListName}
          id={newListID}
          style={{ display, backgroundColor }}
          readOnly={isReadOnly}
          value={fixedValue}
          placeholder={placeholder}
        />
      </>
    );
  }
  if (newListKind == '10001') {
    return (
      <>
        <textarea
          className="newListTitleTextareaNip51"
          onChange={updateNewListName}
          id={newListID}
          style={{ display, backgroundColor }}
          readOnly={isReadOnly}
          value={fixedValue}
          placeholder={placeholder}
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
          id={newListID}
          style={{ display, backgroundColor }}
          readOnly={isReadOnly}
          value={fixedValue}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default NewListName;
