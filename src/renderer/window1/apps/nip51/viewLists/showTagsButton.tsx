const ShowTagsButton = ({tagsType, showTags, setShowTags, countNumberOfListsShown}) => {
  const toggleShowTags = async () => {
    if (showTags==0) { setShowTags(1); }
    if (showTags==1) { setShowTags(0); }
    countNumberOfListsShown();
  }
  let tagsTypeName = "";
  if (tagsType == 'a') { tagsTypeName = "lists"; }
  if (tagsType == 'e') { tagsTypeName = "Events"; }
  if (tagsType == 'p') { tagsTypeName = "People"; }
  if (tagsType == 't') { tagsTypeName = "strings"; }

  let className="nip51KindSelectorInactive"
  if (showTags==1) { className="nip51KindSelectorActive" }

  const numberOfLists = "numberOfLists_"+tagsType;

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={toggleShowTags}
      >
        {tagsTypeName}{' '}
        (<span id={numberOfLists}>?</span>)
      </button>
    </>
  )
}
export default ShowTagsButton;
