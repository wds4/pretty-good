const WhoManagesSelector = () => {
  return (
    <>
      <select
        id="whoManagesSelector"
        style={{
          width: '100%',
          height: '50px',
          fontSize: '26px',
          padding: '3px',
          border: '2px solid purple',
          borderRadius: '5px',
        }}
      >
        <option>Select who manages this list</option>
        <option>I do</option>
        <option>my web of trust</option>
      </select>
    </>
  )
}
export default WhoManagesSelector;
