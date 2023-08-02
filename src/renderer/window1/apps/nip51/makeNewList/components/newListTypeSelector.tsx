const NewListTypeSelector = () => {
  return (
    <>
      <select
        id="newListTypeSelector"
        style={{
          fontSize: '26px',
          width: '60%',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
      >
        <option value="0">Select List Type</option>
        <option value="10000">Mute List: kind 10000</option>
        <option value="10001">Pin List: kind 10001</option>
        <option value="30000">People List: kind 30000</option>
        <option value="30001">Bookmarks List: kind 30001</option>
        <option value="39901">Composite List: kind 9901</option>
      </select>
    </>
  )
}

export default NewListTypeSelector;
