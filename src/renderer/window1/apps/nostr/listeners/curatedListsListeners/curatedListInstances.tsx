import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { addCuratedListInstance } from 'renderer/window1/redux/features/curatedLists/lists/slice';

/*
modify code from:
listen for curated list instances (items) of a given list
renderer/window1/apps/curatedLists/viewIndividualCuratedList/viewInstances/allInstances.jsx
*/

const CuratedListInstancesListener = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  // set up filter
  const kind0 = 9901;
  const filter = {
    since: 0,
    kinds: [kind0],
    '#c': ['concept-graph-testnet-901'],
    '#t': ['createInstance'],
    // '#s': [parentConceptSlug],
    // '#e': [parentConceptNostrEventID],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // store events in redux (and in sql?)
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      // dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
      // await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
      // need to get parentConceptSlug,parentConceptNostrEventID
      const oWord = JSON.parse(event.content);
      const aParentConceptNostrEventID = event.tags.filter(
        ([k, v]) => k === 'e' && v && v !== ''
      )[0];
      const aParentConceptSlug = event.tags.filter(
        ([k, v]) => k === 's' && v && v !== ''
      )[0];
      let parentConceptNostrEventID = "";
      if (aParentConceptNostrEventID) {
        if (aParentConceptNostrEventID.length > 0) {
          parentConceptNostrEventID = aParentConceptNostrEventID[1];
        }
      }
      let parentConceptSlug = "";
      if (aParentConceptSlug) {
        if (aParentConceptSlug.length > 0) {
          parentConceptSlug = aParentConceptSlug[1];
        }
      }
      if ( (parentConceptNostrEventID) && (parentConceptSlug) ) {
        dispatch(addCuratedListInstance(event));
        await addInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
      }

    }
  });
  return (
    <>
      <div className={devElemClass}>
        <div className="listenerBox">
          <div className="h4">CuratedListInstancesListener</div>
          <div>numMessages received: {events.length}</div>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              const aParentConceptNostrEventID = event.tags.filter(
                ([k, v]) => k === 'e' && v && v !== ''
              )[0];
              const aParentConceptSlug = event.tags.filter(
                ([k, v]) => k === 's' && v && v !== ''
              )[0];
              let parentConceptNostrEventID = "";
              if (aParentConceptNostrEventID) {
                if (aParentConceptNostrEventID.length > 0) {
                  parentConceptNostrEventID = aParentConceptNostrEventID[1];
                }
              }
              let parentConceptSlug = "";
              if (aParentConceptSlug) {
                if (aParentConceptSlug.length > 0) {
                  parentConceptSlug = aParentConceptSlug[1];
                }
              }
              const oWord = JSON.parse(event.content);
              return (
                <>
                  <div className="listenerInfoContainer">
                    <div>parentConceptNostrEventID: {parentConceptNostrEventID}</div>
                    <div>parentConceptSlug: {parentConceptSlug}</div>
                    <div className="listenerEventBox">{JSON.stringify(event,null,4)}</div>
                    <div className="listenerWordBox">{JSON.stringify(oWord,null,4)}</div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CuratedListInstancesListener;
