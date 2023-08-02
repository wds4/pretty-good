const StartOverButton = ({startOver}) => {
  return (
    <>
      <button
        type="button"
        onClick={startOver}
        className="doSomethingButton"
        style={{fontSize: "26px"}}
      >
        Start over
      </button>
    </>
  )
}
export default StartOverButton;
