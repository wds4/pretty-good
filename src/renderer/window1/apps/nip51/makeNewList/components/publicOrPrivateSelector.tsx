const PublicOrPrivateSelector = () => {
  return (
    <>
      <select
        id="publicOrPrivateSelector"
        style={{
          width: '100%',
          height: '50px',
          fontSize: '26px',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
      >
        <option>public</option>
        <option>private</option>
      </select>
    </>
  )
}
export default PublicOrPrivateSelector;
