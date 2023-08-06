const StartOverButton = ({startOver}) => {
  return (
    <>
      <button
        type="button"
        className="nip51Button"
        onClick={startOver}
        style={{
          fontSize: "26px",
          border: "1px solid red",
          borderRadius: "5px",
          width: '50px',
          height: '50px',
        }}
      >
        ❌
      </button>
    </>
  )
}
export default StartOverButton;
