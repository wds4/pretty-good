const ShowKindButton = ({kind, showKind, setShowKind, aKind, countNumberOfListsShown}) => {
  const toggleShowKind = () => {
    if (showKind==0) { setShowKind(1); }
    if (showKind==1) { setShowKind(0); }
    countNumberOfListsShown();
  }

  let listType = "";
  if (kind == 10000) { listType = "Mute"; }
  if (kind == 10001) { listType = "Pin"; }
  if (kind == 30000) { listType = "People"; }
  if (kind == 30001) { listType = "Bookmarks"; }

  let className="nip51KindSelectorInactive"
  if (showKind==1) { className="nip51KindSelectorActive" }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={toggleShowKind}
      >
        {listType} ({aKind.length})
      </button>
    </>
  )
}
export default ShowKindButton;
