import { useSelector } from 'react-redux';
import { useState } from 'react';
import SingleListOverview from '../../components/singleListOverview';

const ShowKindButton = ({kind, showKind, setShowKind, aKind}) => {
  const toggleShowKind = () => {
    if (showKind==0) { setShowKind(1); }
    if (showKind==1) { setShowKind(0); }
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

const ShowTagsButton = ({tagsType, showTags, setShowTags}) => {
  const toggleShowTags = () => {
    if (showTags==0) { setShowTags(1); }
    if (showTags==1) { setShowTags(0); }
  }
  let tagsTypeName = "";
  if (tagsType == 'a') { tagsTypeName = "lists"; }
  if (tagsType == 'e') { tagsTypeName = "Events"; }
  if (tagsType == 'p') { tagsTypeName = "People"; }
  if (tagsType == 't') { tagsTypeName = "strings"; }

  let className="nip51KindSelectorInactive"
  if (showTags==1) { className="nip51KindSelectorActive" }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={toggleShowTags}
      >
        {tagsTypeName} {showTags}
      </button>
    </>
  )
}

const ExistingListsPreviewContainer = () => {
  const [showKind10000, setShowKind10000] = useState(1);
  const [showKind10001, setShowKind10001] = useState(1);
  const [showKind30000, setShowKind30000] = useState(1);
  const [showKind30001, setShowKind30001] = useState(1);

  const [showTagsA, setShowTagsA] = useState(1);
  const [showTagsE, setShowTagsE] = useState(1);
  const [showTagsP, setShowTagsP] = useState(1);
  const [showTagsT, setShowTagsT] = useState(1);

  const [searchStringForLists, setSearchStringForLists] = useState("");

  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } = useSelector(
    (state) => state.nip51
  );
  const oNip51Lists = useSelector(
    (state) => state.nip51.lists
  );
  return (
    <>
      <div
        style={{border: '1px dashed grey'}}
      >
        List categories:
        <ShowKindButton
          kind="10000"
          showKind = {showKind10000}
          setShowKind={setShowKind10000}
          aKind={aKind10000}
        />
        <ShowKindButton
          kind="10001"
          showKind = {showKind10001}
          setShowKind={setShowKind10001}
          aKind={aKind10001}
        />
        <ShowKindButton
          kind="30000"
          showKind = {showKind30000}
          setShowKind={setShowKind30000}
          aKind={aKind30000}
        />
        <ShowKindButton
          kind="30001"
          showKind = {showKind30001}
          setShowKind={setShowKind30001}
          aKind={aKind30001}
        />
        <br/>
        item types:
        <ShowTagsButton
          tagsType="a"
          showTags = {showTagsA}
          setShowTags={setShowTagsA}
        />
        <ShowTagsButton
          tagsType="e"
          showTags = {showTagsE}
          setShowTags={setShowTagsE}
        />
        <ShowTagsButton
          tagsType="p"
          showTags = {showTagsP}
          setShowTags={setShowTagsP}
        />
        <ShowTagsButton
          tagsType="t"
          showTags = {showTagsT}
          setShowTags={setShowTagsT}
        />
      </div>
      <div
        style={{
          border: '1px solid black',
          maxHeight: '400px',
          overflow: 'scroll',
          padding: '5px',
        }}
      >
        {aListEventIDs.map((id)=>{
          const event = oNip51Lists[id].event;
          return (
            <>
              <div>
                <SingleListOverview
                  event={event}
                  showKind10000={showKind10000}
                  showKind10001={showKind10001}
                  showKind30000={showKind30000}
                  showKind30001={showKind30001}
                  showTagsA={showTagsA}
                  showTagsE={showTagsE}
                  showTagsP={showTagsP}
                  showTagsT={showTagsT}
                  searchStringForLists={searchStringForLists}
                />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
export default ExistingListsPreviewContainer;
