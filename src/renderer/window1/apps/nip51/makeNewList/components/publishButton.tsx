const PublishButton = ({postList}) => {
  return (
    <>
      <button
        type="button"
        onClick={postList}
        className="doSomethingButton"
        style={{fontSize: "26px"}}
      >
        Publish your list!
      </button>
    </>
  )
}
export default PublishButton;
