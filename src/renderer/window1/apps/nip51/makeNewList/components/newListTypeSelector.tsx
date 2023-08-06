const NewListTypeSelector = ({newListKind, setNewListKind, setNewListName}) => {
  const updateNewListKind = () => {
    const e = document.getElementById("newListTypeSelector")
    if (e) {
      const k = e.value;
      setNewListKind(k);
      const oldListKind = newListKind;
      if (k == 0) {
        setNewListName('')
      }
      if (k >= 30000) {
        if (oldListKind < 30000) {
          setNewListName('');
        } else {
          const e2 = document.getElementById('newListTitle');
          if (e2) {
            setNewListName(e2.value);
          }
        }
      }
    }
  }
  return (
    <>
      <select
        id="newListTypeSelector"
        style={{
          fontSize: '26px',
          width: '100%',
          height: '50px',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
        onChange={updateNewListKind}
      >
        <option value="0">Select List Type</option>
        <option value="10000">Mute List: kind 10000</option>
        <option value="10001">Pin List: kind 10001</option>
        <option value="30000">People List: kind 30000</option>
        <option value="30001">Bookmarks List: kind 30001</option>
        <option value="9901">Crowdsourced List: kind 9901</option>
      </select>
    </>
  )
}

export default NewListTypeSelector;
