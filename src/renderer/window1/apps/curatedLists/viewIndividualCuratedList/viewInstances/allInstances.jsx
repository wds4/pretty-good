import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Instance from './instance';

const AllInstances = ({parentConceptPropertyPath, parentConceptNostrEventID, parentConceptSlug, oParentEvent}) => {
  const kind0 = 9901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance
  const aTag3 = ["e","nostrCuratedList"]; // if t = createInstance; e for event id of the parent concept of the instance
  // cound use s OR e OR both
  */
  const filter = {
    since: 0,
    kinds: [kind0],
    '#c': ['concept-graph-testnet-901'],
    '#t': ['createInstance'],
    '#s': [parentConceptSlug],
    '#e': [parentConceptNostrEventID],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div className="h4">All items on this list</div>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          // ALSO NEED TO VALIDATE AGAINST JSON SCHEMA OF LIST
          if (doesEventInstanceValidateAgainstEventParent(event,oParentEvent)) {
            addInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
            return (
              <>
                <Instance parentConceptPropertyPath={parentConceptPropertyPath} event={event} />
              </>
            );
          }
        }
      })}
    </>
  );
};

export default AllInstances;
