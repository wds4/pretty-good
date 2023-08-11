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
        <option>select who manages this list</option>
        <option>self-managed</option>
        <option>your web of trust</option>
      </select>
    </>
  )
}
export default WhoManagesSelector;
