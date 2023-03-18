import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addCuratedListEventToSql } from 'renderer/window1/lib/pg/sql';
import List from './list';

const AllLists = () => {
  const kind0 = 9901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance (alternate: e for the event id of the parent concept)
  */
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [kind0],
      '#c': ['concept-graph-testnet-901'],
      '#t': ['createInstance'],
      '#s': ['nostrCuratedList'],
    },
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          addCuratedListEventToSql(event);
          return (
            <><List event={event} /></>
          );
        }
      })}
    </>
  );
};

export default AllLists;
