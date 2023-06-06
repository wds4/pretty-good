import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addRatingOfCuratedListInstance } from 'renderer/window1/redux/features/curatedLists/lists/slice';
import { addRatingOfCuratedListInstanceEventToSql } from 'renderer/window1/lib/pg/sql';

const CuratedListItemRatingsListener = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  // const { aRatingsOfItemsEventIDs } = useSelector((state) => state.curatedLists);

  // set up filter
  const kind0 = 39901;
  const filter = {
    since: 0,
    kinds: [kind0],
    '#g': ['grapevine-testnet-901'],
    // '#l': [parentConceptNostrEventID],
    // '#r': [parentConceptNostrEventID + "-genericContext"],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  // events = removeDuplicates(events);

  // store events in redux (and in sql?)
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      // if (!aRatingsOfItemsEventIDs.includes(event.id)) {
        // dispatch(addEndorseAsRelaysPickerHunterNoteToReduxStore(event, myPubkey));
        // await updateListCurationNoteInSql(event, "endorseAsRelaysPickerHunter");
        dispatch(addRatingOfCuratedListInstance(event));
        const parentConceptNostrEventID = event.tags.find(
          ([k, v]) => k === 'l' && v && v !== ''
        )[1];
        const oWord = JSON.parse(event.content);
        if (oWord) {
          if (oWord.hasOwnProperty("ratingData")) {
            if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
              if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListInstanceRatingFieldsetData")) {
                const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                  addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                }
              }
            }
          }
        }
      // }
    }
  });
  if (devMode) {
    return (
      <>
        <div className={devElemClass}>
          <div className="listenerBox">
            <div className="h4">CuratedListItemRatingsListener</div>
            <div>numMessages received: {events.length}</div>
            {events.map((event, index) => {
              if (doesEventValidate(event)) {
                const oWord = JSON.parse(event.content);

                const parentConceptNostrEventID = event.tags.find(
                  ([k, v]) => k === 'l' && v && v !== ''
                )[1];
                let parentConceptSlug = "";
                if (oWord) {
                  if (oWord.hasOwnProperty("ratingData")) {
                    if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
                      if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListInstanceRatingFieldsetData")) {
                        parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                      }
                    }
                  }
                }

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
  }
  return <></>;
};

export default CuratedListItemRatingsListener;
