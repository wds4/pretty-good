import { useState } from 'react';
import { useSelector } from 'react-redux';
import { nip19 } from 'nostr-tools';
import ShowKindButton from './showKindButton';
import ShowTagsButton from './showTagsButton';
import SingleListOverview from '../components/singleListOverview';
import { timeout } from 'renderer/window1/lib/pg';

const countNumberOfListsShown = async (oNip51Lists) => {
  await timeout(10)
  const aSingleListElems = document.getElementsByClassName("singleListOverviewContainer");
  const e = document.getElementById("fooElement");
  if (e) {
    e.innerHTML = aSingleListElems.length;
  }

  let nE_a = 0;
  let nE_e = 0;
  let nE_p = 0;
  let nE_t = 0;
  const oKindsForATags = {};
  for (let x=0;x<aSingleListElems.length;x++) {
    const e = aSingleListElems[x];
    if (e) {
      const numEvents_a = e.dataset.numlists;
      if (numEvents_a > 0) {
        nE_a++;

        const eventID = e.dataset.eventid;

        if ( (oNip51Lists) && (eventID) && (oNip51Lists[eventID])) {
          const oEvent = oNip51Lists[eventID]?.event;

          const aTags_a = oEvent.tags.filter(([k, v]) => k === 'a' && v && v !== '');

          for (let a=0;a<aTags_a.length; a++) {
            const aATag = aTags_a[a];
            const foo = aATag[1];
            const aStrings = foo.split(":");
            const tagKind = aStrings[0];
            if (!oKindsForATags[tagKind]) {
              oKindsForATags[tagKind] = []
            }
            oKindsForATags[tagKind].push(aATag);
          }

        }
      }
      const numEvents_e = e.dataset.numevents;
      if (numEvents_e > 0) {
        nE_e++;
      }
      const numEvents_p = e.dataset.numpeople;
      if (numEvents_p > 0) {
        nE_p++;
      }
      const numEvents_t = e.dataset.numstrings;
      if (numEvents_t > 0) {
        nE_t++;
      }
    }
  }
  const e2 = document.getElementById("oKindsForATagsContainer");
  if (e2) {
    e2.innerHTML = JSON.stringify(oKindsForATags,null,4)
  }

  const z_a = document.getElementById("numberOfLists_a");
  if (z_a) {
    z_a.innerHTML = nE_a;
  }
  const z_e = document.getElementById("numberOfLists_e");
  if (z_e) {
    z_e.innerHTML = nE_e;
  }
  const z_p = document.getElementById("numberOfLists_p");
  if (z_p) {
    z_p.innerHTML = nE_p;
  }
  const z_t = document.getElementById("numberOfLists_t");
  if (z_t) {
    z_t.innerHTML = nE_t;
  }
}

const ViewLists = ({}) => {
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

  countNumberOfListsShown(oNip51Lists);

  const updateSearchStringForLists = (event) => {
    setSearchStringForLists(event.target.value);
  }

  return (
    <>
      <div >
        <div className="h3" style={{marginBottom:"20px"}}>Nostr Lists</div>
        <div style={{display: "none", height: "200px", overflow: "scroll"}}>
          <div id="oKindsForATagsContainer">
            oKindsForATags
          </div>
        </div>

        <div style={{textAlign: 'left',marginBottom: '5px'}}>
          <textarea
            style={{width: '95%', fontSize: '26px', height: '30px', padding: '10px' }}
            id="listSearchTextfield"
            onChange={updateSearchStringForLists}
            placeholder='Search by list title'
          ></textarea>
        </div>

        <div
          style={{display: 'none'}}
        >
          List categories:
          <ShowKindButton
            kind="10000"
            showKind = {showKind10000}
            setShowKind={setShowKind10000}
            aKind={aKind10000}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowKindButton
            kind="10001"
            showKind = {showKind10001}
            setShowKind={setShowKind10001}
            aKind={aKind10001}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowKindButton
            kind="30000"
            showKind = {showKind30000}
            setShowKind={setShowKind30000}
            aKind={aKind30000}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowKindButton
            kind="30001"
            showKind = {showKind30001}
            setShowKind={setShowKind30001}
            aKind={aKind30001}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <br/>
          show lists with these types of items:
          <ShowTagsButton
            tagsType="a"
            showTags = {showTagsA}
            setShowTags={setShowTagsA}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowTagsButton
            tagsType="e"
            showTags = {showTagsE}
            setShowTags={setShowTagsE}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowTagsButton
            tagsType="p"
            showTags = {showTagsP}
            setShowTags={setShowTagsP}
            countNumberOfListsShown={countNumberOfListsShown}
          />
          <ShowTagsButton
            tagsType="t"
            showTags = {showTagsT}
            setShowTags={setShowTagsT}
            countNumberOfListsShown={countNumberOfListsShown}
          />
        </div>
        <div style={{color: 'grey',marginBottom: '5px'}}>Showing <span id="fooElement">?</span> lists</div>
        <div
          style={{
            border: '1px solid black',
            maxHeight: '600px',
            overflowY: 'scroll',
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
      </div>
    </>
  );
};
export default ViewLists;
