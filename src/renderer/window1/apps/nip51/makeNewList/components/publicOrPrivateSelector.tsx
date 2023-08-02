const PublicOrPrivateSelector = () => {
  return (
    <>
      <select
        id="publicOrPrivateSelector"
        style={{
          width: '20%',
          fontSize: '26px',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
          marginLeft: "10px"
        }}
      >
        <option>public</option>
        <option>private</option>
      </select>
    </>
  )
}
export default PublicOrPrivateSelector;
