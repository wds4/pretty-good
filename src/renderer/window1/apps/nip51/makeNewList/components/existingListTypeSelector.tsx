const ExistingListTypeSelector = ({}) => {
  const updateExistingListType = () => {
    const e = document.getElementById("existingListTypeSelector");
    if (e) {

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
        id="existingListTypeSelector"
        onChange={updateExistingListType}
      >
        <option value="">imported list type</option>
        <option value="30000">30000 (people-only)</option>
        <option value="30001">30001 (general purpose)</option>
      </select>
    </>
  )
}
export default ExistingListTypeSelector;
