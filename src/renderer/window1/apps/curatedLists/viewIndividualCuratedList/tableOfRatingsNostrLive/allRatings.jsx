import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addRatingOfCuratedListInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Rating from './rating';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';

const removeDuplicates = (events) => {
  // cycle through events; since they have been placed in order starting with most recent,
  // discard any event whose uniqueID has already been seen
}

const AllRatings = ({parentConceptPropertyPath, parentConceptNostrEventID, parentConceptSlug, oParentEvent}) => {
  const kind0 = 39901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["g","grapevine-testnet-901"];
  // for this rating, with instance as the ratee, the current tag (-901) is:
  '#r': [parentConceptNostrEventID-"genericContext"],
  But I ought to change it to:
  '#r': [parentConceptNostrEventID-"nostrCuratedListInstanceGenericRating-genericContext"],
  or to:
  '#r': [parentConceptNostrEventID-"nostrCuratedListInstance-genericContext"],
  In general, for ratings of concepts, use:
  '#r': [parentConceptNostrEventID-ratingTemplateSlug-contextDAGSlug],
  Maybe make more general rule:
  '#r': [ratingTemplateSlug-context],
  where context subsumes contextDAGSlug and parentConceptNostrEventID here,
  but in general context may include lots of info that modifies the ratingTemplateSlug
  // when rating of another user, use tag:
  '#r': [parentConceptNostrEventID-"nostrCuratedListsCuratorEndorsement-genericContext"],
  */
  const filter = {
    since: 0,
    kinds: [kind0],
    '#g': ['grapevine-testnet-901'],
    '#l': [parentConceptNostrEventID],
    '#r': [parentConceptNostrEventID + "-genericContext"],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  // events = removeDuplicates(events);
  const aUniqueIDs = [];
  return (
    <>
      <div className="h4">ratings of items on this list (loading live from nostr)</div>
      <TechDetailsForNostrNerds1 events={events} filter={filter} />
      <div style={{fontSize: '22px', color: 'grey', width: '40%', textAlign: 'center', display: 'inline-block'}}>
        rater
      </div>
      <div style={{float: 'right', fontSize: '22px', color: 'grey', width: '40%', textAlign: 'center', display: 'inline-block'}}>
        ratee
      </div>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          const uniqueID = event.tags.find(
            ([k, v]) => k === 'd' && v && v !== ''
          )[1];
          // This prevents duplicates from being deposted into sql (at least no duplicates within a single mapping)
          if (aUniqueIDs.includes(uniqueID)) {
            return (<><div style={{display:"none"}}>Duplicate!</div></>)
          }
          if (!aUniqueIDs.includes(uniqueID)) {
            aUniqueIDs.push(uniqueID)
          }
          // ALSO NEED TO VALIDATE AGAINST JSON SCHEMA FOR RATINGS
          addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
          //
          return (
            <>
              <div style={{display:"none"}}>{JSON.stringify(event,null,4)}</div>
              <Rating event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default AllRatings;
